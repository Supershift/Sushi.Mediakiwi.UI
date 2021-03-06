import { store } from "@/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fal
} from "@fortawesome/pro-light-svg-icons";
// Note we are using the Pro style here
import {
  fas
} from "@fortawesome/pro-solid-svg-icons";
import {
  far
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { ContentTypes } from "./store/modules/Content";
import { NavigationTypes } from "./store/modules/Navigation";
import { UITypes } from "./store/modules/UI";
import { mediakiwiLogic } from "./utils/mediakiwiLogic";

library.add(
  fas,
  fal,
  far,
);

const DEFAULT_TITLE = `${process.env.VUE_APP_TAB_TITLE}` || "Welcome!";


router.beforeEach((to, from, next) => {
  // Check if the user is Authenticated
  const isAuthenticated = store.getters["Authentication/isLoggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page
    
    if (!isAuthenticated) {
      store.dispatch("clearCache");
      next({
        path: "/login",
      });
    } else {
      if (to.query.openinframe) {
        store.dispatch(UITypes.SET_OPEN_IN_FRAME, true);
      }

      // Refresh and call the APIs to get the data
      store.dispatch(NavigationTypes.GET_SITES, to.fullPath)
      store.dispatch(NavigationTypes.GET_SIDE_NAVIGATION, to.fullPath)
      store.dispatch(NavigationTypes.GET_TOP_NAVIGATION, to.fullPath)
      store.dispatch(ContentTypes.GET_CONTENT, to.fullPath)

      .then(() => {
        next();
      }).catch(() => {
        // redirect to 500 page
        store.dispatch("clearCache");
        router.push("/login")
        store.dispatch(UITypes.SET_NOTIFICATION, { type: "error", message: "Error 500 fetching content" });
      });
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route is only available to a visitor which means they should not be logged in
    // if logged in, redirect to home page.
    if (isAuthenticated && from.fullPath) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
});

router.afterEach((to) => {
  document.title = `Mediakiwi | ${to.meta.title || DEFAULT_TITLE}`;
});

createApp(App).use(router)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .mount("#app");

mediakiwiLogic.bind();
