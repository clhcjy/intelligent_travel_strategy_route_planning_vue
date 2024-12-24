<template>
  <a-layout style="min-height: calc(100vh - 64px)">
    <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
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
        <a-menu-item key="4">light</a-menu-item>
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
        <a-layout-sider width="200"
          style="position: fixed; top: 64px; left: 0; background: #fff; height: calc(100vh - 64px);">
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
              <a-menu-item key="1" @click="toComment">个人资料</a-menu-item>
              <a-menu-item key="2">设置</a-menu-item>
              <a-menu-item key="3">帮助中心</a-menu-item>
              <a-menu-item key="4">世界你好</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span>
                  <laptop-outlined />
                  开始出行
                </span>
              </template>
              <a-menu-item key="5" @click="toMap">地图模式</a-menu-item>
              <a-menu-item key="6" @click="toData">数据模式</a-menu-item>
              <!-- <a-menu-item key="7">option7</a-menu-item> -->
              <a-menu-item key="8" @click="toAi">AI模式</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <template #title>
                <span>
                  <notification-outlined />
                  本站数据
                </span>
              </template>
              <a-menu-item key="9">网站用户活跃度统计</a-menu-item>
              <a-menu-item key="10">打赏支持</a-menu-item>
              <a-menu-item key="11">留言板</a-menu-item>
              <!-- <a-menu-item key="12">option12</a-menu-item> -->
            </a-sub-menu>
          </a-menu>

        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '780px', marginLeft: '152px', marginTop: '16px' }">
          <div v-if="rou == null" id="allmap" />
          <div v-else :style="{ padding: '24px', background: '#fff' }">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      关于我@clhcjy email1754598483@qq.com
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import api from '@/api/request.js';
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  data() {
    return {
      rou: null,
      user: { id: '', username: '', avatarUrl: '' },
      menu: 'HomeMap', // 默认显示的组件
    }
  },
  methods: {
    toData() {
      this.rou = 'menu'
      this.$router.push({ name: `StrategyData` });
    },
    toAi() {
      this.rou = 'menu'
      this.$router.push({ name: `StrategyAi` });
    },
    toPage() {
      this.rou = null
      console.log(this.user);

      this.$router.push({ path: `/HomeMap/${this.user.id}` });
    },
    toComment(){
      this.rou = "comment"
      this.$router.push({ name: `StrategyComment` }); 
    },
    toMap() {
      this.rou = 'Map'
      this.$router.push({ name: `StrategyList` });
    },
    initMap() {
      let Bmap = window.BMap; // 注意要带window，不然会报错
      var map = new Bmap.Map("allmap"); // allmap必须和dom上的id一致
      map.centerAndZoom(
        new Bmap.Point(114.0596, 22.5429),
        11
      ); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);
      map.setMapStyleV2({
        styleId: 'ca493665f0465225899b802fbf5f5f3e'
      });
    },
    async loadMapScript() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.className = "loadmap";
      script.src =
        "https://api.map.baidu.com/getscript?v=3.0&ak=CmqN6RHNG91vSKhL9APJQhhrSgTSghgl";
      script.onload = () => {
        // 使用script.onload，待资源加载完成，再初始化地图
        this.initMap();
      };
      let loadmap = document.getElementsByClassName("loadmap");
      if (loadmap) {
        // 每次append script之前判断一下，避免重复添加script资源标签
        for (var i = 0; i < loadmap.length; i++) {
          document.body.removeChild(loadmap[i]);
        }
      }
      document.body.appendChild(script);

    },
  },
  setup() {
    return {
      selectedKeys1: ref([]),
      selectedKeys2: ref([]),
      openKeys: ref([]),
    };
  },
  mounted() {
    console.log("mounted");
    const rou = localStorage.getItem('rou');
    this.rou = rou;
    console.log("rou",rou);
    
    if (this.rou === null) {
      this.loadMapScript();
    }

    localStorage.removeItem("rou");
    
    const userId = localStorage.getItem('userId');
    api.get(`/findByIdRest/${userId}`).then(res => {
      this.user = res.data;
      console.log("this.user", this.user);

    }).catch(err => {
      console.log(err);
    });

    // this.loadMapScript(); // 加载百度地图资源
  },
  created() {
    this.rou = null;
    //this.loadMapScript();
  },
  watch: {
    // 监听$route对象的变化
    '$route': function (newRoute) {
      console.log("新路由", newRoute);

      // 如果路由发生变化，重新加载地图
      if (newRoute.path === `/HomeMap/${localStorage.getItem('userId')}`) {
        this.rou = null;

        this.loadMapScript();
      }
      if (newRoute.path === `StrategyList`) {
        this.toMap();
        console.log(1111111111);

      }
    }
  },

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

.ant-menu {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
</style>
