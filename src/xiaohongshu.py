import time
import random
import pandas as pd
from tqdm import tqdm
from DrissionPage import ChromiumPage
from selenium.webdriver.common.by import By
from urllib.parse import quote
import openpyxl
import logging

# 配置日志记录器
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

# 创建一个Chromium浏览器页面实例
def create_page():
    return ChromiumPage()

contents = []
keyword = input("请输入要搜索的关键词：")
times = 2
# 创建页面实例
page = create_page()

# 对关键词进行URL编码
encoded_keyword = quote(keyword)
# 构造搜索结果页面URL并请求
page.get(f'https://www.xiaohongshu.com/search_result?keyword={encoded_keyword}&source=web_search_result_notes')
def get_content():
    # 获取页面信息
    container = page.ele('.feeds-page')
    sections = container.eles('.note-item')
    for section in sections:
        print("section:",section)
        try:
            if section.ele('tag:play-icon'):
                log.info("有视频,跳过")
                continue
            section.click()
            content = page.ele('.note-detail-mask').ele('.note-container')
            title = content.ele('.interaction-container').ele('.note-scroller').ele('.note-content').ele('.title', timeout=0).text
            log.info(f"标题：{title}")
            desc = content.ele('.interaction-container').ele('.note-scroller').ele('.note-content').ele('.desc', timeout=0).text
            media_container = content.ele('.media-container')
            img_url = media_container.ele('.slider-container').ele('.img-container').ele('tag:img', timeout=0).link
            close_link = page.ele('.note-detail-mask').ele('.close-circle')
            close_link.click()
            contents.append([title, desc, img_url])
        except Exception as e:
            log.error(f"An error occurred: {e}")
            continue

# 滚动页面以加载更多内容

get_content()
page.scroll.to_bottom()
time.sleep(1)  # 等待页面加载

print("最终结果：", contents)

name = ['标题', '内容', '图片链接']
# 创建DataFrame对象并保存到Excel
df = pd.DataFrame(data=contents, columns=name)
df.to_excel('eat.xlsx', index=False)