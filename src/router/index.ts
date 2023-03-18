import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import _ from "lodash";
// 为了获取token，需要引入store
import { store } from "@/store";
import type { StateAll } from "@/store";

// 懒加载，动态引入
const Login = () => import("@/views/Login/LoginPage.vue");
const Apply = () => import("@/views/Apply/ApplyPage.vue");
const Check = () => import("@/views/Check/CheckPage.vue");
const Exception = () => import("@/views/Exception/ExceptionPage.vue");
const Home = () => import("@/views/Home/HomePage.vue");
const Sign = () => import("@/views/Sign/SignPage.vue");

// meta给动态菜单提供信息
declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean; // 为true的话这一项要添加到动态菜单中
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home", // 后台返回账号的权限跟name关联在一起
    component: Home,
    redirect: "/sign", //重定向到sign
    meta: {
      menu: true,
      title: "考勤管理",
      icon: "document-copy",
      auth: true,
    },
    children: [
      {
        path: "sign",
        name: "sign",
        component: Sign,
        meta: {
          menu: true,
          title: "在线打卡签到",
          icon: "calendar",
          auth: true,
        },
        beforeEnter(to, from, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          if (_.isEmpty(signsInfos)) {
            store
              .dispatch("signs/getTime", { userid: usersInfos._id })
              .then((res) => {
                if (res.data.errcode === 0) {
                  store.commit("signs/updateInfos", res.data.infos);
                  next();
                }
              });
          } else next();
        },
      },
      {
        path: "exception",
        name: "exception",
        component: Exception,
        meta: {
          menu: true,
          title: "异常考勤查询",
          icon: "warning",
          auth: true,
        },
        beforeEnter(to, from, next) {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;
          if (_.isEmpty(signsInfos)) {
            store
              .dispatch("signs/getTime", { userid: usersInfos._id })
              .then((res) => {
                if (res.data.errcode === 0) {
                  store.commit("signs/updateInfos", res.data.infos);
                  next();
                }
              });
          } else next();
        },
      },
      {
        path: "apply",
        name: "apply",
        component: Apply,
        meta: {
          menu: true,
          title: "添加考勤审批",
          icon: "document-add",
          auth: true,
        },
      },
      {
        path: "check",
        name: "check",
        component: Check,
        meta: {
          menu: true,
          title: "我的考勤审批",
          icon: "finished",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 先走全局守卫，再走独享守卫
router.beforeEach((to, from, next) => {
  const token = (store.state as StateAll).users.token;
  const infos = (store.state as StateAll).users.infos;
  // 需要去的页面需要验证，且没有个人信息
  if (to.meta.auth && _.isEmpty(infos)) {
    // 如果有token，需要防止伪造或者超时
    if (token) {
      store.dispatch("users/infos").then((res) => {
        if (res.data.errcode === 0) {
          store.commit("users/updateInfos", res.data.infos);
          next();
        }
        // 如果返回错误，在相应拦截器里做统一处理
      });
    } else {
      next("/login");
    }
  } else {
    if (token && to.path === "/login") {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
