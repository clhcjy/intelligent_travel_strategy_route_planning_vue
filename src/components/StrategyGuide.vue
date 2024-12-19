<template>
    <div class="container">
        <a-table :columns="TravingColumns" :data-source="TravingData" :scroll="{ x: 3000, y: 500 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-row justify="space-around" style="padding: 10%;">
                        <a @click="toDetail(record)">详细安排</a>
                        <a-divider type="vertical" />
                        <a>删除</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            更多
                            <down-outlined />
                        </a>
                    </a-row>
                </template>
                <template v-if="column.key === 'tags'">
                    <a-tag color="success" class="label" v-for="item in record.tags" :key="item">{{ item }}</a-tag>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router';
import api from '@/api/request.js';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();

const TravingColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 80,
        fixed: 'left',
        align: 'center',
    },
    {
        title: '地址',
        dataIndex: 'title',
        key: 'title',
        align: 'center',
    },
    {
        title: '左坐标',
        dataIndex: 'lng',
        key: 'lng',
        align: 'center',
    },
    {
        title: '右坐标',
        dataIndex: 'lat',
        key: 'lat',
        align: 'center',
    },
    {
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        align: 'center',
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        align: 'center',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        width: 'auto', // 设置为 'auto' 以自动适应内容宽度
        minWidth: 100, // 设置最小宽度
        align: 'center',
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        align: 'center',
        width: 300,
    }
];

const TravingData = ref([]);

const toDetail = (record) => {
    console.log(record);

    router.push({ name: 'classiFication' });
}

onMounted(() => {
    // const uid = route.query.uid;
    const pid = route.query.pid;
    api.post("/points/findByPid", { pid: pid }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(res => {
        TravingData.value = res.data.map((item, index) => {
            item.index = index + 1;
            item.tags = JSON.parse(item.tags);
            return item;
        });
        console.log("TravingData == ", TravingData);

    }).catch(err => {
        console.log(err);
    });
})
</script>

<style scoped>
.label {
    display: inline-block;
    background-color: #e0f7fa;
    border-radius: 3px;
    padding: 2px 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #00796b;
}
</style>