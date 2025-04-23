<template>

  <a-tabs v-model:activeKey="activeKey" type="card" @change="tabClick">
    <a-tab-pane key="1" tab="我的攻略">
      <a-back-top />
      <a-table :columns="columns" :data-source="data">
        <!-- :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" @change="changePage"
        :pagination="pagination" :rowKey="record => record.id"> -->
        <template #headerCell="{ column }">
          <template v-if="column.key === 'projectName'">
            <span>
              <smile-outlined />
              {{ column.title }}
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'projectName'">
            <a>
              {{ record.projectName }}
            </a>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <a @click="toDetail(record)">查看 一 {{ record.projectName }}</a>
              <a-divider type="vertical" />
              <a @click="deleteStrategy(record)">删除</a>
              <a-divider type="vertical" />
            </span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <!-- <a-tab-pane key="2" tab="开始创作">
      <a-back-top />
      <a-alert message="小旅欢迎您！" description="准备好了我们就开始吧！" type="success" show-icon closable>
        <template #icon><smile-outlined /></template>
        <template #action>
          <a-button size="large" type="text" @click="StartTheStrategy">点我开始</a-button>
        </template>
      </a-alert>
      <div v-if="isStart">
        <a-divider orientation="left">先给这个攻略起个名称吧！</a-divider>
        <a-input @pressEnter="enterName" v-model:value="strategyName" :bordered="false" placeholder="请输入你的攻略名称"
          style="width: 30%;">
          <template #prefix>
            <EditOutlined />
          </template>
          <template #suffix>
            <a-tooltip title="Extra information">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </div>
      <div v-if="type.city == 1">
        <a-divider orientation="left">请选择你的目的地</a-divider>
        <div style="display: flex;align-items: center;">
          <a-select v-model:value="position" mode="multiple" style="width: 95%" placeholder="请选择"
            :options="flattenedData" @change="onSearch">
          </a-select>
          <CheckOutlined style="margin-left: auto" @click="DetermineTheCity" />
        </div>
        <div v-if="type.time == 1">
          <a-divider orientation="left">选择你的行程时间</a-divider>
          <a-form-item v-for="(item, index) in position" :key="index" :label="item">
            <a-range-picker v-model:value="cityTime[index]" valueFormat="YYYY-MM-DD" @change="changeTime"
              :disabled-date="disabledDate" />
          </a-form-item>
          <a-button type="primary" @click="ConfirmTheTime">确认时间</a-button>
        </div>
        <div v-if="type.table == 1">
          <a-divider orientation="left">你的行程</a-divider>
          <a-table :columns="TravingColumns" :data-source="TravingData" bordered>
            <template #bodyCell="{ column, text }">
              <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
              </template>
            </template>
          </a-table>
          <a-divider orientation="right"><a @click="ConfirmTheTravel">确认行程</a></a-divider>
        </div>
      </div>


    </a-tab-pane>
    <a-tab-pane key="3" tab="资源查询" @click="toClass">
      <a-back-top />
      <router-view />
    </a-tab-pane> -->
  </a-tabs>



</template>
<script setup>
import { SmileOutlined} from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
// import { flattenedData } from '@/AreaDatas/flattenAddressData.js';
// import dayjs from 'dayjs';
import api from '@/api/request.js';
import { useRouter } from 'vue-router';

// const strategyName = ref('');

const router = useRouter();

// let current = ref(1);
// let pageSize = ref(5);
const activeKey = ref('1');
// const type = ref({
//   table: '',
//   city: '',
//   time: '',

// });
// const isStart = ref(false);

const columns = [
  {
    title: "序号",
    dataIndex: 'index',
    key: 'index',
    width: 80,
    align: 'center',
  },
  {
    title: '攻略记录',
    dataIndex: 'projectName',
    key: 'projectName',
    width: 200,
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    align: 'center'
  },
];

// const TravingColumns = [
//   {
//     title: '序号',
//     dataIndex: 'index',
//     key: 'index',
//     width: 80,
//     align: 'center',
//   },
//   {
//     title: '城市名',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: '开始时间',
//     dataIndex: 'startTime',
//     key: 'startTime',
//   },
//   {
//     title: '结束时间',
//     dataIndex: 'endTime',
//     key: 'endTime',
//   }
// ];

