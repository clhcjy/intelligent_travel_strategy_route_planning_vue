<template>
  <div ref="container" style="width: 100%; height: 100vh; position: relative;z-index:1000;">
  </div>
  <a-form-item label="地点关键词" style="position: absolute; top: 10px; left: 10px;width:10%; z-index: 9999;display: inline">
    <a-auto-complete v-model="value" :options="options" style="width: 200px" placeholder="input here" @select="onSelect"
      @search="onSearch" />
    <!-- <a-input ref="mapButton" @input="input()" /> -->
  </a-form-item>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const container = ref(null);

const options = ref([]);

const points = ref([]);
let value = ref('');
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
  console.log("point",point);
  map.centerAndZoom(point, 15);
  // 创建自定义的覆盖物图标
  var myIcon = new BMapGL.Icon("http://192.168.1.47:8082/greenPoint.png", new BMapGL.Size(23, 25), {
    imageSize: new BMapGL.Size(23, 25),
    imageOffset: new BMapGL.Size(0, 0 - 25 * 0) // 根据需要设置偏移量
  });
  var marker = new BMapGL.Marker(point,{icon: myIcon});
   // 添加覆盖物到地图
   map.addOverlay(marker);
  // 添加点击事件
  // marker.addEventListener("click", function(){
  //   alert("地址: " + title + "\n坐标: " + point.lng + ", " + point.lat);
  // });
  points.value.push({
    title:options.value.find(item => item.value.lng === point.lng).label,
    lng:value.lng,
    lat:value.lat
  })
  console.log(points.value);
  
}
let map = null;
let BMapGL = window.BMapGL;
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