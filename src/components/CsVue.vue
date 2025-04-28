<template>
    <div class="top">
        <div class="leftContent">
            <a-carousel autoplay :after-change="onChange">
                <div class="image-container" :v-for="(url, index) in item.link" :key="index">
                    <img v-if="item.status!=1" alt="example" :src="'/' + item.link[0]" />
                    <img v-else-if="item.status==1" alt="example" :src="item.link[0]" />
                </div>
            </a-carousel>
        </div>
        <div class="rightContent">
            <h1>{{ item.title }}</h1>
                <div style="" v-for="(cx, index) in item.content" :key="index">
                    {{ cx }}
                </div>
        </div>
    </div>
    <div class="footer">
        <a-divider style="height: 10px" orientation="right" orientation-margin="0px">
            <a-input v-model:value="comment" :bordered="false" placeholder="点击我，留下评论" @pressEnter="commentSubmit()" />
        </a-divider>
        <a-list class="demo-loadmore-list" :loading="initLoading" :header="`${data.length} 条评论`" item-layout="horizontal"
            :data-source="data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a-tooltip :title="item.createTime">
                            <span> {{ item.createTime.fromNow() }} </span>
                        </a-tooltip>
                    </template>
                    <a-list-item-meta>
                        <template #title>
                            <h3>{{ item.content }}</h3>
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.avatar" :alt="item.username" @click="avatarClick(item.avatar)" />
                        </template>
                    </a-list-item-meta>
                    <div style="margin-right: auto;">{{ item.username }}</div>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script setup>
// import { BankOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import api from '@/api/request.js';
import moment from "moment";

// const router = useRouter();
const route = useRoute();

dayjs.extend(relativeTime);

const data = ref([]);

const comment = ref("");

const commentSubmit = () => {
    const userId = localStorage.getItem('userId');
    api.post('/comment/insert', {
        content: comment.value,
        detailId: parseInt(item.value.id, 10),
        uid: userId,
        user_project_id: localStorage.getItem('userProjectId'),
        createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log("res == ", res);
    })
    setTimeout(() => {
        data.value = [];
        getData(item.value.id);
        comment.value = '';
    }, 1000);
};

const parseTravelText = () => {
    const lines = item.value.content?.split("\n");
    return lines;
}

// const comment = ref("");

const getData = (id) => {
    api.post('/comment/findByDetailId', { DetailId: id }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        console.log("res == ", res.data);
        for (let item of res.data) {

            api.get(`/findByIdRest/${item.uid}`).then(res => {
                item.username = res.data.username;
                item.avatarUrl = res.data.avatarUrl;
                data.value.push({
                    index: item.id,
                    content: item.content,
                    createTime: moment(item.createTime),
                    username: item.username,
                    avatar: item.avatarUrl,
                })

            }).catch(err => {
                console.log(err);
            });
        }
        // 确保数据按时间排序
        data.value.sort((a, b) => {
            return moment(a.createTime).valueOf() - moment(b.createTime).valueOf();
        });
        console.log("data", data);


    })
};

const item = ref({
    id: "",
    title: "",
    content: "",
    link: [],
    status:''
});
const user = ref({
    id: '',
    username: '',
    avatarUrl: ''
})

const backTime = ref({});

onMounted(() => {
    item.value.id = route.query.id;
    item.value.title = route.query.title;
    item.value.content = route.query.content;
    if (route.query.link[0] != '[') {
        item.value.link.push(route.query.link);
        console.log("item.value.link", item.value.link);
    }
    else{
        item.value.link.push(route.query.link);
        console.log("item.value.link", item.value.link);
    }
    item.value.status = route.query.status;
    console.log("item", item);
    item.value.content = parseTravelText();

    const userId = localStorage.getItem('userId');
    const k = localStorage.getItem('classiFication');
    backTime.value = JSON.parse(k);
    console.log("backTime == ", backTime.value);

    api.get(`/findByIdRest/${userId}`).then(res => {
        user.value = res.data;
        console.log("this.user", user.value);

    }).catch(err => {
        console.log(err);
    });

    getData(item.value.id);
})
</script>

<style scoped>
.top {
    width: 100%;
    height: 50%;
    display: flex;
}

.footer {
    width: 100%;
    height: 50%;
}

.leftContent {
    width: 50%;
    height: 100%;
    padding-left: 5%;
}

.rightContent {
    width: 50%;
    height: 100%;
    padding-left: 5%;
    max-height: 300px;
    overflow-y:auto;
    font-size: large;
}
.rightContent::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 17px; /* 滚动条的宽度 */
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); /* 渐变背景，覆盖滚动条 */
  pointer-events: none; /* 防止鼠标事件被伪元素拦截 */
}

/* For demo */
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    line-height: 160px;
    overflow: hidden;
    width: 80%;
    max-width: 600px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    /* 半透明背景 */
    backdrop-filter: blur(10px);
    /* 背景模糊效果 */
    border-radius: 15px;
    /* 圆角 */
    /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 阴影 */
    padding: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    /* 文字颜色 */
    text-align: center;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}

img {
    width: 100%; /* 宽度占满容器 */
    height: 100%; /* 高度占满容器 */
    object-fit: scale-down; /* 在不超出容器的前提下放大图片 */
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* object-fit: cover; */
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
    /* 模糊边框效果 */
    pointer-events: none;
    /* 避免影响交互 */
}

.demo-loadmore-list {
    padding-left: 6%;
}
</style>