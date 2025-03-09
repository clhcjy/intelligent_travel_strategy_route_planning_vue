import pandas as pd
import os

# 定义文件路径
save_dir = 'public'
existing_file = os.path.join(save_dir, 'scenic.xlsx')
new_data_file = os.path.join(save_dir, 'shenzhen.xlsx')

# 读取新数据
new_df = pd.read_excel(new_data_file)

# 添加序号列
new_df.insert(3, 'classification', '#景点')

# 检查目标文件是否存在
if os.path.exists(existing_file):
    # 如果文件存在，读取已有数据
    existing_df = pd.read_excel(existing_file)
    # 合并数据
    combined_df = pd.concat([existing_df, new_df], ignore_index=True)
else:
    # 如果文件不存在，直接使用新数据
    combined_df = new_df.copy()

# 保存到目标文件
combined_df.to_excel(existing_file, index=False)