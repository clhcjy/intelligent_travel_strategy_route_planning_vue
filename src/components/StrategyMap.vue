<template>
  <div ref="container" style="width: 100%; height: 100vh; position: relative;z-index:1000;">
  </div>
  <!-- 检索地点 -->
  <a-form-item label="地点关键词"
    style="position: absolute; top: 10px; left: 10px;width:10%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);"
    v-if="isProject == true">
    <a-auto-complete v-model="value" :options="options" style="width: 180px" placeholder="input here" @select="onSelect"
      @search="onSearch" />
  </a-form-item>

  <div
    style="position: absolute; top: 50%; left: 40%;width:10%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);border: #000000;"
    v-if="isProject == false">
    <div>
      添加项目：<a-input v-model:value="projectName" @pressEnter="addProject" placeholder="请输入项目名" />
    </div>
  </div>
  <!-- 点列表 -->
  <div
    style="position: absolute; top: 10px; right: 10px;width:30%;height: 20vh; z-index: 9999;display: flex;background-color: rgba(255, 255, 255, 0.8);border: #000000;">
    <div style="width: 50%;height: 100%;">
      <img :src="picture" style="width:90%;height:90%;opacity: 0.5;margin-left: 5%;object-fit: cover;border-radius: 10%;">
    </div>
    <div style="width: 50%;height: 100%;display:flex;justify-content: center;align-items: center;text-align: center">
      {{ projectName }}
    </div>
  </div>

  <!-- <div
    style="position: absolute; top: 80px;height: 20vh; z-index: 9999;display: flex;background-color: rgba(255, 255, 255, 0.8);border: #000000;"
    v-if="htmls.length > 0">
    <div v-for="item in htmls" :key="item">
      <div v-html="item.html"></div>
    </div>
    <a-button @click="htmls = []" type="link">关闭</a-button>
  </div> -->

  <div
    style="position: absolute; top: 20vh; right: 10px;width:30%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);border: #fff;"
    v-if="points.length > 0 && isProject == true">
    <a @click="toggleExpand" v-if="isExpand === true">
      <UpOutlined />收起
    </a>
    <a @click="toggleExpand" v-else>
      <DownOutlined />展开
    </a>
  </div>
  <div
    style="position: absolute; top: 22vh; right: 10px;width:30%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);border: #000000;"
    v-if="points.length > 0 && isProject == true && isExpand == true">
    <a-divider style="height: 1px; background-color: #000000" />
    <a-list item-layout="horizontal" :data-source="points" style="border: #000000" :pagination="pagination">
      <template #renderItem="{ item }">
        <a-list-item @click="positionCenter(item)">
          <a-list-item-meta :description="item.lng + '——' + item.lat">
            <template #title>
              <span>{{ item.title }}</span>
              <a-button type="link" style="float: right;" @click="deletePoint(item)">删除</a-button>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <a-divider style="height: 1px; background-color: #000000" />
    <a-button type="link" style="width:30%;float: right;text-align: center;margin-bottom: 10px;"
      @click="addAllPoints">全部添加</a-button>
    <a-button type="link" style="width:30%;float: right;text-align: center;margin-bottom: 10px;"
      @click="deleteAllPoints">全部删除</a-button>
  </div>

  <div
    style="position: absolute; bottom: 10px; right: 33%; width: 33%; height: 50px; z-index: 9999; display: flex;align-items: center;justify-content: space-around; background-color: rgba(255, 255, 255, 0.8);border: #000000;border-radius: 10%;">

    <!-- 改变地图样式 -->
    <a-popover v-model:open="visible" trigger="click">
      <template #content>
        <div style="display: flex; justify-content: space-around; background-color: rgba(255, 255, 255, 0.8);">
          <a-card hoverable style="width: 10%;" v-for="item in MapPicture" :key="item.label" @click="ToSetMapType(item)">
            <template #cover>
              <img alt="example" :src="item.src" style="width: 100%;height: 100%;" />
            </template>
            <a-card-meta :title="item.label">
            </a-card-meta>
          </a-card>
        </div>
      </template>

      <!-- 点击图标打开 -->
      <HighlightTwoTone @click="add" />
    </a-popover>

    <!-- 路线规划导航 -->
    <a-popover v-model:open="navicatVisible" trigger="click" arrow-point-at-center>
      <template #content>
        <div
          style="display: flex; justify-content: space-around;padding:5px; background-color: rgba(255, 255, 255, 0.8);">
          <a-popover v-for="item in navicat" :key="item">
            <template #content>
              <p>{{ item.vehicle }}</p>
            </template>
            <a-card style="margin: 5px;" @click="plan(item.vehicle)">
              <img :src="item.icon" style="width: 20px;height: 20px;" />
            </a-card>
          </a-popover>
        </div>
      </template>

      <!-- 点击图标打开 -->
      <img src="../../public/navigation.png" style="width: 20px;height: 16px;" @click="navigate" />
    </a-popover>

    <!-- 返回 -->
    <RollbackOutlined @click="back" />
    <HighlightTwoTone @click="add" />
    <HighlightTwoTone @click="add" />
  </div>

  <!-- 抽屉 -->
  <div
    style="position: absolute; top: 30vh; left: 10px; width: 40%; height: 50vh; z-index: 9999; display: flex;align-items: center;justify-content: space-around; background-color: transparent;border: #000000;overflow-y: auto;"
    v-show="DetailPoint">
    <a-drawer v-model:open="DetailPoint" class="custom-class" root-class-name="root-class-name"
      :root-style="{ color: 'blue' }" style="color: red;" :title="pointDetail.title" :get-container="false" :mask="false"
      placement="left">
      <div class="info-window">
        <p class="address">地址：{{ pointDetail.address }}</p>
        <p>省份：{{ pointDetail.province }}</p>
        <p>城市：{{ pointDetail.city }}</p>
        <p>标签：
          <a-tag color="success" class="label" v-for="item in pointDetail.tags" :key="item">{{ item }}</a-tag>
        </p>
        <div style="justify-content: space-around; width: 100%; display: flex;margin-top: 10px;margin-bottom: 10px;">
          <a-button @click="SetStartingPoint()" v-if="!isStartingPoint">设为起点</a-button>
          <a-button @click="DeleteStartingPoint()"
            v-else-if="isStartingPoint && pointDetail.isStartingPoint">取消起点</a-button>
          <a-button @click="SetEndPoint()" v-if="!isEndingPoint">设为终点</a-button>
          <a-button @click="DeleteEndPoint()" v-else-if="isEndingPoint && pointDetail.isEndPoint">取消终点</a-button>
          <a-button @click="update" v-if="isupdate">最终确定</a-button>
        </div>
        <a-select v-model:value="searchText" placeholder="选择标签"
          :get-popup-container="(triggerNode) => triggerNode.parentNode" @change="searchNearby" style="width: 100%">
          <a-select-option value="美食">美食</a-select-option>
          <a-select-option value="银行">银行</a-select-option>
          <a-select-option value="商场">商场</a-select-option>
          <a-select-option value="公园">公园</a-select-option>
          <a-select-option value="酒店">酒店</a-select-option>
          <a-select-option value="医院">医院</a-select-option>
          <a-select-option value="学校">学校</a-select-option>
          <a-select-option value="加油站">加油站</a-select-option>
          <a-select-option value="便利店">便利店</a-select-option>
          <a-select-option value="娱乐场所">娱乐场所</a-select-option>
        </a-select>
        <!-- <a-input v-model:value="searchText" placeholder="搜索附近"
          @pressEnter="searchNearby(pointDetail.lng, pointDetail.lat)" /> -->
      </div>
      <div class="info-window">
        <div style="text-align: center;color: #000000;">
          <div style="display: flex;justify-content: space-around;align-items: center;">
            <a @click="showModalAdd">写攻略</a>
            <h4>必看推荐</h4>
          </div>

          <div style="width:300px;display: flex;flex-wrap: wrap;">
            <a-card v-for="(item, index) in recommendation" :key="index" style="width: 100px;margin: 10px;">
              <template #cover>
                <img alt="example" :src="'http://localhost:8082/' + item.link" />
              </template>
              <a-card-meta :title="item.title">
                <template #description>
                  <div style="white-space: nowrap; /* 不换行 */
                              overflow: hidden; /* 超出部分隐藏 */
                              text-overflow: ellipsis; /* 超出部分显示省略号 */
                              width: 100%; /* 设置宽度 */">
                    {{ item.content }}
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </div>
      </div>
    </a-drawer>


    <!-- 写攻略弹窗 -->
    <a-modal :maskClosable="false" :mask="false" v-model:open="openAdd" title="写攻略" @ok="handleOkAdd">
      <template #footer>
        <a-button key="back" @click="handleCancelAdd">返回</a-button>
        <a-button key="submit" type="primary" :loading="loadingAdd" @click="handleOkAdd">提交</a-button>
      </template>


      <!-- 标题 -->
      <a-form-item label="标题" name="标题" >
        <a-input style="width: 100%" v-model:value="RaiderData.title" />
      </a-form-item>

      <!-- 分类 -->
      <a-form-item label="分类" name="分类">
        <a-select ref="select" v-model:value="RaiderData.classification" style="width: 100%">
          <a-select-option v-for="(item, index) in optionsAdd" :key="index" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- 内容 -->
      <a-form-item label="攻略内容" name="攻略内容" >
        <a-textarea placeholder="攻略内容，可直接粘贴，需要换行的地方记得回车~" v-model:value="RaiderData.content" />
      </a-form-item>


      <!-- 上传图片部分 -->
      <a-form-item label="上传图片" name="上传图片" >
      <a-upload style="width:100%;display: flex;" :show-upload-list="true" v-model:file-list="fileList1"
        action="http://localhost:8081/upload/User" list-type="picture" class="upload-list-inline" @change="handleUploadChange">
        <PlusSquareOutlined>
          <upload-outlined></upload-outlined>
        </PlusSquareOutlined>
      </a-upload>
    </a-form-item>
    </a-modal>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { HighlightTwoTone, RollbackOutlined, UpOutlined, DownOutlined,PlusSquareOutlined } from '@ant-design/icons-vue';
