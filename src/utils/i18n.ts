import Vue from 'vue'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export const i18n = new VueI18n({ 
   locale: 'zh', // 定义默认语言为中文 
   messages: {   
      'zh': require('@/static/languages/zh.json'),   
      'en': require('@/static/languages/en.json') 
    }
  });
