import { createApp } from "vue";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router";

const app = createApp(App).use(Antd).use(router);

// const cors = require('cors');

// // 正确配置
// app.use(cors({
//   origin: 'http://192.168.1.47:8080'
// }));

app.mount("#app");
