<template>
    <div class="container">
        <a-table :columns="TravingColumns" :data-source="TravingData">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <span>
                        <a @click="toDetail(record)">{{ record.city }}详细安排</a>
                        <a-divider type="vertical" />
                        <a>删除</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            更多
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script setup>
import { DownOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router';
import api from '@/api/request.js';
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router';

const route = useRoute();

const router = useRouter();

const TravingColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 80,
        align: 'center',
    },
    {
        title: '城市名',
        dataIndex: 'city',
        key: 'city',
    },
    {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: '操作',
        key: 'action',
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
            return item;
        });
        console.log("TravingData == ", TravingData);

    }).catch(err => {
        console.log(err);
    });
})
</script>