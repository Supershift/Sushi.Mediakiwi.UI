import { store } from "@/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fal
} from "@fortawesome/pro-light-svg-icons";
// Note we are using the Pro style here
import {
  fas
} from "@fortawesome/pro-solid-svg-icons";
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
);

const DEFAULT_TITLE = `${process.env.VUE_APP_TAB_TITLE}` || "Welcome!";


router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["Authentication/isLoggedIn"];
  /* eslint no-console:0 */
  console.log(to.matched, "Authenticated: "+isAuthenticated);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page
    
    
    if (!isAuthenticated) {
      next({
        path: "/login",
      });
    } else {
      // to.meta.title = to.params.project_name_slug;
      if (to.query.openinframe) {
        store.dispatch(UITypes.SET_OPEN_IN_FRAME, true);
      }

      /* eslint no-console:0 */
      console.log("origin-url", to.fullPath);
      store.dispatch(NavigationTypes.GET_SITES, to.fullPath)
      store.dispatch(NavigationTypes.GET_SIDE_NAVIGATION, to.fullPath)
      store.dispatch(NavigationTypes.GET_TOP_NAVIGATION, to.fullPath)
      // Fetch the Mediakiwi data
      store.dispatch(ContentTypes.GET_CONTENT, to.fullPath)
      .then(() => {
        next();
      }).catch(() => {
        // redirect to 500 page
        store.dispatch(UITypes.SET_NOTIFICATION, { type: "error", message: "Error fetching content" });
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
