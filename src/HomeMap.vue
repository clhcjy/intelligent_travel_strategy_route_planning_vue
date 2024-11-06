<template>
  <a-layout style="min-height: calc(100vh - 64px)">
    <a-layout-header class="header">
      <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="0" disabled>
          <div class="logo">
            <img src="./assets/logo.png" width="32" height="32" style="vertical-align: middle;margin-right: 8px;">
            <span>
              智能旅游攻略路线规划系统
            </span>
          </div>
        </a-menu-item>
        <a-menu-item key="1" @click="toPage">首页</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
      <!-- <div style="float: right; padding: 0 24px;text-align: center;font-size: large;">{{ user.username }}</div> -->
    </a-layout-header>
    <a-layout-content style="padding: 0 50px;">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
        <a-breadcrumb-item></a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" style="height: 100%">
            <!-- <div class = "avatar"> -->
            <img :src="user.avatarUrl" id="avatar" alt="用户头像">
            <div style="display: flex;justify-content: center;padding:30px 30px;font-size: 30px;">{{ user.username }}
            </div>
            <!-- </div>      -->
            <a-sub-menu key="sub2">
              <template #title>
                <span>
                  <user-outlined />
                  用户中心
                </span>
              </template>
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
              <a-menu-item key="3">option3</a-menu-item>
              <a-menu-item key="4">option4</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <laptop-outlined />
                  开始出行
                </span>
              </template>
              <a-menu-item key="5" @click="toMap">地图模式</a-menu-item>
              <a-menu-item key="6">数据模式</a-menu-item>
              <!-- <a-menu-item key="7">option7</a-menu-item> -->
              <a-menu-item key="8">AI模式</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <template #title>
                <span>
                  <notification-outlined />
                  本站数据
                </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>

        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '780px', }">
            <div v-if = "rou == null" id="allmap"/>
          <div v-else :style="{ padding: '24px', background: '#fff' }">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/api/request.js';
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  data() {
    return {
      rou:null,
      user: {id:'',username: '', avatarUrl: '' }
    }
  },
  methods:{
    toPage() {
      this.rou = null
      console.log(this.user);
      
      this.$router.push({path:`/HomeMap/${this.user.id}` });
    },
    toMap(){
      this.rou = 'Map'
      this.$router.push({name:`StrategyMap` });
    },
  },
  setup() {
    onMounted(() => {
      loadMapScript(); // 加载百度地图资源
    });
    // 初始化地图
    const init = () => {
      let Bmap = window.BMap; // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
      var map = new Bmap.Map("allmap"); // allmap必须和dom上的id一直
      map.centerAndZoom(
        new Bmap.Point(114.0596, 22.5429),
        11
      ); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("深圳");
      map.enableScrollWheelZoom(true);
      map.setMapStyleV2({
        styleId: '858ac988b7e44629791444dd05828af4'
      });
    };
    const loadMapScript = () => {
      // 此处在所需页面引入资源就是，不用再public/index.html中引入
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.className = "loadmap"; // 给script一个类名
      script.src =
        "https://api.map.baidu.com/getscript?v=3.0&ak=CmqN6RHNG91vSKhL9APJQhhrSgTSghgl";
      // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
      script.onload = () => {
        // 使用script.onload，待资源加载完成，再初始化地图
        init();
      };
      let loadmap = document.getElementsByClassName("loadmap");
      if (loadmap) {
        // 每次append script之前判断一下，避免重复添加script资源标签
        for (var i = 0; i < loadmap.length; i++) {
          document.body.removeChild(loadmap[i]);
        }
      }
      document.body.appendChild(script);

    };
    return {
      selectedKeys1: ref(['1']),
      selectedKeys2: ref(['1']),
      openKeys: ref(['sub2']),
    };
  },
  mounted() {
    const userId = this.$route.params.id
    api.get(`/findByIdRest/${userId}`).then(res => {
      this.user = res.data;
      console.log("this.user", this.user);

    }).catch(err => {
      console.log(err);
    });
    // console.log("this.user",this.user);

  }
});
</script>
<style>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

#allmap {
  /* // 注意给dom宽高，不然地图不出来 */
  width: 100%;
  height: 100%;
  margin: auto;
}

#avatar {
  width: 100px;
  /* 头像宽度 */
  height: 100px;
  /* 头像高度 */
  border-radius: 50%;
  /* 圆形头像 */
  overflow: hidden;
  /* 隐藏溢出部分 */
  position: relative;
  /* 相对定位 */
  margin: auto;
  /* 水平居中 */
  display: flex;
  /* 使用flex布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  object-fit: cover;
  /* 裁剪图片以填充容器 */
  border-radius: 50%;
  /* 圆形图片 */
}
</style>
