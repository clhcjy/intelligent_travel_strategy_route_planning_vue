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
      <img :src="picture"
        style="width:90%;height:90%;opacity: 0.5;margin-left: 5%;object-fit: cover;border-radius: 10%;">
    </div>
    <div style="width: 50%;height: 100%;display:flex;justify-content: center;align-items: center;text-align: center">
      {{ projectName }}
    </div>
  </div>
  <div
    style="position: absolute; top: 20vh; right: 10px;width:30%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);border: #000000;"
    v-if="points.length > 0 && isProject == true">
    <a-divider style="height: 1px; background-color: #000000" />
    <a-list item-layout="horizontal" :data-source="points" style="border: #000000">
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
  </div>


</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '@/api/request.js';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

const container = ref(null);

const route = useRoute();

const options = ref([]);

const points = ref([]);

const picture = ref(null);

const projectName = ref('');

const pid = ref('');

const isProject = ref(false);

let id = 0;
let value = ref('');
let markers = []; // 用于存储所有标记的数组
let map = null;
let BMapGL = window.BMapGL;

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
    console.log(res.data.id);
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

const positionCenter = (item) => {
  const point = new BMapGL.Point(item.lng, item.lat);
  map.centerAndZoom(point, 19);
};

const onSearch = () => {
  options.value = [];
  var local = new BMapGL.LocalSearch(map, {
    onSearchComplete: function (results) {
      console.log("results", results._pois);
      results._pois.forEach((item) => {
        options.value.push({
          value: item.point,
          label: item.title
        });
      });
      console.log("options == ", options);

    },
    // 阻止百度地图自动渲染搜索结果
    renderOptions: { map: null, autoViewport: false, panel: "r-result" }
  });
  local.search(event.target.value);
};
const onSelect = (value) => {
  console.log(value);
  let point = new BMapGL.Point(value.lng, value.lat);
  console.log("point", point);
  map.centerAndZoom(point, 19);
  // 创建自定义的覆盖物图标
  var myIcon = new BMapGL.Icon("http://192.168.1.47:8082/greenPoint.png", new BMapGL.Size(23, 25), {
    imageSize: new BMapGL.Size(23, 25),
    imageOffset: new BMapGL.Size(0, 0 - 25 * 0) // 根据需要设置偏移量
  });
  var marker = new BMapGL.Marker(point, { icon: myIcon });
  marker.id = id + 1; // 为marker添加唯一标识
  id++;
  // 添加覆盖物到地图
  map.addOverlay(marker);
  markers.push(marker); // 将标记添加到数组中
  const title = options.value.find(item => item.value.lng === point.lng).label;
  // 创建信息窗口
  var opts = {
    width: 200,
    height: 70,
    title: options.value.find(item => item.value.lng === point.lng).label,
  };
  var infoWindow = new BMapGL.InfoWindow(`地址：${title}`, opts);
  // 点标记添加点击事件
  marker.addEventListener('click', function () {
    map.openInfoWindow(infoWindow, point); // 开启信息窗口
  });

  map.openInfoWindow(infoWindow, point); // 开启信息窗口
  points.value.push({
    id: marker.id,
    title: options.value.find(item => item.value.lng === point.lng).label,
    lng: value.lng,
    lat: value.lat
  })
  console.log(points.value);

};

const deletePoint = (item) => {
  console.log("item", item);
  points.value = points.value.filter(point => point !== item);
  const marker = markers.find(m => m.id === item.id);

  map.removeOverlay(marker);
  markers = markers.filter(m => m.id !== item.id); // 从数组中移除对应的marker引用
};

const addAllPoints = () => {
  console.log(points.value);
  const pointList = ref([]);
  for (let i of points.value) {
    delete (i.id);
    i.pid = pid.value;
    api.post("/points/insert", i).then(res => {
      message.success("添加成功！", res)
      pointList.value.push(res.data);
    }).catch(err => {
      message.error("添加失败！", err)
    });
  }
  points.value = [];
  console.log("pointList", pointList);
  points.value = pointList.value;
  // for(let item of pointList.value){
  //   points.value.push({
  //     id:item.position_id,
  //     title:item.title,
  //     lng:item.lng,
  //     lat:item.lat
  //   })
  // }
  console.log("points",points);
  
};

onMounted(() => {
  if (container.value) {
    map = new BMapGL.Map(container.value, { showControls: true });
    map.centerAndZoom('深圳市', 15);
    map.enableScrollWheelZoom(true);
    map.setHeading(64.5);
    map.setTilt(45); // 请注意，倾斜角度通常设置在0到60度之间
    map.setMapStyleV2({
      styleId: '858ac988b7e44629791444dd05828af4'
    });
  }
  isProject.value = true;
  pid.value = route.query.pid;
  projectName.value = route.query.projectName;
  picture.value = route.query.picture;
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
</style>