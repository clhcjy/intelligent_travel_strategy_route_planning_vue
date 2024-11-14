<template>

  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="我的攻略">
      <a-back-top />
      <a-table :columns="columns" :data-source="data"
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" @change="changePage"
        :pagination="pagination" :rowKey="record => record.id">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'StrategyRecord'">
            <span>
              <smile-outlined />
              {{ column.title }}
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'StrategyRecord'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag v-for="tag in record.tags" :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="开始创作">
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
    <a-tab-pane key="3" tab="资源查询">
      <a-back-top />
      f Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab
      Pane
      3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content
      of
      Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane
      3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content
      of
      Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane
      3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3Content of Tab Pane 3
    </a-tab-pane>
  </a-tabs>



</template>
<script setup>
import { SmileOutlined, DownOutlined, InfoCircleOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { flattenedData } from '@/AreaDatas/flattenAddressData.js';
import dayjs from 'dayjs';
import api from '@/api/request.js';
let pagination = {
  total: null,
  current: null,
  pageSize: null,
};
let current = ref(1);
let pageSize = ref(5);
const activeKey = ref('1');
const type = ref({
  table: '',
  city: '',
  time: '',

});
const isStart = ref(false);
// console.log("AddressData == ",flattenedData);

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
    dataIndex: 'StrategyRecord',
    key: 'StrategyRecord',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

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
    dataIndex: 'name',
    key: 'name',
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
  }
];

let TravingData = [];

const data = [
  {
    index: '1',
    id: '1',
    title: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    index: '2',
    id: '2',
    title: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    index: '3',
    id: '3',
    title: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
let position = ref([]);
const onSearch = (value) => {
  console.log('search:', value);
  console.log("已添加的地点：", position.value);
};

const state = reactive({
  selectedRowKeys: [], // 选中行的 id 数组
  stateloading: false,
});
const changePage = (page, pageSize) => {
  console.log(page, pageSize)
  // console.log(current,pageSize);

  // if (searchOrAll == false) { searchAll(page.current, page.pageSize); } else { search(page.current, page.pageSize); }
};
const StartTheStrategy = () => {
  console.log(current, pageSize);
  isStart.value = true

}

const cityTime = [];
let day = '';
const changeTime = () => {
  // let day = dayjs(cityTime[1]);
  for (let i = 0; i < cityTime.length; i++) {
    for (let j = 0; j < cityTime[i].length; j++) {
      day = cityTime[i][j]
    }
  }
  console.log("day == ", day);

};

const disabledDate = (current) => {
  // Can not select days before today and today
  if (!day) {
    return current && current < dayjs().endOf('day');
  } else {
    return current && current < dayjs(day).endOf('day');
  }

};


const onSelectChange = (selectedRowKeys) => {
  console.log('表格选中: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

const enterName = (e) => {
  if (!e.target.value) {
    message.info("名称不能为空哦！")
  } else {
    console.log("value == ", e.target.value);
    type.value.city = "1"
  }
};

const DetermineTheCity = () => {
  if (!position.value) {
    message.info("请选择城市！")
  } else {
    type.value.time = "1"
    console.log("position == ", position.value);
  }
};

const ConfirmTheTime = () => {
  type.value.table = ""
  TravingData = [];
  let index = 0;
  const userId = localStorage.getItem('userId');
  for (let i = 0; i < cityTime.length; i++) {
    TravingData.push({
      index: index,
      uid: userId,
      name: position.value[i],
      startTime: cityTime[i][0],
      endTime: cityTime[i][1],
    });
    index++;
  }
  console.log("TravingData == ", TravingData);
  type.value.table = "1"
};

const ConfirmTheTravel = () => {
  let traving = [];
  TravingData.forEach(item => {
    traving.push({
      city: item.name,
      startTime: item.startTime,
      endTime: item.endTime,
      uid: item.uid
    });
  });
  for (let item in traving) {
    console.log(traving[item]);
    api.post("/traving/insert", traving[item],{
      header:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      message.success("添加成功！")
      console.log("res == ", res);
    }).catch(err => {
      message.error("添加失败！")
      console.log(err);
    });
  }

};

</script>

<style>
.ant-alert.ant-alert-success.ant-alert-with-description.ant-alert-closable.css-dev-only-do-not-override-1p3hq3p {
  align-items: center;
}

/* Add this CSS to your component's style section */
</style>