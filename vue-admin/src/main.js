import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionAPI from '@vue/composition-api'

Vue.component("svg-icon", {
  template: "<h1>5465464</h1>"
});

Vue.component('component-a', { /* ... */ })

Vue.use(VueCompositionAPI)
Vue.use(ElementUI, {
  size: 'small',
});

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");