// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Storage from 'vue-ls'

const storageOptions = {
  namespace: 'address__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}

Vue.use(Storage, storageOptions)
Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
