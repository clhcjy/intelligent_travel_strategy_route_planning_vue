import { createApp } from "vue";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App).use(Antd).use(router).use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'hMm69ufNL4oYxmT3kK6vQdQeEtuCBYsj',
    // v:'2.0',  // 默认使用3.0
    // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
  });

app.mount("#app");
