import Vue from 'vue'
import Router from 'vue-router'
import Addresses from '@/components/Addresses'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Addresses',
      component: Addresses
    }
  ]
})
