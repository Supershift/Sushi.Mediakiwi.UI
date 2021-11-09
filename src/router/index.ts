import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
    meta: {
      requiresVisitor: true,
      title: "Please login to continue!",
      layout: "landing",
    },
    children: [
      {
        path: "",
        component: () => import(/* webpackChuckName: "forgot" */ "../components/Login.vue"),
      },
    ]
  },
  {
    name: "Forgot",
    path: "/forgot",
    component: Login,
    public: true,
    children: [{
      path: "",
      component: () => import(/* webpackChuckName: "forgot" */ "../components/ForgottenPassword.vue"),
    },
    ]
  },
  {
    name: "Reset",
    path: "/reset",
    component: Login,
    public: true,
    children: [{
      path: "",
      component: () => import(/* webpackChuckName: "forgot" */ "../components/ResetPassword.vue"),
    },
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      title: "ValutN",
      layout: "default",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