import api from '@/api/request.js';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
// import MapVgl from '@mapvgl/mapvgl'; 
const RaiderData = ref({
  title: '',
  content: '',
  link: '',
  classification: '#美食',
  status:'1'
});

const container = ref(null);

const loadingAdd = ref(false);

const openAdd = ref(false);

const imageUrl = ref([]);

const fileList1 = ref([]);

const optionsAdd = ref([
  {
    label: '景点',
    value: '#景点'
  },
  {
    label: '美食',
    value: '#美食'
  },
  {
    label: '活动',
    value: '#活动'
  },
  {
    label: '酒店',
    value: '#酒店'
  },
  {
    label: '车票',
    value: '#车票'
  },
  {
    label: '娱乐',
    value: '#娱乐'
  }
])

const  handleUploadChange = (info) => {
      const { status, response } = info.file;
      console.log("response", response);

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log("response", response);
        const i = response.split(':')
        i.shift();
        // this.registerForm.avatarUrl = i.join(':');
        imageUrl.value.push(i.join(':'));
        message.success(`${info.file.name} 文件上传成功.`);
        console.log("imageUrl", imageUrl);

      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    }

const showModalAdd = () => {
  openAdd.value = true;
  DetailPoint.value = false;
  console.log("openAdd.value", openAdd.value)
};

