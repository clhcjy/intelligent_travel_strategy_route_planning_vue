import datetime
import openpyxl
import pandas as pd
from tqdm import tqdm
from DrissionPage import ChromiumPage
from urllib.parse import quote

# 创建一个Chromium浏览器页面实例
def create_page():
    return ChromiumPage()

contents = []

# 创建页面实例
page = create_page()


# 打开工作簿
workbook = openpyxl.load_workbook('eat.xlsx')
# 获取表单
sheet = workbook['Sheet1']

for rows in sheet.iter_rows(min_row=2,min_col=2, max_col=2, max_row=67):
        for row in rows:
            print(row.value)



