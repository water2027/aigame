import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import router from "./router";

import axios from "axios";

import App from "./App.vue";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { s3Layer } from 'vue3-layer';
import Antd from 'ant-design-vue';

import 'vue3-layer/dist/s3Layer.css';
import 'ant-design-vue/dist/reset.css';
import "./style.css";

import { useUserStore } from "./stores/user";

// 初始化 Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 创建 Vue 应用实例
const app = createApp(App);

app.component('s3-layer', s3Layer);
// 全局配置 Axios
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["access_token"] = localStorage.getItem("token");

// 配置 Axios 拦截器
axios.interceptors.request.use(
  (config: { headers: { [x: string]: string } }) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["access_token"] = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器（可选，根据需求）
axios.interceptors.response.use(
  (response: any) => response,
  (error: { response: { status: number } }) => {
    // 可以在这里处理通用的错误，如 401 未授权等
    if (error.response && error.response.status === 401) {
      // 清理用户状态，跳转到登录页
      const userStore = useUserStore();
      userStore.setUser(null);
      router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

// 将 axios 实例绑定到 Vue 全局属性
app.config.globalProperties.$axios = axios;

// 安装 Pinia 和路由
app.use(pinia);
app.use(router);
//安装antd
app.use(Antd);
// 挂载应用
app.mount("#app");
