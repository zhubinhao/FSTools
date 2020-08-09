import Vue from 'vue'
import App from './App.vue'
import store from './store' 
import '@/static/font/iconfont.scss'

import {i18n} from '@/utils/i18n'

Vue.config.productionTip = false
const app = new Vue({
  store,
  i18n,
  ...App
})
app.$mount()

// new App({store,i18n}).$mount()