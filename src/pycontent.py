import datetime
import openpyxl

# 打开工作簿
workbook = openpyxl.load_workbook('eat.xlsx')
# 获取表单
sheet = workbook['表单1']
# 读取指定的单元格数据
cell = sheet.cell(row=1, column=1).value
print(cell)
