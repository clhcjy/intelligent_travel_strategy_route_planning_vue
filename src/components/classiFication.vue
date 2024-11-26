<template>
    <div>{{ city }}计划</div>
    <div style="padding: '20px';">
        <a-anchor direction="horizontal" :items="items" @click="handleClick" />
    </div>
    <div v-if="href != ''" class="card-wrapper">
        <a-card hoverable v-for="(item, index) in xlsxData" :key="index"  style="width: 200px;margin: 20px;" @click="cardPark(item)">
            <template #cover>
                <img alt="example" :src="item.link" />
            </template>
            <a-card-meta :title="item.title" :description="item.content" class="ellipsis">
            </a-card-meta>
        </a-card>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, h } from 'vue'
import * as XLSX from 'xlsx';
const route = useRoute();

let xlsxData = ref(null);

let href = ref('');

const handleClick = (e, link) => {
    //   e.preventDefault();
    href.value = link.href;
    console.log(link);
    readExcel();
};

const city = ref('');
const items = [
            {
                key: '景点',
                href: '#景点',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '景点'),
            },
            {
                key: '美食',
                href: '#美食',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '美食'),
            },
            {
                key: '活动',
                href: '#活动',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '活动'),
            },
            {
                key: '酒店',
                href: '#酒店',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '酒店'),
            },
            {
                key: '车票',
                href: '#车票',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '车票'),
            },
            {
                key: '娱乐',
                href: '#娱乐',
                title: () => h('span', { style: 'font-size: 28px;padding:20px' }, '娱乐'),
            },
        ];
const readExcel = () => {
    const file = "./eat.xlsx"; // 获取文件
    fetch(file)
        .then((response) => response.blob()) // 将文件转换为 Blob
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                xlsxData.value = jsonData; // 保存解析后的数据
                console.log(xlsxData.value);

            };
            reader.readAsBinaryString(blob); // 以二进制格式读取文件
        })
        .catch((error) => {
            console.error('Error reading the XLSX file:', error);
            alert('文件读取失败');
        });
};

const cardPark = (item) => {
    console.log(item);
}

onMounted(() => {
    // const uid = route.query.uid;
    // const tid = route.query.tid;
    city.value = route.query.city;
    console.log("city == ", city);
})
</script>
<style scoped>
/* 在你的 CSS 文件或 <style> 标签中 */
.anchor-wrapper ::v-deep .ant-anchor {
    font-size: 50px;
}
.ellipsis {
  overflow: hidden; /* 溢出部分隐藏 */
  white-space: nowrap; /* 强制不换行 */
  text-overflow: ellipsis; /* 显示省略号 */
}
img {
  width: 100% !important;
  height: 200px;
  object-fit: cover;
}
.card-wrapper{
    display: flex; /* 弹性盒子 */
    flex-wrap: wrap; /* 弹性盒子换行 */
    justify-content: space-around; /* 水平间距 */
    /* align-items: center;  */
}
</style>