const handleOkAdd = () => {
  loadingAdd.value = true;
  RaiderData.value.link = '['+imageUrl.value.join(',') +']'
  api.post("/resources/insert",{...RaiderData.value},{
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(()=>{
    loadingAdd.value = false;
    openAdd.value = false;
    DetailPoint.value = true;
    message.success("新增攻略成功！")
  })
};

const handleCancelAdd = () => {
  openAdd.value = false;
  DetailPoint.value = true;
};

const MapPicture = ref([
  { label: "原版", src: "http://mapopen-file-upload.bj.bcebos.com/custom/png/9a634f19df335953774e3854c1c0db11_1733970652.png?1733970662474&quot" },
  { label: "绿野仙踪", src: "http://mapopen-file-upload.bj.bcebos.com/custom/png/9a634f19df335953774e3854c1c0db11_1733970581.png?1733970662475&quot" },
  { label: "眼眸", src: "https://mapopen-website-wiki.cdn.bcebos.com/lbs/custommap/yanmou.jpg" },
  { label: "茶田", src: "https://mapopen-website-wiki.cdn.bcebos.com/lbs/custommap/teafield.jpg" },
  { label: "中秋", src: "https://mapopen-website-wiki.cdn.bcebos.com/lbs/custommap/moonfestival.jpg" },
  { label: "物流", src: "https://mapopen-website-wiki.cdn.bcebos.com/lbs/custommap/wuliu.jpg" },
  { label: "出行", src: "https://mapopen-website-wiki.cdn.bcebos.com/lbs/custommap/chuxing.jpg" },
]);

const route = useRoute();
const router = useRouter();

const searchText = ref('');

const pointDetail = ref({});

const isExpand = ref(true);

const options = ref([]);

const other = ref([]);

const points = ref([]);

const ALLpoints = ref([]);

const recommendation = ref([]);

const picture = ref(null);

const projectName = ref('');

const isStartingPoint = ref(false);

const isEndingPoint = ref(false);

const pid = ref('');

const isProject = ref(false);

const style = ref([]);

const visible = ref(false);

const DetailPoint = ref(false);

const navicatVisible = ref(false);

const isupdate = ref(false);

// const htmls = ref([]);

const navicat = ref([
  { vehicle: '驾车', icon: "http://localhost:8082/car.png" },
  { vehicle: '公交', icon: 'http://localhost:8082/Bus.png' },
  { vehicle: '骑行', icon: 'http://localhost:8082/RIDE.png' },
  { vehicle: '步行', icon: 'http://localhost:8082/walk.png' }
])
let id = 0;
let value = ref('');
let markers = []; // 用于存储所有标记的数组
let labels = [];
// 定义路径规划对象
let driving = null;
let bus = null;
let walking = null;
let riding = null;
let map = null;
let BMapGL = window.BMapGL;

const recomend = (title) => {
  api.post("/resources/recommend", { title: title }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
    console.log(res.data);
    recommendation.value = res.data.map((item, index) => {
      item.index = index + 1;
      return item;
    })
    console.log("必看推荐", recommendation.value);
  })
};

const StartingPoint = () => {
  const a = ALLpoints.value.filter((item) => {
    return item.tags.includes("起点");
  });
  return a;
}
const EndingPoint = () => {
  const a = ALLpoints.value.filter((item) => {
    return item.tags.includes("终点");
  });
  return a;
};

// 计算两点之间的距离
const calculateDistance = (point1, point2) => {


  return Math.sqrt(Math.pow(point1.lng - point2.lng, 2) + Math.pow(point1.lat - point2.lat, 2));
};

// 找到其他点与起点最近的点
const findClosestPoint = (currentPoint, points) => {
  let closestPoint = null;

  // 初始化最小距离为正无穷大
  let minDistance = Infinity;

  points.forEach(point => {
    const distance = calculateDistance(currentPoint, point);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  });

  return closestPoint;
}

// 计划路线
const planRoute = (a, b, other) => {
  let currentPoint = a;
  let newPoints = [a]; // 起点加入新路径

  while (other.length > 0) {
    const closestPoint = findClosestPoint(currentPoint, other);
    if (!closestPoint) break; // 如果没有找到最近的点，跳出循环

    newPoints.push(closestPoint); // 将最近的点加入路径
    other = other.filter(point => point !== closestPoint); // 从候选点中移除已加入路径的点

    currentPoint = closestPoint; // 更新当前点

    if (currentPoint === b) break; // 如果当前点是终点，结束循环
  }

  newPoints.push(b); // 终点加入新路径
  return newPoints; // 返回构建的路径
};

const SetStartingPoint = () => {
  pointDetail.value.isStartingPoint = true
  isStartingPoint.value = true
  isupdate.value = true
  pointDetail.value.tags.push("起点")
};

const SetEndPoint = () => {
  pointDetail.value.isEndPoint = true
  isEndingPoint.value = true
  isupdate.value = true
  pointDetail.value.tags.push("终点")
};

const DeleteStartingPoint = () => {
  delete (pointDetail.value.isStartingPoint)
  isStartingPoint.value = false
  isupdate.value = false
  pointDetail.value.tags.splice(pointDetail.value.tags.indexOf("起点"), 1)
};

const DeleteEndPoint = () => {
  delete (pointDetail.value.isEndPoint)
  isEndingPoint.value = false
  isupdate.value = false
  pointDetail.value.tags.splice(pointDetail.value.tags.indexOf("终点"), 1)
};

const pagination = {
  onChange: (page) => {
    console.log(page);
  },
  pageSize: 3,
};

const navigate = () => {
  navicatVisible.value = true;
  visible.value = false;
};

const toggleExpand = () => {
  isExpand.value = !isExpand.value;
};

const addProject = () => {
  api.post("/project/insert", { uid: localStorage.getItem('userId'), projectName: projectName.value }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // if (res.data === '') {
    //   message.error("添加项目失败：项目名已存在")
    // }
    // else {
    message.success("添加项目成功");

    localStorage.setItem('projectId', JSON.stringify(res.data.id)); // 保存变量到localStorage
    isProject.value = true;
    //  }
  })
  points.value = [];
  markers = [];
  map.clearOverlays();
  map.centerAndZoom('深圳市', 15);
  isProject.value = true;
}

