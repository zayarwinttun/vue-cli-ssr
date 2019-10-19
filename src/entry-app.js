import Vue from 'vue';
import App from './App.vue';
// import store from './store';
import createRouter from './entry-router';

Vue.config.productionTip = false;

export default function () {
  const router = createRouter();

  const app = new Vue({
    router,
    // store,
    render: h => h(App),
  });
  return { app, router };
}
