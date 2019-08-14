import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// allows changes to the response data to be made before
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// Add a request interceptor
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 判断用户是否登录，如果用户登录，设置请求头中的Authorization
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 响应拦截器
request.interceptors.response.use(function (response) {
  // console.log(response)
  // 更方便的让外面获取到响应中的数据
  // Do something with response data
  return response.data.data || response.data
}, async function (error) {
  // console.log(error)
  // console.dir(error)
  // 判断是否是401 如果是401（没有登录或者登录过期）
  if (error.response.status === 401) {
    // 判断是否登录，如果没有登录，跳转到登录页面
    if (!store.state.user) {
      router.push({
        name: 'login'
      })
      return
    }
    try {
      // 如果是登录过期，刷新token
      const refreshToken = store.state.user.refresh_token
      const res = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      })

      // 重置 vuex中user的值
      store.commit('setUser', {
        token: res.data.data.token,
        refresh_token: refreshToken
      })
      // 继续上一次出问题的请求
      return request(error.config)
    } catch (err) {
      router.push({
        name: 'login'
      })
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

export default request