// const formData = (seconds) => {
//   let days = Math.floor(seconds / (24 * 3600));
//   seconds %= (24 * 3600);
//   let hours = Math.floor(seconds / 3600);
//   seconds %= 3600;
//   let minutes = Math.floor(seconds / 60);
//   seconds %= 60;
//   if (days == 0 && hours != 0 && minutes != 0) {
//     return `${hours}小时${minutes}分钟${seconds}秒`
//   } else if (days == 0 && hours == 0 && minutes != 0) {
//     return `${minutes}分钟${seconds}秒`
//   } else if (days == 0 && hours == 0 && minutes == 0) {
//     return `${seconds}秒`
//   } else {
//     return `${days}天${hours}小时${minutes}分钟${seconds}秒`
//   }
// };

const clearRoutes = () => {
  // 清除驾车路线
  if (driving) driving.clearResults();
  // 清除公交路线
  if (bus) bus.clearResults();
  // 清除步行路线
  if (walking) walking.clearResults();
  // 清除骑行路线
  if (riding) riding.clearResults();
};

const vehicle = (category) => {
  clearRoutes(); // 在每次路径规划前清除之前的规划结果


  let aList = StartingPoint();
  let bList = EndingPoint();
  if (aList.length === 0) { message.error("请选择起点"); return }
  else if (bList.length === 0) { message.error("请选择终点"); return }
  else {
    const otherList = ALLpoints.value.filter((item) => item.id !== aList[0].id && item.id !== bList[0].id);
    let other = otherList.map((item) => {
      return {
        lng: item.lng,
        lat: item.lat
      };
    });
    let a = {
      lng: aList[0].lng,
      lat: aList[0].lat
    };
    let b = {
      lng: bList[0].lng,
      lat: bList[0].lat
    };
    console.log("起点是", a);
    console.log("终点是", b);
    console.log("其他", other);
    // 规划路线
    const newPoints = planRoute(a, b, other);
    for (let i = 0; i < newPoints.length - 1; i++) {
      let start = newPoints[i];
      let end = newPoints[parseInt(i) + 1];
      console.log(start, end);
      var p1 = new BMapGL.Point(start.lng, start.lat);
      var p2 = new BMapGL.Point(end.lng, end.lat);
      if (category === "驾车") {
        // 驾车规划
        driving = new BMapGL.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        driving.search(p1, p2);
        console.log("驾车规划");
      } else if (category === "公交") {
        // 公交规划
        bus = new BMapGL.TransitRoute(map, { renderOptions: { map: map, autoViewport: true }, });
        bus.search(p1, p2);
        console.log("公交规划");
      } else if (category === "步行") {
        walking = new BMapGL.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        walking.search(p1, p2);
        console.log("步行规划");
      } else if (category === "骑行") {
        riding = new BMapGL.RidingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        riding.search(p1, p2);
        console.log("骑行规划");
      }
      else {
        clearRoutes();
      }
    }
  }
}

