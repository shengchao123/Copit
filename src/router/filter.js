import router from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import config from '@/config.js'
// import { api } from '@/request/api.js'
// import { getGlobalParams, goLogin, setCiphertext } from '@u/login'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // 获取请求参数
  const ciphertext = to.query.ciphertext
  if (ciphertext) {
    localStorage.setItem(config.localStorageKey, ciphertext)
  }
  next()
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // if (to.query.auth_code) {
  //   const formData = new FormData()
  //   formData.append('code', to.query.auth_code)
  //   api.getToken(formData).then(res => {
  //     if (res.subCode === 'CODE_INVALID') {
  //       goLogin()
  //       return
  //     }
  //     setCiphertext(res.content)
  //     next('/')
  //   })
  // } else {
  //   if (getGlobalParams('access_token')) {
  //     next()
  //   } else {
  //     goLogin()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
