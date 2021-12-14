import Vue from 'vue'
import bus from '@u/bus.js'
import { isEmpty, deleteObjectEmptyAttr, getAttrFromArray, numSeparate } from './tool'

Vue.use(bus)
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$getAttrFromArray = getAttrFromArray
Vue.prototype.$deleteObjectEmptyAttr = deleteObjectEmptyAttr
Vue.prototype.$numSeparate = numSeparate
