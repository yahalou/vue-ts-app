// 为了获取token，需要引入store
import { store } from "@/store";
import type { StateAll } from "@/store";

// 对axios进行二次封装
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
const instance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

//  请求拦截器,在发送请求前做一些处理
instance.interceptors.request.use(
  function (config) {
    config.headers.authorization = (store.state as StateAll).users.token;
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.errmsg === "token error") {
      ElMessage.error("token error");
      store.commit("users/clearToken");
      // 等1s再刷新页面，不然没有弹窗
      setTimeout(() => {
        // 不能用编程式路由，这里token出错，就要还原所有共享状态，重新刷新网页
        window.location.replace("/login");
      });
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

interface Data {
  [index: string]: unknown;
}

interface Http {
  get: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  patch: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config,
    });
  },
  post(url, data, config) {
    return instance.post(url, data, config);
  },
  put(url, data, config) {
    return instance.put(url, data, config);
  },
  patch(url, data, config) {
    return instance.patch(url, data, config);
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config,
    });
  },
};

export default http;
