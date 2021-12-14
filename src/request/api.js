import Vue from 'vue'

import { urls, fileHost } from './urls'

import * as main from './modules/main'
import * as dialogData from './modules/dialogData'

export const api = {
  ...main,
  ...dialogData
}

Vue.prototype.$fileHost = fileHost
Vue.prototype.$api = api
Vue.prototype.$urls = urls
