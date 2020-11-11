import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const rejectLogin = (to, from, next) => {
   if(store.state.isLogin === true ){
      alert('you already logged in.');
      next('/');
   }
   else{
      next();
   }
};

const rejectMypage = (to, from, next) => {
   if(store.state.isLogin  === false ){
      alert('you must log in');
      next('/login');
   }
   else{
      next();
   }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectLogin,
    component: () =>
      import("../views/Login.vue")
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: rejectMypage,
    component: () =>
      import("../views/Mypage.vue")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
