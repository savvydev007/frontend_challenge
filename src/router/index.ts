import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'
import routes from './routes'

Vue.use(Router)
Vue.use(VueMeta)

const router = new Router({
  mode: 'history',
  routes: routes
})

export default router
