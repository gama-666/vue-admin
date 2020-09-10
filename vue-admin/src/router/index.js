import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";
import Console from "../views/Console/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/console",
    name: "Console",
    component: Console,
    // component: ()=>import(".../views/Console/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
