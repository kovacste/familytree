import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import { routes } from "./routes/routes";
import { store } from "./store/store";

Vue.use(VueRouter);
const router = new VueRouter({ routes, mode: 'history' });

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.user !== null || localStorage.getItem('username');

  console.log(loggedIn)

  if(loggedIn && (to.name === 'login' || to.name === 'registration')) {
    next('/home');
  } else if(!loggedIn && to.name !== 'login' && to.name !== 'registration') {
    next('/login');
  } else {
    next();
  }

});

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
