<template>
    <div class="detail-fication">
        <div class="detail-fication-title">{{ item.title }}</div>
        <a-divider style="height: 2px; background-color: #000" />
        <div class="detail-fication-img">
            <img alt="example" :src="'/' + item.link"
                fallback="data:image/png;base64,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" />
            <div class="detail-fication-content">{{ item.content }}</div>
        </div>
        <a-float-button @click="back" tooltip="返回" :style="{
            right: '120px',
        }">
            <template #icon>
                <BankOutlined />
            </template>
        </a-float-button>
        <a-back-top />
    </div>
    <div>
        <a-divider style="height: 5px" orientation="right" orientation-margin="0px">
            <a-input v-model:value="comment" :bordered="false" placeholder="点击我，留下评论" @pressEnter="commentSubmit()" />
        </a-divider>


        <!-- 评论区 -->
        <a-list  class="demo-loadmore-list" :loading="initLoading" :header="`${data.length} 条评论`" item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-comment :author="item.username">
                        <template #avatar>
                            <a-avatar :src="item.avatar" :alt="item.username" @click="avatarClick(item.avatar)" />
                        </template>

                        <template #content>
                            <p>
                                {{ item.content }}
                            </p>
                        </template>
                        <template #datetime>
                            <a-tooltip :title="item.createTime">
                                <span> {{ item.createTime.fromNow() }} </span>
                            </a-tooltip>
                        </template>
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script setup>
import { BankOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import api from '@/api/request.js';
import moment from "moment";

const router = useRouter();
const route = useRoute();

dayjs.extend(relativeTime);

const data = ref([]);

const comment = ref("");

const back = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        router.push({ name: 'classiFication', query: { uid: backTime.value.uid, tid: backTime.value.tid, city: backTime.value.city }, hash: backTime.value.href });

    } else {
        console.warn('userId is not defined in localStorage');
    }
};

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

const avatarClick = (avatar) => {
    if (avatar) {
        // 使用window.open进行跳转
        window.open(avatar, '_blank');
    }
};

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
    link: "",
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
    item.value.link = route.query.link;
    console.log(item);
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
.detail-fication {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: black;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5%;
}

.detail-fication-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 2%;
    text-align: center;
    font-size: xx-large;
}

.detail-fication-img {
    display: flex;
    margin: 2%;
}

.detail-fication-img img {
    width: 50%;
    height: 50%;
    border-radius: 10%;
    margin-left: 2%;
    object-fit: cover;
}

.detail-fication-content {
    width: 50%;
    height: 50%;
    line-height: 50px;
    text-align: center;
    margin-left: 2%;
    font-size: large;
}

.demo-loadmore-list {
  min-height: 350px;
}
</style>