const plan = (item) => {
  vehicle(item)
};

const ToSetMapType = (value) => {


  map.setMapStyleV2({
    styleId: style.value.find(item => item.label == value.label).id
  });
  visible.value = false;
  api.post("/project/update", { pid: pid.value, category: value.label }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    setTimeout(() => {
      message.success("修改地图类型成功", res);
    }, 1000);
  })
}

const add = () => {
  visible.value = true;
  navicatVisible.value = false;
  // map.setMapStyleV2({
  //   styleId: style.value.find(item => item.label == "茶田").id
  // });
}

const positionCenter = (item) => {
  const point = new BMapGL.Point(item.lng, item.lat);
  map.centerAndZoom(point, 19);
};

const onSearch = () => {
  options.value = [];
  var local = new BMapGL.LocalSearch(map, {
    onSearchComplete: function (results) {
      results._pois.forEach((item) => {
        options.value.push({
          value: item.point,
          label: item.title,
          address: item.address,
          city: item.city,
          province: item.province,
          tags: item.tags,
        });
      });


    },
    // 阻止百度地图自动渲染搜索结果
    renderOptions: { map: null, autoViewport: false, panel: "r-result" }
  });
  local.search(event.target.value);
};
const onSelect = (value) => {

  const point = new BMapGL.Point(value.lng, value.lat);
  const valuePoint = {
    title: options.value.find(item => item.value.lng === value.lng).label,
    lng: value.lng,
    lat: value.lat,
    label: options.value.find(item => item.value.lng === value.lng).title,
    address: options.value.find(item => item.value.lng === value.lng).address,
    city: options.value.find(item => item.value.lng === value.lng).city,
    province: options.value.find(item => item.value.lng === value.lng).province,
    tags: options.value.find(item => item.value.lng === value.lng).tags,
  };
  map.centerAndZoom(point, 19);
  addPoint(valuePoint)
  points.value.push({
    id: id,
    title: valuePoint.title,
    lng: value.lng,
    lat: value.lat,
    label: valuePoint.title,
    address: valuePoint.address,
    city: valuePoint.city,
    province: valuePoint.province,
    tags: valuePoint.tags,
  })
};

