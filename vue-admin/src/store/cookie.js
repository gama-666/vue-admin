import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import Cookie from "cookie_js"

export default new Vuex.Store({
  state: {
    // 取本地值，本地没值取默认值(临时)
    isCollpase: JSON.parse(sessionStorage.getItem('isCollpase')) || false,
    //取本地值，本地没值取默认值(长期)
    // isCollpase: JSON.parse(localStorage.getItem('isCollpase')) || false,
    //Cookie取本地值，本地没值取默认值(长期)
    // isCollpase: JSON.parse(Cookie.get('isCollpase')) || false,
  },
  mutations: {
    SET_COLLPASE: (state) => {
      state.isCollpase = !state.isCollpase;
      // html5本地存储(临时存储，关闭浏览器就清除)
      sessionStorage.setItem('isCollpase', JSON.stringify(state.isCollpase))
      //html5本地存储(长期存储，关闭浏览器不会清除)
      // localStorage.setItem('isCollpase', JSON.stringify(state.isCollpase))
      //Cookie本地存储(临时存储，关闭浏览器就清除)
      // Cookie.set('isCollpase', JSON.stringify(state.isCollpase))
    }
  },
  actions: {
  }
});
