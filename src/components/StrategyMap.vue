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
  <div
    style="position: absolute; top: 30vh; left: 10px; width: 20%; height: 50vh; z-index: 9999; display: flex;align-items: center;justify-content: space-around; background-color: transparent;border: #000000;"
    v-show="DetailPoint">
    <a-drawer v-model:open="DetailPoint" class="custom-class" root-class-name="root-class-name"
      :root-style="{ color: 'blue' }" style="color: red;" :title="pointDetail.title" :get-container="false"
      :mask="false" placement="left">
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
    </a-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { HighlightTwoTone, RollbackOutlined, UpOutlined, DownOutlined } from '@ant-design/icons-vue';
import api from '@/api/request.js';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

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

const searchText = ref('');

const pointDetail = ref({});

const isExpand = ref(true);

const options = ref([]);

const other = ref([]);

const points = ref([]);

const ALLpoints = ref([]);

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

const navicat = ref([
  { vehicle: '驾车', icon: "http://192.168.1.47:8082/car.png" },
  { vehicle: '公交', icon: 'http://192.168.1.47:8082/Bus.png' },
  { vehicle: '骑行', icon: 'http://192.168.1.47:8082/RIDE.png' },
  { vehicle: '步行', icon: 'http://192.168.1.47:8082/walk.png' }
])
let id = 0;
let value = ref('');
let markers = []; // 用于存储所有标记的数组
let labels = [];
let map = null;
let BMapGL = window.BMapGL;

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

const plan = (item) => {
  if (item === "驾车") {
    let a = StartingPoint();
    let b = EndingPoint();
    if (a.length === 0) { message.error("请选择起点"); return }
    else if (b.length === 0) { message.error("请选择终点"); return }
    else {
      const other = ALLpoints.value.filter((item) => item.id !== a[0].id && item.id !== b[0].id);
      console.log("起点是",a);
      console.log("终点是",b);
      console.log("其他",other);
      // 规划路线

    }
  } else if (item === "公交") {
    let a = StartingPoint();
    let b = EndingPoint();
    if (a.length === 0) { message.error("请选择起点"); return }
    else if (b.length === 0) { message.error("请选择终点"); return }
    else {
      console.log(a, b);

    }
  } else if (item === "骑行") {
    let a = StartingPoint();
    let b = EndingPoint();
    if (a.length === 0) { message.error("请选择起点"); return }
    else if (b.length === 0) { message.error("请选择终点"); return }
    else {
      console.log(a, b);

    }
  } else if (item === "步行") {
    let a = StartingPoint();
    let b = EndingPoint();
    if (a.length === 0) { message.error("请选择起点"); return }
    else if (b.length === 0) { message.error("请选择终点"); return }
    else {
      console.log(a, b);

    }
  }
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
  var myIcon = new BMapGL.Icon("http://192.168.1.47:8082/redpoint.png", new BMapGL.Size(23, 25), {
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
    console.log(pointDetail.value);

    if (Array.isArray(pointDetail.value.tags) && pointDetail.value.tags.length > 0) {
      for (let i of pointDetail.value.tags) {
        console.log(i);
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
    console.log(pointDetail.value);

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
  console.log("event == ", event);

  var point = new BMapGL.Point(pointDetail.value.lng, pointDetail.value.lat);
  api.post("/otherPoints/findByCategory", { point_address: pointDetail.value.address, category: searchText.value }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    console.log("res == ", res.data);

    if (res.data.length === 0) {
      message.warning("本地库无关联地址，现进行线上检索");
      other.value = [];
      var local = new BMapGL.LocalSearch(map, {
        onSearchComplete: function (results) {
          console.log("results == ", results);

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
          console.log("other == ", other);
          // 渲染到地图

          for (let i of other.value) {
            console.log("i == ", i);

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
        console.log("value", value);

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
            console.log(point);
            map.centerAndZoom(point, 15);
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

.info-window {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  max-width: 300px;
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
</style>