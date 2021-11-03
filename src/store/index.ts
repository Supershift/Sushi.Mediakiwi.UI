import router from "@/router";
import axios from "axios";
import FieldModel from "@/models/FieldModel";
import NotificationModel from "@/models/Mediakiwi/NotificationModel";
import SideNavigationModel from "@/models/Mediakiwi/SideNavigationModel";
import TopNavigationModel from "@/models/Mediakiwi/TopNavigationModel";
import { InjectionKey } from "vue"
import { createStore, Store } from "vuex"
import DrawerModel from "./modules/DrawerModel";
import DialogModel from "./modules/DialogModel";
import { BaseContentModel } from "./modules/BaseContentModel";
import PageModel from "./modules/PageModel";
import ProfileModel from "@/models/Mediakiwi/ProfileModel";
import SideNavigationItemModel from "@/models/Mediakiwi/SideNavigationItemModel";
import TopNavigationItemModel from "@/models/Mediakiwi/TopNavigationItemModel";
import GridModel from "@/models/Mediakiwi/GridModel";
import FolderModel from "@/models/Mediakiwi/FolderModel";
import ResourceModel from "@/models/Mediakiwi/ResourceModel";
import { vueTypes } from "@/components/form";
const loggedinKey = "ananda_vaultn_loggedin";

// define your typings for the store state
export interface State {
  rootPath: string,
  isLoggedIn: boolean,
  mediakiwiLoading: boolean,
  page?: PageModel | null,
  drawer: DrawerModel,
  profileData?: ProfileModel | null,
  notification?: NotificationModel | null
  dialog: DialogModel,
  description: string,
  fields: FieldModel[] | null,
  sideNavigationItems: SideNavigationItemModel[] | null,
  topNavigationItems: TopNavigationItemModel[] | null,
  content: BaseContentModel,
  channel: number,
  resources: ResourceModel[],
  grids: GridModel[] | null,
  folders: FolderModel[] | null,
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    rootPath: "",
    isLoggedIn: false,
    mediakiwiLoading: false,
    page: null,
    drawer: {
      open: false,
    },
    profileData: null,
    notification: null,
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
        title: "Choose a team",
        vueType: vueTypes.formSection,
        expression: 0,
        value: "User input",
        options: null,
        className: "small",
        event: "none",
        inputPost: "Test",
        section: 0,
        hidden: false,
        groupName: null,
        suffix: null,
        prefix: null,
        formSection: null,
        canToggleSection: false,
        canDeleteSection: false,
        toggleDefaultClosed: false,
        readOnly: true,
        helpText: "This field can do stuff",
        weekStart: 7,
        fieldIcon: "",
        locale: "en-US",
      },
      {
        contentTypeID: 18,
        propertyName: "TestDropdown",
        propertyType: "string[]",
        title: "Team selection",
        vueType: vueTypes.formChoiceRadio,
        expression: 0,
        value: "1",
        options: {
          items: [
            {
              text: "Ajax",
              value: "1",
              enabled: true,
              selected: true
            },
            {
              text: "Feyenoord",
              value: "2",
              enabled: true,
              selected: false
            }
          ],
          count: 2
        },
        className: null,
        event: "none",
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
        helpText: "This field can do stuff",
        weekStart: 7,
        fieldIcon: "",
        locale: "en-US",
      },
    ],
    sideNavigationItems: null,
    topNavigationItems: null,
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
    channel: 0,
    resources: [],
    grids: [],
    folders: [],
  },
  mutations: {
    toggleDrawer(state: State) {
      state.drawer.open = !state.drawer.open;
    },
    toggleDialog(state) {
      state.dialog.show = !state.dialog.show;
    },
    toggleLogIn(state) {
      state.isLoggedIn = !state.isLoggedIn;
      // Temp solution
      sessionStorage.setItem(loggedinKey, state.isLoggedIn.toString());
      router.push("/");
    },
    toggleMediakiwiLoading(state) {
      state.mediakiwiLoading = !state.mediakiwiLoading;
    },
    setChannel(state, newChannel) {
      state.channel = newChannel;
    },
    setPage(state, data: PageModel) {
      state.page = data;
    },
    setPageResources(state, newResources) {
      state.resources = newResources;
    },
    setProfileInfomation(state, data: ProfileModel) {
      if (data) {
        state.profileData = data;
        if (!state.profileData.avatarPath) {
          state.profileData.avatarPath = "/images/noName.jpg";
        }
      }
    },
    setTopNavigation(state, data: TopNavigationModel) {
      if (data) {
        state.topNavigationItems = data.items;
      }
    },
    setSideNavigation(state, data: SideNavigationModel) {
      if (data) {
        state.sideNavigationItems = data.items;
      }
    },
    setGrids(state, data: GridModel[]) {
      state.grids = data;
    },
    setFolders(state, data: FolderModel[]) {
      state.folders = data;
    },
    setResources(state, data: ResourceModel[]) {
      state.resources = data;
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
    getMediakiwiAPI(context, request) {
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
      else if (request.url && request.url.indexOf("custom") > -1) {
        apiPath = "/custom-resources.json";
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
    setPage(context, data) {
      context.commit("setPage", data);
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
    setGrids(context, data) {
      context.commit("setGrids", data);
    },
    setFolders(context, data) {
      context.commit("setFolders", data);
    },
    setResources(context, data) {
      context.commit("setResources", data);
    }
  },
  getters: {
    sideNavigationItems: (state) => state.sideNavigationItems,
    rootPath: (state) => state.rootPath,
    topNavigationItems: (state) => state.topNavigationItems,
    page: (state) => state.page,
    openDrawer: (state) => state.drawer ? state.drawer.open : false,
    profileData: (state) => state.profileData,
    brandData: (state) => state.profileData ? state.profileData.company : "",
    notification: (state) => state.notification,
    dialog: (state) => state.dialog,
    contentLogin: (state) => state.content ? state.content.login : "",
    isLoggedIn: () => {
      // Temp
      let isLoggedIn = sessionStorage.getItem(loggedinKey);
      if (!isLoggedIn) {
        isLoggedIn = "false";
      }
      return isLoggedIn === "true"; // !!state.isLoggedIn && !!Cookies.get('access-token'),
    },
    fields: (state) => state.fields,
    contentForgottenPassword: (state) => state.content.forgotten,
    contentResetPassword: (state) => state.content.reset,
    grids: (state) => state.grids,
    folders: (state) => state.folders,
    resources: (state) => state.resources,
  },
});
