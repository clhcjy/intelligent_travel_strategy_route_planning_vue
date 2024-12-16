<template>
    <div></div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="'资源'"
        @back="() => $router.push({ path: '/HomeMap' })">
        <template #extra>
            <a-input placeholder="搜索" v-model:value="searchText" @pressEnter="callPythonScript()" />
        </template>
    </a-page-header>
    <div style="padding: '20px';">
        <a-anchor :affix="false" direction="horizontal" :items="items" @click="handleClick" :get-current-anchor="getCurrentAnchor"/>
    </div>
    <div v-if="href.value != ''" class="card-wrapper">
        <a-card :loading="loading" hoverable v-for="(item, index) in resources" :key="index" style="width: 200px;margin: 20px;"
            @click="cardPark(item)">
            <template #cover>
                <img alt="example" :src="'/' + item.link" />
            </template>
            <a-card-meta :title="item.title" :description="item.content" class="ellipsis">
            </a-card-meta>
        </a-card>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, h } from 'vue';
// import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';
import api from '@/api/request';

const router = useRouter();

const route = useRoute();

const loading = ref(true);

let href = ref('');

const handleClick = (e, link) => {
    href.value = link.href;
    readExcel(link.href);
};

const callPythonScript = () => {
}

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
const resources = ref([]); // 获取文件
let searchText = ref('');
const readExcel = (href) => {
    api.post('/resources/classification', { classification: href }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        resources.value = res.data.map((item, index) => {
            item.index = index + 1;
            return item;
        })        
        loading.value = false;
    })
};

const getCurrentAnchor = () => {
    readExcel(href.value);
    return href.value;
};

const cardPark = (item) => {
    
    router.push({ name: 'DetailFication', query: {id:item.id, content: item.content, title: item.title, link: item.link } })
    localStorage.setItem('classiFication', JSON.stringify({ uid: route.query.uid,tid: route.query.tid,city: route.query.city,href:href.value })); // 保存变量到localStorage
}

onMounted(() => {
    city.value = route.query.city;
    if(route.hash){
        href.value = route.hash;
    }
    
})
</script>
<style scoped>
/* 在你的 CSS 文件或 <style> 标签中 */
.anchor-wrapper ::v-deep .ant-anchor {
    font-size: 50px;
}

.ellipsis {
    overflow: hidden;
    /* 溢出部分隐藏 */
    white-space: nowrap;
    /* 强制不换行 */
    text-overflow: ellipsis;
    /* 显示省略号 */
}

img {
    width: 100% !important;
    height: 200px;
    object-fit: cover;
}

.card-wrapper {
    display: flex;
    /* 弹性盒子 */
    flex-wrap: wrap;
    /* 弹性盒子换行(不允许换行) */
    justify-content: space-around;
    /* 水平间距 */
    /* align-items: center;  */
}
</style>