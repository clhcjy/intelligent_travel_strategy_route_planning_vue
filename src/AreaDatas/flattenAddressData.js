// 导入原始数据
import { address } from './AddressData.js';

// 扁平化处理函数
function flattenData(data) {
  const result = [];
  data.forEach(item => {
    result.push({
        label:item.label,
        value:item.value
    }); // 添加当前级别的标签
    if (item.children && item.children.length > 0) {
      // 递归处理子项
      const children = flattenData(item.children);
      result.push(...children);
    }
  });
  return result;
}

// 扁平化省市数据
const flattenedData = flattenData(address);

// 导出扁平化后的数据
export {
    flattenedData
} 