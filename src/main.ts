import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
// Note we are using the Pro style here
import {
  fas,
} from "@fortawesome/pro-solid-svg-icons";
import {
  fal,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { store } from "@/store"; import App from "./App.vue";
import router from "./router";
import { api } from "./utils/api";
import { mediakiwiLogic } from "./utils/mediakiwiLogic";

library.add(
  fas,
  fal,
);

const DEFAULT_TITLE = "Welcome!";

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page
    if (!store.getters.isLoggedIn) {
      next({
        path: "/login",
      });
      // console.log("Please login first", from.fullPath);
    } else {
      // to.meta.title = to.params.project_name_slug;
      // eslint-disable-next-line no-console
      console.log(to)
      if (to.query.openinframe) {
        store.state.isLayerMode = true;
      }

      // Fetch the Mediakiwi data
      api.fetchMediakiwiAPI(to.fullPath).then(() => {
        next();
      }).catch(() => {
        // redirect to 500 page 
      });
    }
    // console.log("I am trying to authorize", store.getters.isLoggedIn);
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route is only available to a visitor which means they should not be logged in
    // if logged in, redirect to home page.
    if (store.getters.isLoggedIn && from.fullPath) {
      next({
        path: "/",
      });
    } else {
      next();
    }
    // console.log("I am a visitor!", store.getters.isLoggedIn);
  }
});

router.afterEach((to) => {
  document.title = `VaultN | ${to.meta.title || DEFAULT_TITLE}`;
});

createApp(App).use(router)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .mount("#app");

mediakiwiLogic.bind();