const back = () => {

  localStorage.setItem('rou', "Map");
  localStorage.setItem("openKey", "sub3");
  localStorage.setItem("selectedKeys", "5");
  // const userId = localStorage.getItem('userId');
  router.push({ path: `/StrategyList` });
}


// 添加点标记方法
const addPoint = (value) => {


  const point = new BMapGL.Point(value.lng, value.lat);
  const title = value.title;
  // 创建自定义的覆盖物图标
  var myIcon = new BMapGL.Icon("http://192.168.108.231:8082/redpoint.png", new BMapGL.Size(23, 25), {
    imageSize: new BMapGL.Size(23, 25),
    imageOffset: new BMapGL.Size(0, 0) // 根据需要设置偏移量
  });
  var marker = new BMapGL.Marker(point, { icon: myIcon });
  marker.id = id + 1; // 为marker添加唯一标识
  // 添加覆盖物到地图
  map.addOverlay(marker);
  markers.push(marker); // 将标记添加到数组中
  // 创建自定义覆盖物来显示信息
  var label = new BMapGL.Label(`${title}`, {
    position: point,
    offset: new BMapGL.Size(-title.length * 7, -35) // 偏移量设置为水平居中，-25是向下的偏移量
  });
  label.lid = marker.id; // 自定义属性作为标识
  label.setStyle({
    color: "#000",
    border: "none",
    background: "red",
    cursor: "pointer",
    textAlign: "center",
    height: "20px",
    lineHeight: "20px",
    padding: "2px 5px",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px #666",
  });
  id++;
  // 根据缩放级别动态添加或移除标签
  const zoomEndHandler = () => {
    if (map.getZoom() < 14) { // 当缩放级别小于14时
      if (label.isVisible()) {
        map.removeOverlay(label);
      }
    } else {
      if (label.isVisible()) {
        map.addOverlay(label);
      }
    }
  };

  map.addEventListener('zoomend', zoomEndHandler);
  map.addOverlay(label);
  label.addEventListener('click', function () {
    // 可以在这里添加点击事件，比如打开一个弹窗
    map.centerAndZoom(point, 19);
    map.setTilt(45); // 请注意，倾斜角度通常设置在0到60度之间
    DetailPoint.value = !DetailPoint.value;
    pointDetail.value = value;
    recomend(pointDetail.value.title);
    if (Array.isArray(pointDetail.value.tags) && pointDetail.value.tags.length > 0) {
      for (let i of pointDetail.value.tags) {
        if (i == "起点") { isStartingPoint.value = true }
        else if (i == "终点") { isEndingPoint.value = true }
        else {
          isStartingPoint.value = false;
          isEndingPoint.value = false;
        }
      }
    }

  });
  marker.addEventListener('click', function () {
    // 可以在这里添加点击事件，比如打开一个弹窗
    map.centerAndZoom(point, 19);
    map.setTilt(45); // 请注意，倾斜角度通常设置在0到60度之间
    DetailPoint.value = !DetailPoint.value;
    pointDetail.value = value;

  });
  labels.push(label); // 将标记添加到数组中

};