// let TravingData = [];

const data = ref([]);
// let position = ref([]);

const deleteStrategy = (record) => {
  api.post("/project/delete", { pid: record.pid },{headers:{'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
    if(res.status === 200){
      message.success("删除成功！");
      searchAll();
    }
  });
  
};

const tabClick = () => {
  console.log("activeKey",activeKey);
  if(activeKey.value == '3'){
  router.push({name:"StrategyDataDetail"});
}
}
// const toClass = () => {
//   router.push({name:"StrategyDataDetail"});
// }

// const onSearch = (value) => {
//   console.log('search:', value);
//   console.log("已添加的地点：", position.value);
// };

// const StartTheStrategy = () => {
//   console.log(current, pageSize);
//   isStart.value = true

// }

// const cityTime = [];
// let day = '';
// const changeTime = () => {
//   // let day = dayjs(cityTime[1]);
//   for (let i = 0; i < cityTime.length; i++) {
//     for (let j = 0; j < cityTime[i].length; j++) {
//       day = cityTime[i][j]
//     }
//   }
//   console.log("day == ", day);

// };

// const disabledDate = (current) => {
//   // Can not select days before today and today
//   if (!day) {
//     return current && current < dayjs().endOf('day');
//   } else {
//     return current && current < dayjs(day).endOf('day');
//   }

// };

const toDetail = (record) => {
  localStorage.setItem('userProjectId', JSON.stringify(record.pid));
  router.push({ name: 'StrategyGuide', query: { uid: record.uid, pid: record.pid } });
}

// const onSelectChange = (selectedRowKeys) => {
//   console.log('表格选中: ', selectedRowKeys);
//   state.selectedRowKeys = selectedRowKeys;
// };

// const enterName = (e) => {
//   if (!e.target.value) {
//     message.info("名称不能为空哦！")
//   } else {
//     type.value.city = "1"
//     api.post("/project/insert", { uid: localStorage.getItem('userId'), projectName: e.target.value }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => {
//       localStorage.setItem('projectId', JSON.stringify(res.data.pid)); // 保存变量到localStorage
//     })
//   }
// };

// const DetermineTheCity = () => {
//   if (!position.value) {
//     message.info("请选择城市！")
//   } else {
//     type.value.time = "1"
//     console.log("position == ", position.value);
//   }
// };

// const ConfirmTheTime = () => {
//   type.value.table = ""
//   TravingData = [];
//   let index = 0;
//   const userId = localStorage.getItem('userId');
//   for (let i = 0; i < cityTime.length; i++) {
//     TravingData.push({
//       index: index,
//       uid: userId,
//       name: position.value[i],
//       startTime: cityTime[i][0],
//       endTime: cityTime[i][1],
//     });
//     index++;
//   }
//   console.log("TravingData == ", TravingData);
//   type.value.table = "1"
// };

// const ConfirmTheTravel = () => {
//   let traving = [];
//   TravingData.forEach(item => {
//     traving.push({
//       pid: localStorage.getItem('projectId'),
//       city: item.name,
//       startTime: item.startTime,
//       endTime: item.endTime,
//       uid: item.uid
//     });
//   });
//   for (let item in traving) {
//     console.log(traving[item]);
//     api.post("/traving/insert", traving[item], {
//       header: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => {
//       message.success("添加成功！")
//       console.log("res == ", res);
//     }).catch(err => {
//       message.error("添加失败！")
//       console.log(err);
//     });
//   }

// };

const searchAll = () => {
  api.post("/project/searchByUid",{uid:localStorage.getItem('userId')},{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    console.log("res.data == ", res.data);
    data.value = res.data.map((item, index) => {
      item.index = index + 1;
      return item;
    });
    console.log("data == ", data.value);
  }).catch(err => {
    console.log(err);
  });
};

onMounted(() => {
  searchAll();


});

</script>

<style>
.ant-alert.ant-alert-success.ant-alert-with-description.ant-alert-closable.css-dev-only-do-not-override-1p3hq3p {
  align-items: center;
}

.ant-table{
  background-color: transparent;
}

/* Add this CSS to your component's style section */
</style>