import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import store from "./store"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();
(window as any).message = messageApi

createApp(App)
    .use(router)
    .use(Antd)
    .provide("contextHolder", contextHolder)
    .mount('#app')
