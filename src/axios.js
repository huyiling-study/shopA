import axios from "axios"
import { toast } from '~/composables/util'
import { getToken } from "~/composables/auth"
import store from '~/store' 

// axios 实例
const service = axios.create({
    baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    // 给header头添加token
    // 在cookie中拿到存储用户的token，如果拿到token值，就添加到header头
    const token = getToken()
    if(token){
        config.headers["token"] = token
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 将 response.data.data 返回，这样就可以省略掉每次获取数据时需要写 response.data.data 这一层
    return response.data.data;
}, function (error) {
    // 请求错误消息提示
    let msg = error.response.data.msg

    // 如果在服务端，移除了用户的token，就要执行退出操作
    if(msg == "非法token，请先登录！"){
        store.dispatch('logout').finally(()=>location.reload())
    }

   toast(msg,"error")

   return Promise.reject(error)
});

export default service