/**
 * 异步请求
 */
import axios from "axios";
import { Message } from "ant-design-vue";
import store from "@/store";
import router from "@/router";

// 请求拦截器
const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER_PATH,
  method: "post"
  // timeout: 8000,
});

request.interceptors.request.use(config => {
  let token = localStorage.getItem("token");
  if (token) {
    // 避免发送 null
    config.headers.token = token;
  }
  return config;
});

// 响应拦截
request.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    // console.log('请求成功',response);
    if (/登录无效/.test(res.data.msg)) {
      Message.error(res.data.msg + "请重新登录！");
      store.commit("delUserInfo");
      router.push("/login");
      return Promise.reject(res);
    }
    return res;
  },
  function(error) {
    // 对响应错误做点什么
    console.log("请求响应失败");
    console.dir(error);

    if (error.message === "Network Error") {
      Message.error("连接服务器失败！");
      return Promise.reject(error); // 没有返回
    }

    if (/timeout/.test(error.message)) {
      Message.error("服务器响应超时！");
      return Promise.reject(error); // 没有返回
    }

    if (error.response.status === 401) {
      Message.error("请先登录！");
      store.commit("delUserInfo");
      router.push("/login");
    }

    if (/^5/.test(error.response.status)) {
      Message.error("服务器错误！");
    }

    return Promise.resolve({
      status: error.response.status,
      data: {
        response: error.response,
        msg: error.response.data.msg,
        success: false
      }
    });
  }
);


/**
 * 文件下载
 * @param {Object} data 载荷
 * @param {Object} params 查询字符串
 * @returns {Promise}
 */
export const fileDownload = (data, fileName) => {
  let res = await request({
    url: "/file/download",
    data,
    responseType: "blob"
  });

  let blob = new Blob([res.data], { type: res.headers["content-type"] });
  let downloadElement = document.createElement("a");
  // 创建下载的链接
  let href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载后文件名
  downloadElement.download = fileName || data.url.split("/").pop();
  // 触发点击下载
  downloadElement.click();
  // 释放掉blob对象
  window.URL.revokeObjectURL(href);

  return res
};
