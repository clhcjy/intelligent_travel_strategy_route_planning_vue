import time
import random
import pandas as pd
from tqdm import tqdm
from DrissionPage import ChromiumPage
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
keyword = "全国美食"
times = 2
# 创建页面实例
page = create_page()

# 对关键词进行URL编码
encoded_keyword = quote(keyword)
# 构造搜索结果页面URL并请求
page.get(f'https://www.xiaohongshu.com/search_result?keyword={encoded_keyword}&source=web_search_result_notes')

# 获取页面信息
# 获取包含所有搜索结果的容器元素
container = page.ele('.feeds-page')
# log.info('获取搜索结果... container: %s', container)
# 获取所有搜索结果项
sections = container.eles('.note-item')
# log.info('获取搜索结果... sections: %s', sections)
i = 1
for section in sections:
    i+=1
    if i>=10: break
    # 获取每个搜索结果的链接
    note_link = section.ele('tag:a', timeout=0).link
    # log.info('获取搜索结果... note_link: %s', note_link)
    # 获取每个搜索结果的标题
    title = section.ele('.footer', timeout=0).ele('.title', timeout=0).text
    log.info('获取搜索结果... title: %s', title)
    # 将标题和链接添加到内容列表中
    contents.append([title , note_link])

print("最终结果：$s",contents)
name = ['title','note_link']
# 创建DataFrame对象并保存到Excel
df = pd.DataFrame(data=contents, columns=name)
df.to_excel('eat.xlsx', index=False)

page.ele('//*[@id="note-container"]')

#  note-container