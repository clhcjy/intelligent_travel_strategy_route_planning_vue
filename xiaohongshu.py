import threading
import time
import random
import pandas as pd
from tqdm import tqdm
from DrissionPage import ChromiumPage
from selenium.webdriver.common.by import By
from urllib.parse import quote
import openpyxl
import logging
import os  
import requests  
from bs4 import BeautifulSoup  
from urllib.request import urlretrieve  
from urllib.parse import urljoin  
import validators
from selenium.common.exceptions import NoSuchElementException
import sys

# 配置日志记录器
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
log = logging.getLogger(__name__)

# 从环境变量中读取URL
url = os.getenv('BASE_URL', "http://192.168.1.47:8082/")
save_dir = "public"  # 图片保存的目录  

# 创建一个Chromium浏览器页面实例
def create_page():
    return ChromiumPage()

# 关闭浏览器实例
def close_page(page):
    page.quit()

# 获取元素
def get_element(element, selector, timeout=0):
    try:
        return element.ele(selector, timeout=timeout)
    except NoSuchElementException:
        log.warning(f"未找到元素: {selector}")
        return None

# 下载并保存图片
def download_image(img_url, save_dir):
    if validators.url(img_url):
        img_name = os.path.join(save_dir, img_url.split('/')[-1] + '.jpg')
        urlretrieve(img_url, img_name)
        log.info(f"Downloaded: {img_name}")
    else:
        log.warning(f"Invalid URL: {img_url}")

contents = []

# 超时处理
def timeout_handler():
    raise TimeoutError("超时！跳过……")


def get_content(num,keyword):
    # 创建页面实例
    page = create_page()
    # 对关键词进行URL编码
    encoded_keyword = quote(keyword)
    # 构造搜索结果页面URL并请求
    page.get(f'https://www.xiaohongshu.com/search_result?keyword={encoded_keyword}&source=web_search_result_notes')

    for i in range(1, num):
        # 获取页面信息
        container = get_element(page, '.feeds-page')
        sections = container.eles('tag:section') if container else []
        for section in sections:
            log.info("开始爬取")
            print("section:", section)
            try:
                timer = threading.Timer(10, timeout_handler)  # 设置超时时间为10秒
                timer.start()
                if get_element(section, 'tag:play-icon'):
                    log.info("有视频,跳过")
                    continue
                if get_element(section, '.query-note-wrapper'):
                    log.info("是查询笔记,跳过")
                    continue
                section.click()
                time.sleep(random.uniform(0.5, 1.5))
                content = get_element(page.ele('.note-detail-mask'), '.note-container')
                interaction_container = get_element(content, '.interaction-container', timeout=0)
                note_scroller = get_element(interaction_container, '.note-scroller', timeout=0)
                media_container = get_element(content, '.media-container',timeout=0)
                slider_container = get_element(media_container, '.slider-container', timeout=0)
                img_container = get_element(slider_container, '.img-container', timeout=0)
                if not content:
                    log.error("未找到 note-container 元素")
                    continue
                title = get_element(note_scroller, '.title', timeout=1)
                title = title.text if title else ""
                log.info(f"标题：{title}")
                desc = get_element(note_scroller, '.desc', timeout=1)
                desc = desc.text if desc else ""
                log.info(f"描述：{desc}")
                img_url = get_element(img_container, 'tag:img', timeout=1)
                img_url = img_url.link if img_url else ""
                log.info(f"图片链接：{img_url}")
                # 下载图片到public 文件夹
                download_image(img_url, save_dir)
                img_url = img_url.split('/')[-1] + '.jpg'
                contents.append([title, desc, img_url])
                log.info("已保存图片")
                close_link = get_element(page.ele('.note-detail-mask'), '.close-circle')
                if close_link:
                    close_link.click()
                time.sleep(random.uniform(0.5, 1.5))
            except TimeoutError:
                log.error("操作超时，跳过当前项")
            except Exception as e:
                log.error(f"An error occurred: {e}")
                continue
            finally:
                timer.cancel()
        print("第", i, "页爬取完成")
         # 使用JavaScript滚动到底部
        page.scroll.to_bottom()
        time.sleep(2)  # 等待页面加载

def main():
    # 假设我们从命令行参数获取URL
    params = '潮汕娱乐'
    # 执行爬虫逻辑
    keyword = params;
    num = input("请输入爬取页数：")
    num = int(num)
    get_content(num,keyword)
        
        
    print("最终结果：", contents)

    name = ['title', 'content', 'link']
    # 创建DataFrame对象并保存到Excel
    df = pd.DataFrame(data=contents, columns=name)
    # 构建保存Excel文件的完整路径
    excel_path = os.path.join(save_dir, 'amusement.xlsx')
    df.to_excel(excel_path, index=False)


if __name__ == "__main__":
    main()