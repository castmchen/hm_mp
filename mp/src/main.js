import Vue from 'vue'
import App from './App'
import store from './store/index'
var JMessage = require('../static/jm/jmessage-wxapplet-sdk-1.4.0.min.js')

global.JIM = new JMessage({ debug: true })
wx.cloud.init({
    traceUser: true
})
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue({ App })
app.$mount()