const deletePoint = (item) => {

  points.value = points.value.filter(point => point !== item);
  const marker = markers.find(m => m.id === item.id);
  const label = labels.find(m => m.lid === item.id);
  map.removeOverlay(marker);
  map.removeOverlay(label);
  // 移除与该标签相关的zoomend事件监听器
  map.removeEventListener('zoomend', label.zoomEndHandler);
  markers = markers.filter(m => m.id !== item.id); // 从数组中移除对应的marker引用
  labels = labels.filter(m => m.lid !== item.id); // 从数组中移除对应的marker引用
};

const update = () => {
  pointDetail.value.tags = JSON.stringify(pointDetail.value.tags);
  api.post("/points/update", pointDetail.value).then(res => {
    message.success("修改成功！", res)
    window.location.reload();
  }).catch(err => {
    message.error("修改失败！", err)
  });
};

const addAllPoints = () => {

  const pointList = ref([]);


  for (let i of points.value) {
    delete (i.id);
    i.pid = pid.value;
    i.tags = JSON.stringify(i.tags);
    api.post("/points/insert", i).then(res => {
      message.success("添加成功！", res)
      pointList.value.push(res.data);
    }).catch(err => {
      message.error("添加失败！", err)
    });
  }
  points.value = [];
  ALLpoints.value = [];

  points.value = pointList.value;


};

const deleteAllPoints = () => {
  for (let i of points.value) {
    deletePoint(i);
  }

};

const searchNearby = (event) => {

  var point = new BMapGL.Point(pointDetail.value.lng, pointDetail.value.lat);
  api.post("/otherPoints/findByCategory", { point_address: pointDetail.value.address, category: searchText.value }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {

    if (res.data.length === 0) {
      message.warning("本地库无关联地址，现进行线上检索");
      other.value = [];
      var local = new BMapGL.LocalSearch(map, {
        onSearchComplete: function (results) {

          results._pois.forEach((item) => {
            other.value.push({
              value: item.point,
              label: item.title,
              address: item.address,
              city: item.city,
              province: item.province,
              tags: item.tags,
            });
          });
          // 渲染到地图

          for (let i of other.value) {

            let value = {};
            if (i.tags) {
              value = {
                lng: i.value.lng,
                lat: i.value.lat,
                title: i.label,
                point_address: pointDetail.value.address,
                address: i.address,
                city: i.city,
                province: i.province,
                tags: JSON.stringify(i.tags),
                category: event
              }
            } else {
              value = {
                lng: i.value.lng,
                lat: i.value.lat,
                title: i.label,
                point_address: pointDetail.value.address,
                address: i.address,
                city: i.city,
                province: i.province,
                tags: null,
                category: event
              }
            }

            // 添加到数据库
            api.post("/otherPoints/insert", { ...value }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => {
              message.success("添加成功！", res)
            }).catch(err => {
              message.error("添加失败！", err)
            });


            addPoint(value);
            points.value.push({
              id: id,
              title: value.title,
              lng: value.lng,
              lat: value.lat,
              address: value.address,
              city: value.city,
              province: value.province,
              tags: JSON.parse(value.tags),
            })
          }
        },
        // 阻止百度地图自动渲染搜索结果
        renderOptions: { map: null, autoViewport: false, panel: "r-result" }
      });
      local.searchNearby(searchText.value, point, 10);
    } else {
      message.success("本地库有关联地址，成功！");
      other.value = res.data.map((item) => {
        item.label = item.title;
        item.tags = JSON.parse(item.tags);
        delete (item.OtherPoints_id);
        delete (item.point_address);
        return item;
      });
      // 渲染到地图
      for (let i of other.value) {
        let value = {};
        value = {
          lng: i.lng,
          lat: i.lat,
          title: i.label,
          address: i.address,
          city: i.city,
          province: i.province,
          tags: i.tags
        }

        addPoint(value);
        points.value.push({
          id: id,
          title: value.title,
          lng: value.lng,
          lat: value.lat,
          address: value.address,
          city: value.city,
          province: value.province,
          tags: value.tags
        })
      }
    }



  }).catch(err => {
    message.error("搜索失败！", err)
  });
};

