// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// reverse proxy front-end request to http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://68.183.135.61:8080/api'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#vue',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
