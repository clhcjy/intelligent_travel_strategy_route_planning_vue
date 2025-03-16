<template>
    <a-list item-layout="horizontal" :data-source="result">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-list-item-meta description="这个人空空如也，什么也没有介绍哦……">
                    <template #title>
                        <a href="#">{{ item.username }}</a>
                    </template>
                    <template #avatar>
                        <a-avatar :src="item.avatarUrl" @click="lookPicture(item.avatarUrl)" />
                    </template>
                </a-list-item-meta>
                <div>{{ item.time }}</div>
            </a-list-item>
        </template>
    </a-list>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/request.js'
// import { message } from 'ant-design-vue'

const data = ref([]);

// 创建结果数组
const result = ref([]);

const lookPicture = (url) => {
    const iframe = document.createElement("iframe");
    iframe.src = `data:text/html;charset=utf-8,encodeURI("<html><body style='margin:0;'><img src='${url}' style='max-width:100%; height:auto;'></body></html>")`;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";

    const newWindow = window.open("", "_blank");
    newWindow.document.body.appendChild(iframe);
}


// 定义异步函数
const fetchData = async () => {
    // 等待第一个请求完成
    const res = await api.get("/findAllUser");
    data.value = res.data;

    // 第一个请求完成后，执行其他操作
    // 创建一个 Map，将 data 中的每个对象按 id 存储
    const dataMap = new Map(data.value.map(item => [item.id, { ...item }]));

    const records = await api.get("/record/findAll");

    // 遍历 records 数组
    records.data.forEach(record => {
        // 如果 data 中存在对应的 id
        if (dataMap.has(record.uid)) {
            // 获取对应的对象模板
            const template = dataMap.get(record.uid);
            // console.log("data中对应userid对象模版", template);
            // 将字符串转换为 Date 对象
            const newTime = new Date(record.time);

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // 使用 24 小时制
                timeZone: 'Asia/Shanghai' // 设置为目标时区
            };

            const localTime = new Intl.DateTimeFormat('en-US', options).format(newTime);

            // // 格式化为 YYYY-MM-DD HH:mm:ss
            // const formattedTime = localTime.toISOString().replace('T', ' ').substring(0, 19);

            // 创建一个新的对象，包含 time
            const newItem = { ...template, time: localTime };

            // 将新对象添加到结果数组
            result.value.push(newItem);
        }
    });
    console.log("result", result);


};

onMounted(() => {
    fetchData();
});

</script>