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

  <div
    style="position: absolute; bottom: 10px; right: 33%; width: 33%; height: 50px; z-index: 9999; display: flex;align-items: center;justify-content: space-around; background-color: rgba(255, 255, 255, 0.8);border: #000000;border-radius: 10%;">
    <a-popover v-model:open="visible" trigger="click">
      <template #content>
        <div style="display: flex; justify-content: space-around; background-color: rgba(255, 255, 255, 0.8);">
          <a-card hoverable style="width: 10%;" v-for="item in MapPicture" :key="item.label"
            @click="ToSetMapType(item)">
            <template #cover>
              <img alt="example" :src="item.src" style="width: 100%;height: 100%;" />
            </template>
            <a-card-meta :title="item.label">
            </a-card-meta>
          </a-card>
        </div>
      </template>
      <HighlightTwoTone @click="add" />
    </a-popover>
    <RollbackOutlined @click="back" />
    <HighlightTwoTone @click="add" />
    <HighlightTwoTone @click="add" />
    <HighlightTwoTone @click="add" />
  </div>
  <div
    style="position: absolute; top: 30vh; left: 10px; width: 20%; height: 50vh; z-index: 9999; display: flex;align-items: center;justify-content: space-around; background-color: transparent;border: #000000;"
    v-show="DetailPoint">
    <a-drawer v-model:open="DetailPoint" class="custom-class" root-class-name="root-class-name"
      :root-style="{ color: 'blue' }" style="color: red;" :title="pointDetail.title" :get-container="false"
      :mask="false" placement="left" @after-open-change="afterOpenChange">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { HighlightTwoTone,RollbackOutlined } from '@ant-design/icons-vue';
import api from '@/api/request.js';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import {useRouter} from 'vue-router';

const container = ref(null);

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

const pointDetail = ref({});

const options = ref([]);

const points = ref([]);

const ALLpoints = ref([]);

const picture = ref(null);

const projectName = ref('');

const pid = ref('');

const isProject = ref(false);

const style = ref([]);

const visible = ref(false);

const DetailPoint = ref(false);
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

const afterOpenChange = () => {
  console.log('open', event);
};

const ToSetMapType = (value) => {
  console.log(value);

  map.setMapStyleV2({
    styleId: style.value.find(item => item.label == value.label).id
  });
  visible.value = false;
}

const add = () => {
  visible.value = true;
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
          label: item.title
        });
      });


    },
    // 阻止百度地图自动渲染搜索结果
    renderOptions: { map: null, autoViewport: false, panel: "r-result" }
  });
  local.search(event.target.value);
};
const onSelect = (value) => {
  console.log("options", options);

  const point = new BMapGL.Point(value.lng, value.lat);
  const valuePoint = {
    title: options.value.find(item => item.value.lng === value.lng).label,
    lng: value.lng,
    lat: value.lat
  };
  map.centerAndZoom(point, 19);
  addPoint(valuePoint)
  points.value.push({
    id: id,
    title: valuePoint.title,
    lng: value.lng,
    lat: value.lat
  })
};

const back = () => {
  console.log("111");
  localStorage.setItem('rou', "Map");
  localStorage.setItem("openKey","sub2");
  localStorage.setItem("selectedKeys","5");
  // const userId = localStorage.getItem('userId');
  router.push({ path: `/StrategyList` });
}


// 添加点标记方法
const addPoint = (value) => {


  const point = new BMapGL.Point(value.lng, value.lat);
  const title = value.title;
  // 创建自定义的覆盖物图标
  var myIcon = new BMapGL.Icon("http://192.168.1.47:8082/redpoint.png", new BMapGL.Size(23, 25), {
    imageSize: new BMapGL.Size(23, 25),
    imageOffset: new BMapGL.Size(0, 0) // 根据需要设置偏移量
  });
  var marker = new BMapGL.Marker(point, { icon: myIcon });
  marker.id = id + 1; // 为marker添加唯一标识
  id++;
  // 添加覆盖物到地图
  map.addOverlay(marker);
  markers.push(marker); // 将标记添加到数组中
  // 创建自定义覆盖物来显示信息
  var label = new BMapGL.Label(`${title}`, {
    position: point,
    offset: new BMapGL.Size(-title.length * 7, -35) // 偏移量设置为水平居中，-25是向下的偏移量
  });
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
    DetailPoint.value = true;
    pointDetail.value = value;
  });

};

const deletePoint = (item) => {

  points.value = points.value.filter(point => point !== item);
  const marker = markers.find(m => m.id === item.id);

  map.removeOverlay(marker);
  markers = markers.filter(m => m.id !== item.id); // 从数组中移除对应的marker引用
};

const addAllPoints = () => {

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
  ALLpoints.value = [];

  points.value = pointList.value;


};

onMounted(() => {
  style.value = [
    { id: "ad57d26a4c2ae1ad9886b19395ea2a76", label: "原版" },
    { id: "ca493665f0465225899b802fbf5f5f3e", label: "茶田" },
    { id: "858ac988b7e44629791444dd05828af4", label: "中秋" },
    { id: "b5926b09154d4115bc42d057894bfcc9", label: "眼眸" },
    { id: "3cecd61c81b76b07b9c2d33252aa72d8", label: "物流" },
    { id: "cf220422142f07d460517b8335cd04c2", label: "出行" },
    { id: "1c6d6374945d0bce4a46caf62d778220", label: "绿野仙踪" },
  ]
  const selectedStyleId = ref('');
  selectedStyleId.value = style.value[0].id; // 默认选择第一个styleId
  if (container.value) {
    map = new BMapGL.Map(container.value, { showControls: true });
    map.centerAndZoom('深圳市', 15);
    map.enableScrollWheelZoom(true);
    map.setHeading(64.5);
    map.setTilt(45); // 请注意，倾斜角度通常设置在0到60度之间
    map.setMapStyleV2({
      styleId: style.value.find(item => item.label == "原版").id
    });

    map.addEventListener('tilesloaded', function () {
      // alert('地图加载完成！');
      if (ALLpoints.value.length === 0) {
        api.post('/points/findByPid', { pid: pid.value }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          for (let i of res.data) {
            const value = {
              lng: i.lng,
              lat: i.lat,
              title: i.title
            }
            addPoint(value);
            ALLpoints.value.push({
              id: id,
              title: value.title,
              lng: value.lng,
              lat: value.lat
            })
          }
        })
      }

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