onMounted(() => {
  // const MapVGL = require('mapvgl/dist/mapvgl.min.js');
  style.value = [
    { id: "ad57d26a4c2ae1ad9886b19395ea2a76", label: "原版" },
    { id: "ca493665f0465225899b802fbf5f5f3e", label: "茶田" },
    { id: "858ac988b7e44629791444dd05828af4", label: "中秋" },
    { id: "b5926b09154d4115bc42d057894bfcc9", label: "眼眸" },
    { id: "3cecd61c81b76b07b9c2d33252aa72d8", label: "物流" },
    { id: "cf220422142f07d460517b8335cd04c2", label: "出行" },
    { id: "1c6d6374945d0bce4a46caf62d778220", label: "绿野仙踪" },
  ]
  const category = ref('');
  if (route.query.category != null) {
    category.value = route.query.category;
  } else {
    category.value = "原版";
  }
  const selectedStyleId = ref('');
  selectedStyleId.value = style.value[1].id; // 默认选择第一个styleId
  if (container.value) {
    map = new BMapGL.Map(container.value, { showControls: true });
    map.centerAndZoom('深圳市', 15);
    map.enableScrollWheelZoom(true);
    map.setHeading(64.5);
    map.setTilt(45); // 请注意，倾斜角度通常设置在0到60度之间
    map.setMapStyleV2({
      styleId: style.value.find(item => item.label === category.value).id
    });
    // map.addEventListener('click', function () {
    //   afterOpenChange();
    // });
    map.addEventListener('tilesloaded', function () {
      // message.success("地图加载完成！");
      if (ALLpoints.value.length === 0) {
        api.post('/points/findByPid', { pid: pid.value }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          for (let i of res.data) {

            // 尝试将 JSON 字符串转换为 JavaScript 数组
            let tagsArray;
            try {

              tagsArray = JSON.parse(i.tags);
              // 检查转换后的结果是否为数组
              if (!Array.isArray(tagsArray)) {
                console.error('需要一个数组，但得到:', tagsArray);
                // 这里可以处理错误，或者给 tagsArray 一个默认值，例如一个空数组
                tagsArray = [];
              }
            } catch (error) {
              console.error('解析JSON失败:', error);
              // 在这里处理 JSON 解析错误，或者给 tagsArray 一个默认值
              tagsArray = [];
            }

            const value = {
              position_id: i.position_id,
              lng: i.lng,
              lat: i.lat,
              title: i.title,
              address: i.address,
              city: i.city,
              province: i.province,
              tags: tagsArray
            }
            addPoint(value);
            ALLpoints.value.push({
              id: id,
              title: value.title,
              lng: value.lng,
              lat: value.lat,
              address: value.address,
              city: value.city,
              province: value.province,
              tags: value.tags
            })
          }
          if (ALLpoints.value.length > 0) {
            let point = new BMapGL.Point(ALLpoints.value[0].lng, ALLpoints.value[0].lat);
            map.centerAndZoom(point, 15);
          }
        })
      }

    });
    // // 初始化MapVgl
    // const mapVgl = new MapVGL.MapGL({
    //   container: container.value,
    //   map: map,
    //   zoom: [11, 19]
    // });
    // console.log(mapVgl);

  }
  isProject.value = true;
  pid.value = route.query.pid;
  projectName.value = route.query.projectName;
  picture.value = route.query.picture;

  // 初始化路径规划对象
  driving = new BMapGL.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
  bus = new BMapGL.TransitRoute(map, { renderOptions: { map: map, autoViewport: true } });
  walking = new BMapGL.WalkingRoute(map, { renderOptions: { map: map, autoViewport: true } });

});
</script>

<style scoped>
.my-marker {
  background-image: url('../../public/greenPoint.png');
  width: 23px;
  height: 25px;
  background-size: cover;
  cursor: pointer;
}

.info-window {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  max-width: 300px;
  margin-bottom: 10px;
}

.info-window h2 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

.info-window p {
  margin: 5px 0;
  color: #666;
}

.info-window .label {
  display: inline-block;
  background-color: #e0f7fa;
  border-radius: 3px;
  padding: 2px 5px;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 12px;
  color: #00796b;
}

.info-window .address {
  font-weight: bold;
}

.ant-modal-content {
  height: 80vh !important;
}

.upload-list-inline :deep(.ant-upload-list-item) {
  display: flex;
  float: left;
  width: 200px;
  margin-right: 8px;
}

.upload-list-inline [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
  float: right;
  display: flex;
}
</style>