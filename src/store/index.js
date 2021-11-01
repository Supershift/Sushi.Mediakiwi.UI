import { createStore } from "vuex";
// import Cookies from 'js-cookies';
// import * as profile from './modules/profile';
// import * as menu from './modules/menu';
// import * as navigation from './modules/navigation';
import DummyAvatar from "@/assets/dummy-images/avatar-dummy.jpg";
import DummyBrand from "@/assets/images/ananda.png";
import router from "@/router";
import axios from "axios";

const loggedinKey = "ananda_vaultn_loggedin";

export default createStore({
  modules: {
    // profile,
    // navigation,
    // menu,
  },
  state: {
    isLoggedIn: false,
    mediakiwiLoading: false,
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
        vueType: 5,
        expression: 0,
        value: "User input",
        options: null,
        className: null,
        event: 0,
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
      {
        contentTypeID: 18,
        propertyName: "TestDropdown",
        propertyType: "string[]",
        title: "Test Dropdown",
        vueType: 8,
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
      href: "",
      icon: ["fal", "fingerprint"],
      open: false,
    }, {
      id: 2,
      name: "My Vault",
      href: "",
      icon: ["fal", "th"],
      open: false,
    }, {
      id: 3,
      name: "Finance",
      href: "",
      icon: ["fal", "donate"],
      open: false,
    }, {
      id: 4,
      name: "My Network",
      href: "",
      icon: ["fal", "users"],
      open: false,
    }, {
      id: 5,
      name: "Orders",
      href: "",
      icon: ["fal", "receipt"],
      open: false,
    }, {
      id: 6,
      name: "Settings",
      href: "",
      icon: ["fal", "cog"],
      open: false,
    }, {
      id: 7,
      name: "Cube",
      href: "",
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
      // Temp solution
      sessionStorage.setItem(loggedinKey, state.isLoggedIn);
      router.push("/");
    },
    toggleMediakiwiLoading(state) {
      state.mediakiwiLoading = !state.mediakiwiLoading;
    },
    getMediakiwiAPI(state, request) {
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

            this.$store.dispatch("toggleMediakiwiLoading");
            resolve(resp);
          })
          .catch((err) => {
            this.$store.dispatch("toggleMediakiwiLoading");
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
    },
    setProfileInfomation(state, data) {
      if (data) {
        state.profileData.fullName = data.displayName;
        state.profileData.email = data.email;
      }
    },
    setTopNavigation(state, data) {
      // TODO
    },
    setSideNavigation(state, data) {
      state.menuItems = [];
      // eslint-disable-next-line no-console
      console.log(data)
      if (data && data.items) {
        let id = 0;
        data.items.forEach((item) => {
          state.menuItems.push({
            id,
            name: item.text,
            href: item.href,
            icon: ["fal", item.iconClass]
          });
          id++;
        });
      }
    },
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
    getMediakiwiAPI(context, request) {
      context.commit("toggleMediakiwiLoading");
      context.commit("getMediakiwiAPI", request);
    },
    getMediakiwiAPIByUrl(context, request) {
      // Activate the loader
      context.commit("toggleMediakiwiLoading");

      // TEMP; Determine what JSON to serve
      let apiPath = "/grids.json";
      if (request.url && request.url.indexOf("folder") > -1) {
        apiPath = "/folders.json";
      }
      else if (request.url && request.url.indexOf("?item=") > -1) {
        apiPath = "/fields.json";
      }

      // Start a promise with an axios call
      // to fetch the mediakiwi json      
      return new Promise((resolve, reject) => {
        axios.get(apiPath)
          .then((response) => resolve(response.data))
          .catch((err) => {
            alert("Something went wrong while fetching the page");
            reject(err);
          });
      });
    },
    toggleMediakiwiLoading(context) {
      context.commit("toggleMediakiwiLoading");
    },
    setChannel(context, newChannel) {
      context.commit("setChannel", newChannel);
    },
    setPageResources(context, newResources) {
      context.commit("setPageResources", newResources);
    },
    setProfileInfomation(context, data) {
      context.commit("setProfileInfomation", data);
    },
    setTopNavigation(context, data) {
      context.commit("setTopNavigation", data);
    },
    setSideNavigation(context, data) {
      context.commit("setSideNavigation", data);
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
    isLoggedIn: () => {
      // Temp
      let isLoggedIn = sessionStorage.getItem(loggedinKey);
      return isLoggedIn; // !!state.isLoggedIn && !!Cookies.get('access-token'),
    },
    fields: (state) => state.fields,
    contentForgottenPassword: (state) => state.content.forgotten,
    contentResetPassword: (state) => state.content.reset,
  },
});
