<template>
  <div ref="container" style="width: 100%; height: 100vh; position: relative;z-index:1000;">
  </div>
  <a-form-item label="地点关键词" style="position: absolute; top: 10px; left: 10px;width:10%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);">
    <a-auto-complete v-model="value" :options="options" style="width: 180px" placeholder="input here" @select="onSelect"
      @search="onSearch" />
    <!-- <a-input ref="mapButton" @input="input()" /> -->
  </a-form-item>
  <div style="position: absolute; top: 10px; right: 10px;width:30%; z-index: 9999;display: inline;background-color: rgba(255, 255, 255, 0.8);border: #000000;" v-if="points.length > 0">
    <a-list item-layout="horizontal" :data-source="points" style="border: #000000">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.lng +'——' + item.lat">
            <template #title>
              <span>{{ item.title }}</span>
              <a-button type="link" style="float: right;" @click="deletePoint(item)">删除</a-button>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <a-divider style="height: 1px; background-color: #000000" />
    <a-button type="link" style="width:30%;float: right;text-align: center;margin-bottom: 10px;" @click="addAllPoints">全部添加</a-button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const container = ref(null);

const options = ref([]);

const points = ref([]);

let id = 0;
let value = ref('');
let markers = []; // 用于存储所有标记的数组
let map = null;
let BMapGL = window.BMapGL;

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
  marker.id = id+1; // 为marker添加唯一标识
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
    id:marker.id,
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