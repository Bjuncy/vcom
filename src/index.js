import Vue from 'vue'
import notice from './components/notice/index.js'
import message from './components/message/index.js'
Vue.prototype.$notice = notice
Vue.prototype.$message = message
Vue.use(notice)
Vue.use(message)
