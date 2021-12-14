import { api } from '@/request/api.js'
import config from '@/config.js'

export function logout () {
  api.logout().then(res => {
    goLogin()
  })
}

export function goLogin () {
  const masterOrgId = getGlobalParams('masterOrgId')
  localStorage.removeItem(config.localStorageKey)
  // window.location.href = process.env.VUE_APP_LOGIN_HOST + config.abbreviation + '&masterOrgId=' + masterOrgId
}

// 获取后台存在本地的参数
export function getGlobalParams (args) {
  const ciphertext = localStorage.getItem(config.localStorageKey)
  if (!ciphertext) return
  const temData = window.atob(ciphertext)
  const params = JSON.parse(temData)
  const returnData = {}
  if (args instanceof Array) {
    args.forEach(item => {
      returnData[item] = params[item]
    })
    return returnData
  }
  if (typeof args === 'string') {
    return params[args]
  }
  return params
}

// 存储修改全局参数
export function setGlobalParams (key, value) {
  const temData = window.atob(localStorage.getItem(config.localStorageKey))
  const params = JSON.parse(temData)
  params[key] = value
  const ciphertext = window.btoa(JSON.stringify(params))
  localStorage.setItem(config.localStorageKey, ciphertext)
}
// 存储请求所需要的值
export function setCiphertext (res) {
  const params = {}
  config.localKeys.forEach(key => {
    params[key] = res[key]
  })
  window.localStorage.setItem('loginTime', new Date().getTime())
  const ciphertext = window.btoa(JSON.stringify(params))
  localStorage.setItem(config.localStorageKey, ciphertext)
}
