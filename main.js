import App from './App'
import api from 'api'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.filter('formatCount', (val) => {
	if (val >= 10000 && val <= 100000000) {
		val /= 1000
		return val.toFixed(1) + '万'
	}else if ( val > 100000000) {
		val /= 100000000
		return val.toFixed(1) + '亿'
	} else {
		return val
	}
})
Vue.filter('formatTime', (val) => {
	const date = new Date(val)
	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
})
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif