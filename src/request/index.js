import axios from 'axios'
import { getGlobalParams } from '@u/login'

const service = axios.create({
  withCredentials: true,
  timeout: 10000
})

// 获取本地请求头需要的参数
const headersKeys = {
  authToken: 'access_token',
  masterOrgId: 'masterOrgId',
  moduleCode: 'moduleCode',
  appCode: 'appCode'
}

service.interceptors.request.use(
  config => {
    // 代理匹配，sso 是认证中心代理，api 是正常请求代理
    if (config.url.search('/sso/') === -1) {
      config.url = '/cb-api' + config.url
    }
    for (const key in headersKeys) {
      config.headers[key] = getGlobalParams(headersKeys[key]) || ''
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 报错锁
let errorLock = false

service.interceptors.response.use(
  response => {
    errorLock = false
    const res = response.data
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') return response
    if (res.code === 10000) {
      return res
    } else {
      return {
        isError: true,
        message: res.message,
        subCode: res.subCode
      }
    }
  },
  error => {
    if (errorLock) {
      return
    }
    if (error.response && error.response.data) {
      if (error.response.data.subCode === 'TOKEN_EXPIRED' || error.response.data.subCode === 'TOKEN_NULL') {
        // goLogin()
        errorLock = true
      }
    } else {
      errorLock = true
    }
  }
)

export default service
