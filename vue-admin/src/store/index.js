import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app"
import login from "./modules/login"
import dialog from "./modules/dialog"
import infoDetails from "./modules/infoDetails"

export default new Vuex.Store({
  modules: {
    app,
    dialog,
    login,
    infoDetails
  }
});
