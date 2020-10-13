import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//默认路由
export const defaultRouterMap = [{
  path: "/",
  redirect: "login",
  hidden: true,
  meta: {
    name: "主页"
  }
},
{
  path: "/login",
  name: "Login",
  hidden: true,
  meta: {
    name: "登录"
  },
  component: () => import("../views/Login/index.vue")
},
{
  path: "/console",
  name: "Console",
  redirect: "index",
  meta: {
    name: "控制台",
    icon: "console"
  },
  component: () => import("../views/Layout/index.vue"),
  children: [{
    path: "/index",
    name: "Index",
    meta: {
      name: "首页"
    },
    component: () => import("../views/Console/index.vue"),
  },]
},
//404页面
{
  path: "/page404",
  meta: {
    name: "控制台",
    icon: "console",
  },
  hidden: true,
  component: () => import("../views/Layout/index.vue"),
  children: [{
    path: "/404",
    meta: {
      name: "404"
    },
    hidden: true,
    component: () => import("../views/404.vue"),
  },]
},

]



const router = new VueRouter({
  routes: defaultRouterMap
});


//动态路由
export const asnycRouterMap = [{
  path: "/info",
  name: "Info",
  meta: {
    name: "信息管理",
    keepAlive: true,
    icon: "info",
    system: "infoSystem"
  },
  component: () => import("../views/Layout/index.vue"),
  children: [{
    path: "/infoCategory",
    name: "InfoCategory",
    meta: {
      keepAlive: true,
      name: "信息分类"
    },
    component: () => import("../views/Info/category.vue"),
  }, {
    path: "/infoList",
    name: "InfoList",
    meta: {
      keepAlive: true,
      name: "信息列表"
    },
    component: () => import("../views/Info/index.vue"),
  },
  {
    path: "/intoDetails",
    name: "IntoDetails",
    hidden: true,
    meta: {
      keepAlive: true,
      name: "编辑详情"
    },
    component: () => import("../views/Info/infoDetails.vue"),
  },
  ]
},
{
  path: "/user",
  name: "User",
  redirect: "index",
  meta: {
    name: "用户管理",
    icon: "user",
    keepAlive: true,
    system: "userSystem"
  },
  component: () => import("../views/Layout/index.vue"),
  children: [{
    path: "/userList",
    name: "UserList",
    meta: {
      keepAlive: true,
      name: "用户列表"
    },
    component: () => import("../views/user/index.vue"),
  },]
},
{
  path: "*",
  redirect: "404",
  hidden: true
},
]

export default router;