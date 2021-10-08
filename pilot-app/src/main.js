import Vue from "Vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import store from "./store/store";
import axios from "axios";
import app from "./app.vue";
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css";
import infiniteScroll from "vue-infinite-scroll";
import VueMeta from "vue-meta";


// local items
import clickOutside from "./directives/click-outside";
import addWebp from "./directives/add-webp";
import wimModal from "./plugins/wim-modal";

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(infiniteScroll);
Vue.use(VuejsDialog);

Vue.config.productionTip = false;
Vue.directive("click-outside", clickOutside);
Vue.directive("addwebp", addWebp);
Vue.use(wimModal);

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
});

// AXIOS CONFIG
Vue.prototype.$http = axios;
const accessToken = localStorage.getItem("token");
if (accessToken) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// ROUTER
// VIEWS
import login from "./views/login.vue";
// COMPONENTS
import loginComponent from "./components/login/login.vue";
import forgotPasswordComponent from "./components/login/forgot-password.vue";
import resetPasswordComponent from "./components/login/reset-password.vue";

// define routes
const listID = 0;
const itemID = 0;
const routes = [
    {
        name: "",
        path: "/login",
        component: login,
        public: true,
        children: [
            {
                path: "",
                component: loginComponent
            },
        ]
    },
    {
        name: "",
        path: "/forgot",
        component: login,
        public: true,
        children: [
            {
                path: "",
                component: forgotPasswordComponent
            },
        ]
    },
    {
        name: "",
        path: "/reset",
        component: login,
        public: true,
        children: [
            {
                path: "",
                component: resetPasswordComponent
            },
        ]
    },
    {
        name: "list",
        path: "/list/:listID",
    },
    {
        name: "form",
        path: "/form/:listID/:itemID",
        params: { listID, itemID },
    },
    {
        name: "home",
        path: "/",
    },
];

/// Create vue router
const router = new VueRouter({
    history: true,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes,
});


// Get public paths
const publicPaths = routes.filter((r) => r.public).map((r) => r.path);

document.addEventListener("DOMContentLoaded", (event) => {
    new Vue({
        router,
        store,
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            online() {
                return this.$store.getters.online;
            },
        },
        mounted() {
            this.$router.beforeEach((to, from, next) => {
                if (this.online === false) {
                    next(false);
                    return;
                }

                if (publicPaths.indexOf(to.path) === -1) {
                    if (this.isLoggedIn) {
                        next();
                    }
                    else {
                        next("login");
                    }
                }
                else {
                    next();
                }
            });
            this.loggedInCheck();
        },
        methods: {
            loggedInCheck() {
                if (!this.isLoggedIn) {
                    // goto login page                    
                    if (publicPaths.indexOf(this.$route.path) === -1) { this.$router.push("/login"); }
                }
            }
        },
        render: (h) => h(app),
    }).$mount("#app");
});

window.mobilecheck = function () {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return vw < 768; /// same as stylesheet
};
