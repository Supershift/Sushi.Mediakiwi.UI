import { createStore } from "vuex";
// import Cookies from 'js-cookies';
// import * as profile from './modules/profile';
// import * as menu from './modules/menu';
// import * as navigation from './modules/navigation';
import DummyAvatar from "@/assets/dummy-images/avatar-dummy.jpg";
import DummyBrand from "@/assets/images/ananda.png";
import router from "@/router";
import axios from "axios";

export default createStore({
  modules: {
    // profile,
    // navigation,
    // menu,
  },
  state: {
    isLoggedIn: false,
    mediaKiwiLoading: false,
    site: {
      title: "Site title - Page Title",
    },
    drawer: {
      open: false,
    },
    profileData: {
      fullName: "Luigi Arends",
      email: "luigi.arends@supershift.nl",
      avatar: DummyAvatar,
      company: {
        title: "Ananada",
        logo: DummyBrand,
      },
    },
    notification: {
      show: false,
      hasAction: true,
      alertText: "Succesfully Transfered ( 3 assets - 20210811 - to VaultN",
      actionText: "Take action",
      actionType: "warning",
    },
    dialog: {
      show: false,
      settings: false,
    },
    description: "",
    fields: [
      {
        contentTypeID: 10,
        propertyName: "TestProperty",
        propertyType: "string",
        title: "Test Property",
        vueType: 14,
        expression: 0,
        value: "User input",
        options: null,
        className: "small",
        event: 0,
        inputPost: "Test",
        section: 0,
        hidden: null,
        groupName: null,
        suffix: null,
        prefix: null,
        formSection: null,
        canToggleSection: false,
        canDeleteSection: false,
        toggleDefaultClosed: false,
        readOnly: false,
        helpText: "This field can do stuff"
      },
      {
        contentTypeID: 18,
        propertyName: "TestDropdown",
        propertyType: "string[]",
        title: "Test Dropdown",
        vueType: 11,
        expression: 0,
        value: "1",
        options: {
          items: [
            {
              text: "Optie 1",
              value: "1",
              enabled: true,
              selected: true
            },
            {
              text: "Optie 2",
              value: "2",
              enabled: true,
              selected: false
            }
          ],
          count: 2
        },
        className: null,
        event: 1,
        inputPost: null,
        section: 0,
        hidden: null,
        groupName: null,
        suffix: null,
        prefix: null,
        formSection: null,
        canToggleSection: false,
        canDeleteSection: false,
        toggleDefaultClosed: false,
        readOnly: false,
        helpText: "This field can do stuff"
      },
    ],
    menuItems: [{
      id: 1,
      name: "Home",
      icon: ["fal", "fingerprint"],
      open: false,
    }, {
      id: 2,
      name: "My Vault",
      icon: ["fal", "th"],
      open: false,
    }, {
      id: 3,
      name: "Finance",
      icon: ["fal", "donate"],
      open: false,
    }, {
      id: 4,
      name: "My Network",
      icon: ["fal", "users"],
      open: false,
    }, {
      id: 5,
      name: "Orders",
      icon: ["fal", "receipt"],
      open: false,
    }, {
      id: 6,
      name: "Settings",
      icon: ["fal", "cog"],
      open: false,
    }, {
      id: 7,
      name: "Cube",
      icon: ["fas", "cube"],
      open: false,
    },
    ],
    navigationItems: [{
      id: 8,
      name: "Assets",
    }, {
      id: 9,
      name: "Product",
    }, {
      id: 10,
      name: "Rights",
    }, {
      id: 11,
      name: "Inbox",
    }, {
      id: 12,
      name: "Transations",
    }, {
      id: 13,
      name: "Promises",
    },
    ],
    content: {
      login: {
        loginCreateAccountText: "Create an account",
        loginForgotPasswordText: "Forgot Password?",
        loginPasswordPlaceholder: "Email",
        loginEmailPlaceholder: "Password",
        loginButtonText: "Login",
        loginHeadlineText: "Sign in with your email",
      },
      forgotten: {
        forgottenEmailPlaceholder: "Email",
        fogottenButtonText: "Submit",
        forgottenHeadlineText: "Resset password with your email",
      },
      reset: {
        resetEmailPlaceholder: "Email",
        resetButtonText: "Submit",
        resetHeadlineText: "Resset password with your email",
      },
    },
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer.open = !state.drawer.open;
    },
    toggleDialog(state) {
      state.dialog.show = !state.dialog.show;
    },
    toggleLogIn(state) {
      state.isLoggedIn = !state.isLoggedIn;
      router.push("/");
    },
    toggleMediaKiwiLoading(state) {
      state.mediaKiwiLoading = !state.mediaKiwiLoading;
    },
    getMediaKiwiAPI(state, request) {
      return new Promise((resolve, reject) => {
        axios({ url: `${origin()}/api/mediakiwi`, data: request, method: "POST" })
          .then((resp) => {
            // always set channel!!
            if (resp && resp.data && resp.data.channel && resp.data.channel.current) {
              this.$store.dispatch("setChannel", resp.data.channel.current);
            }

            if (resp && resp.data && resp.data.resources) {
              this.$store.addPageResources(resp.data.resources);
            }

            this.$store.dispatch("toggleMediaKiwiLoading");
            resolve(resp);
          })
          .catch((err) => {
            this.$store.dispatch("toggleMediaKiwiLoading");
            alert("Something went wrong while fetching the page");
            reject(err);
          });
      });
    },
    setChannel(state, newChannel) {
      state.channel = newChannel;
    },
    setPageResources(state, newResources) {
      state.resources = newResources;
    }
  },
  actions: {
    toggleDrawer(context) {
      context.commit("toggleDrawer");
    },
    toggleDialog(context) {
      context.commit("toggleDialog");
    },
    toggleLogIn(context) {
      context.commit("toggleLogIn");
    },
    getMediaKiwiAPI(context, request) {
      context.commit("toggleMediaKiwiLoading");
      context.commit("getMediaKiwiAPI", request);
    },
    setChannel(context, newChannel) {
      context.commit("setChannel", newChannel);
    },
    setPageResources(context, newResources) {
      context.commit("setPageResources", newResources);
    },
  },
  getters: {
    menuItems: (state) => state.menuItems,
    rootPath: (state) => state.rootPath,
    navigationItems: (state) => state.navigationItems,
    siteTitle: (state) => state.site.title,
    openDrawer: (state) => state.drawer.open,
    profileData: (state) => state.profileData,
    brandData: (state) => state.profileData.company,
    notification: (state) => state.notification,
    dialog: (state) => state.dialog,
    contentLogin: (state) => state.content.login,
    isLoggedIn: (state) => state.isLoggedIn, // !!state.isLoggedIn && !!Cookies.get('access-token'),
    fields: (state) => state.fields,
    contentForgottenPassword: (state) => state.content.forgotten,
    contentResetPassword: (state) => state.content.reset,
  },
});
