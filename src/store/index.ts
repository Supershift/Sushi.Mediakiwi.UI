import router from "@/router";
import axios from "axios";
import FieldModel from "@/models/Mediakiwi/FieldModel";
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
import { FieldValidationType, FieldValidationTypeMessage, vueTypes } from "@/components/form";
import { ButtonModel } from "@/models/Mediakiwi/ButtonModel";
import { ButtonTargetType } from "@/models/Mediakiwi/ButtonTargetType";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import ViewModel from "@/models/Mediakiwi/ViewModel";
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
  buttons: ButtonModel[] | null,
  isLayerMode: boolean,
  views?: ViewModel[] | null,
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
    buttons: [],
    fields: [],
    sideNavigationItems: null,
    topNavigationItems: null,
    content: {
      errors: [
        {
          code: FieldValidationType.required,
          isError: true,
          message: FieldValidationTypeMessage.required,
          propertyName: null,
        },
        {
          code: FieldValidationType.email,
          isError: true,
          message: FieldValidationTypeMessage.email,
          propertyName: null,
        },
        {
          code: FieldValidationType.minLength,
          isError: true,
          message: FieldValidationTypeMessage.minLength,
          propertyName: null,
        },
        {
          code: FieldValidationType.maxLength,
          isError: true,
          message: FieldValidationTypeMessage.maxLength,
          propertyName: null,
        },
        {
          code: FieldValidationType.pattern,
          isError: true,
          message: FieldValidationTypeMessage.pattern,
          propertyName: null,
        },
        {
          code: FieldValidationType.empty,
          isError: true,
          message: FieldValidationTypeMessage.empty,
          propertyName: null,
        },
        {
          code: FieldValidationType.url,
          isError: true,
          message: FieldValidationTypeMessage.url,
          propertyName: null,
        },
        {
          code: FieldValidationType.empty,
          isError: true,
          message: FieldValidationTypeMessage.empty,
          propertyName: null,
        },
        {
          code: FieldValidationType.min,
          isError: true,
          message: FieldValidationTypeMessage.max,
          propertyName: null,
        },
      ],
      login: {
        loginCreateAccountText: "Create an account",
        loginForgotPasswordText: "Forgot Password?",
        loginPasswordPlaceholder: "Password",
        loginEmailPlaceholder: "Email",
        loginButtonText: "Login",
        loginHeadlineText: "Sign in with your email",
      },
      forgotten: {
        forgottenEmailPlaceholder: "Email",
        fogottenButtonText: "Submit",
        forgottenHeadlineText: "Reset password via email",
      },
      reset: {
        resetEmailPlaceholder: "Email",
        resetButtonText: "Submit",
        resetHeadlineText: "Reset password via email",
      },
    },
    channel: 0,
    resources: [],
    grids: [],
    folders: [],
    isLayerMode: false,
    views: null,
  },
  mutations: {
    toggleDrawer(state: State) {
      state.drawer.open = !state.drawer.open;
    },
    toggleDialog(state) {
      state.dialog.show = !state.dialog.show;
    },
    signIn(state) {
      state.isLoggedIn = !state.isLoggedIn;
      // Temp solution
      sessionStorage.setItem(loggedinKey, state.isLoggedIn.toString());
      router.push("/");
    },
    signOut(state) {
      state.isLoggedIn = false;
      sessionStorage.setItem(loggedinKey, state.isLoggedIn.toString());
      router.push("/login");
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
        if (!state.profileData.company) {
          state.profileData.company = "/images/noImage.png";
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
    },
    setFields(state, data: FieldModel[]) {
      state.fields = data;
    },
    setButtons(state, data: ButtonModel[]) {
      state.buttons = data;
    },
    setViews(state, data: ViewModel[]) {
      state.views = data;
    }
  },
  actions: {
    toggleDrawer(context) {
      context.commit("toggleDrawer");
    },
    toggleDialog(context) {
      context.commit("toggleDialog");
    },
    signIn(context) {
      context.commit("signIn");
    },
    signOut(context) {
      context.commit("signOut");
    },
    getMediakiwiAPI(context, request) {
      // TODO Replace logic with an axios.post to the request.url
      // the request should be passed as the requestBody

      // Determine what JSON to serve
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
      else if (request.url && request.url.indexOf("upload") > -1) {
        apiPath = "/file-upload.json";
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
    postMediakiwiAPI(context, request) {
      return new Promise((resolve, reject) => {
        axios.post(request.url, request)
          .then((response) => resolve(response.data))
          .catch((err) => {
            alert("Something went wrong while fetching the page");
            reject(err);
          });
      });
    },
    deleteMediakiwiAPI(context, request) {
      return new Promise((resolve, reject) => {
        axios.delete(request.url, request)
          .then((response) => resolve(response.data))
          .catch((err) => {
            alert("Something went wrong while fetching the page");
            reject(err);
          });
      });
    },
    putMediakiwiAPI() {
      return new Promise((resolve, reject) => {
        // TODO enable REAL the web api
        axios.get("/fields-postback.json")
          .then((response) => {
            const responseData: MediakiwiResponseModel = response.data;
            // TODO Remove
            responseData.closeLayer = true;
            resolve(responseData);
          })
          .catch((err) => {
            alert("Something went wrong while fetching the page");
            reject(err);
          });

        // axios.put(request.url, request)
        //   .then((response) => resolve(response.data))
        //   .catch((err) => {
        //     alert("Something went wrong while fetching the page");
        //     reject(err);
        //   });
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
    },
    setFields(context, data) {
      context.commit("setFields", data);
    },
    setButtons(context, data) {
      context.commit("setButtons", data);
    },
    setViews(context, data) {
      context.commit("setViews", data);
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
    contentForgotten: (state) => state.content ? state.content.forgotten : "",
    isLoggedIn: () => {
      // Temp
      let isLoggedIn = sessionStorage.getItem(loggedinKey);
      if (!isLoggedIn) {
        isLoggedIn = "false";
      }
      return isLoggedIn === "true"; // !!state.isLoggedIn && !!Cookies.get('access-token'),
    },
    fields: (state) => state.fields,
    contentResetPassword: (state) => state.content.reset,
    grids: (state) => state.grids,
    folders: (state) => state.folders,
    resources: (state) => state.resources,
    buttons: (state) => state.buttons,
    topButtons: (state) => {
      return state.buttons?.filter((button) => (button.iconTarget === ButtonTargetType.topLeft || button.iconTarget === ButtonTargetType.topRight));
    },
    bottomButtons: (state) => {
      return state.buttons?.filter((button) => (button.iconTarget === ButtonTargetType.bottomLeft || button.iconTarget === ButtonTargetType.bottomRight));
    },
    fieldValues: (state) => {
      return state.fields?.map((field) => {
        return {
          title: field.title,
          value: field.value
        }
      });
    },
    isLayerMode: (state) => state.isLayerMode,
    views: (state) => state.views,
  },
});
