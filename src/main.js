import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/filter.js'
import '@/components/index.js'
import '@/plugins'
import '@u/index'
import '@/request/api.js'
import 'echarts-liquidfill'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
