import Vue from 'vue'
import Axios from 'axios'

//基本配置信息
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//拦截器
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // console.log('请求拦截器')
  // 在发送请求之前做些什么
  // console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器 拦截数据
Axios.interceptors.response.use(function (response) {
  // console.log("响应拦截器")
  // console.log(response)
  // console.log(response.data)
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default Axios