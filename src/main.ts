import Vue from 'vue'
import App from './App.vue'
import store from './store' 
import '@/static/font/iconfont.scss'

import {i18n} from '@/utils/i18n'

Vue.config.productionTip = false


new App({store,i18n}).$mount()