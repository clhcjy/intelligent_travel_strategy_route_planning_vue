import pandas as pd
import os  
# 读取Excel文件
save_dir = 'public'
df = pd.read_excel(os.path.join(save_dir, 'ticket_with_serial_number.xlsx'))

# 添加序号列
df.insert(4, 'classification', '#车票')

# 保存到新的Excel文件
df.to_excel(os.path.join(save_dir, 'ticket.xlsx'), index=False)