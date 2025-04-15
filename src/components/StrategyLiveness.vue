<template>
    <!-- <a-list item-layout="horizontal" :data-source="result">
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
</a-list> -->
    <a-row>
        <a-col :span="12">
            <a-statistic title="网站目前总用户数" :value="UserTotal" style="margin-right: 50px" />
            <!-- <div style="background: #ececec; padding: 30px"> -->
            <a-card style="background-color: transparent;border: none;">
                <a-statistic title="今日访问较昨日百分比" :value="AccessPercentage"  suffix="%" :valueStyle="AccessPercentageStatus == 1 ?{ color: '#3f8600' } : { color: '#cf1322' }"
                    style="margin-right: 50px">
                    <template #prefix>
                        <arrow-up-outlined v-if="AccessPercentageStatus == 1"/>
                        <arrow-down-outlined v-if="AccessPercentageStatus == -1"/>
                    </template>
                </a-statistic>
            </a-card>
        </a-col>
        <a-col :span="12">
            <a-statistic title="今日新增用户数"  :value="todayUser" />
            <a-card style="background-color: transparent;border: none;">
                <a-statistic title="今日攻略新增较昨日百分比" :value="projectResultData"  suffix="%" class="demo-class"
                :valueStyle="projectResultStatus == 1 ?{ color: '#3f8600' } : { color: '#cf1322' }">
                    <template #prefix>
                        <arrow-up-outlined v-if="projectResultStatus == 1"/>
                        <arrow-down-outlined v-if="projectResultStatus == -1"/>
                    </template>
                </a-statistic>
            </a-card>
        </a-col>
    </a-row>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import api from '@/api/request.js'
// import { message } from 'ant-design-vue'

const data = ref([]);

const UserTotal = ref(0);

// 创建结果数组
const result = ref([]);

const todayUser = ref([]);

const AccessPercentage = ref(0);

let AccessPercentageStatus = ref(0);

let projectResultStatus = ref(0);

const projectResultData = ref(0);

//const lookPicture = (url) => {
//  const iframe = document.createElement("iframe");
//iframe.src = `data:text/html;charset=utf-8,encodeURI("<html><body style='margin:0;'><img src='${url}' style='max-width:100%; height:auto;'></body></html>")`;
//iframe.style.width = "100%";
//iframe.style.height = "100vh";
//iframe.style.border = "none";

//const newWindow = window.open("", "_blank");
//newWindow.document.body.appendChild(iframe);
//}


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
            // const newTime = new Date(record.time);

            // const options = {
            //     year: 'numeric',
            //     month: '2-digit',
            //     day: '2-digit',
            //     hour: '2-digit',
            //     minute: '2-digit',
            //     second: '2-digit',
            //     hour12: false, // 使用 24 小时制
            //     timeZone: 'Asia/Shanghai' // 设置为目标时区
            // };

            // const localTime = new Intl.DateTimeFormat('en-US', options).format(newTime);

            // // 格式化为 YYYY-MM-DD HH:mm:ss
            // const formattedTime = localTime.toISOString().replace('T', ' ').substring(0, 19);

            // 创建一个新的对象，包含 time
            const newItem = { ...template, time: record.time.split("T")[0] };

            // 将新对象添加到结果数组
            result.value.push(newItem);
        }
    });

    const newProject = await api.get("/project/searchAll");


    const projectResult = ref([]);
    // 遍历 records 数组
    newProject.data.forEach(record => {
            const newItem = { ...record, time: record.createTime.split(" ")[0] };

            // 将新对象添加到结果数组
            projectResult.value.push(newItem);
    });
    console.log("projectResult", projectResult.value);


    const todayNew = ref([]);

    const VisitedYesterday = ref([]);

    todayNew.value = result.value.filter(item => {
        // console.log("item", item);
        return item.time.split("T")[0] === new Date().toISOString().split("T")[0];
    });

    VisitedYesterday.value = result.value.filter(item => {
        // 获取当前日期并减去一天，得到昨天的日期
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // 减去一天
        return item.time.split("T")[0] === yesterday.toISOString().split("T")[0];
    });



    if (todayNew.value.length > VisitedYesterday.value.length && VisitedYesterday.value.length!=0) {
        AccessPercentageStatus.value = 1;
        AccessPercentage.value = (Number(todayNew.value.length - VisitedYesterday.value.length) / Number(VisitedYesterday.value.length)) * 100;
    }else if (todayNew.value.length < VisitedYesterday.value.length && VisitedYesterday.value.length!=0) {
        AccessPercentageStatus.value = -1;
        AccessPercentage.value = (Number(VisitedYesterday.value.length - todayNew.value.length) / Number(VisitedYesterday.value.length)) * 100;
    } else if(VisitedYesterday.value.length == 0&&todayNew.value.length!=0){
        AccessPercentageStatus.value = 1;
        AccessPercentage.value = (Number(todayNew.value.length)) * 100;
    }else {
        AccessPercentageStatus.value = -1;
        AccessPercentage.value = 0;
    }
console.log("AccessPercentage",AccessPercentage.value);
    const todayNewProject = ref([]);

    const VisitedYesterdayProject = ref([]);

    todayNewProject.value = projectResult.value.filter(item => {
        // console.log("item", item);
        return item.time.split("T")[0] === new Date().toISOString().split("T")[0];
    });

    VisitedYesterdayProject.value = projectResult.value.filter(item => {
        // 获取当前日期并减去一天，得到昨天的日期
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // 减去一天
        return item.time.split("T")[0] === yesterday.toISOString().split("T")[0];
    });
console.log("todayNewProject.value.length",todayNewProject.value.length);
console.log("VisitedYesterdayProject.value.length",VisitedYesterdayProject.value.length);
    if (todayNewProject.value.length > VisitedYesterdayProject.value.length && VisitedYesterdayProject.value.length!=0) {
        projectResultStatus.value = 1;
        projectResultData.value = (Number(todayNewProject.value.length - VisitedYesterdayProject.value.length) / Number(VisitedYesterdayProject.value.length)) * 100;
    }else if (todayNewProject.value.length < VisitedYesterdayProject.value.length && VisitedYesterdayProject.value.length!=0) {
        projectResultStatus.value = -1;
        projectResultData.value = (Number(VisitedYesterdayProject.value.length - todayNewProject.value.length) / Number(VisitedYesterdayProject.value.length)) * 100;
    }else if(VisitedYesterdayProject.value.length == 0){
        projectResultStatus.value = 1;
        projectResultData.value = (Number(todayNewProject.value.length))*100;
    }else {
        projectResultStatus.value = 0;
        projectResultData.value = 0;
    }

};

const UserToTotal = () => {
    api.get("/findAllUser").then(res => {
        UserTotal.value = res.data.length;
        console.log("UserTotal", UserTotal);
        const day = new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + "-" + (new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate());
        todayUser.value = res.data.filter(item => {
            const time = item.createTime.split(" ")[0];
            return time === day;
        }).length;
        // todayUser.value = todayUser.value.length;
        console.log("todayUser", todayUser);
    });
}

onMounted(() => {
    fetchData();
    UserToTotal();
});

</script>
<style>
.StatisticalCharts {
    overflow: auto;
    display: flex;
    justify-content: space-around;
}

div.ant-card-body {
    padding-left: 0 !important;
}
</style>