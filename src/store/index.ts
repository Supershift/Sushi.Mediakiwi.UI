import { FieldValidationType, FieldValidationTypeMessage } from "@/components/form";
import { ButtonModel } from "@/models/Mediakiwi/ButtonModel";
import { ButtonTargetType } from "@/models/Mediakiwi/ButtonTargetType";
import FieldModel from "@/models/Mediakiwi/FieldModel";
import FolderModel from "@/models/Mediakiwi/FolderModel";
import GridModel from "@/models/Mediakiwi/GridModel";
import NotificationModel from "@/models/Mediakiwi/NotificationModel";
import ResourceModel from "@/models/Mediakiwi/ResourceModel";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import ViewModel from "@/models/Mediakiwi/ViewModel";
import axios from "axios";
import { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { BaseContentModel } from "../models/BaseContentModel";
import DialogModel from "../models/DialogModel";
import DrawerModel from "../models/DrawerModel";
import PageModel from "../models/PageModel";
import { serverCodes } from "@/utils/api-service";
import { GetContentMediakiwiRequestModel } from "@/models/Mediakiwi/Request/Content/GetContentMediakiwiRequestModel";
import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel";
import {Navigation} from "./modules/Navigation";
import { NavigationItemModel } from "@/models/Mediakiwi/NavigationModel";
import  {Authentication}  from "./modules/Authentication";
import {  UI, UITypes } from "./modules/UI";
import { Content } from "./modules/Content";

// define your typings for the store state
export interface RootState {
  // apiKey: string,
  currentSiteID: number,
  rootPath: string,
  // isLoggedIn: boolean,
  // mediakiwiLoading: boolean,
  page?: PageModel | null,
  // drawer: DrawerModel,
  // profileData: AuthenticateResponseModel | null,
  // notification?: NotificationModel | null,
  // dialog: DialogModel,
  description: string,
  fields: FieldModel[] | null,
  // sideNavigationItems: NavigationItemModel[] | null,
  // topNavigationItems: NavigationItemModel[] | null,
  content: BaseContentModel,
  channel: number,
  resources: ResourceModel[],
  grids: GridModel[] | null,
  folders: FolderModel[] | null,
  buttons: ButtonModel[] | null,
  // isLayerMode: boolean,
  views?: ViewModel[] | null,
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state: {
    // apiKey: "",
    rootPath: "",
    currentSiteID: 2,
    // isLoggedIn: false,
    // mediakiwiLoading: false,
    page: null,
    // drawer: {
    //   open: false,
    // },
    // profileData: null,
    // notification: null,
    // dialog: {
    //   show: false,
    //   settings: false,
    // },
    description: "",
    buttons: [],
    fields: [],
    // sideNavigationItems: null,
    // topNavigationItems: null,
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
    // isLayerMode: false,
    views: null,
  },
  mutations: {
    // toggleDrawer(state: RootState) {
    //   state.drawer.open = !state.drawer.open;
    // },
    // toggleDialog(state) {
    //   state.dialog.show = !state.dialog.show;
    // },
    //Old API
    // getMediakiwiContentAPI(state, request: GetContentMediakiwiRequestModel){
    //   store.dispatch(UITypes.SET_LOADING, true);
    //   return new Promise((resolve, reject) => {
    //     // TODO: finish this request!
    //     axios.get("content/GetContent")
    //     .then((response) => {
    //       if (response.status === serverCodes.OK) {
    //         // TODO: Finish responsemodel and place here!
    //         sessionStorage.setItem("response", response.data);
    //       }
    //       resolve(response);
    //     })
    //     .catch((error) => {
    //       reject(error)
    //       store.dispatch(UITypes.SET_LOADING, false);
    //     })
    //     .finally(() => {
    //       store.dispatch(UITypes.SET_LOADING, false);
    //     });
    //   });
    // },
    setChannel(state, newChannel) {
      state.channel = newChannel;
    },
    // setPage(state, data: PageModel) {
    //   state.page = data;
    // },
    setPageResources(state, newResources) {
      state.resources = newResources;
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
    setChannel(context, newChannel) {
      context.commit("setChannel", newChannel);
    },
    // setPage(context, data) {
    //   context.commit("setPage", data);
    // },
    setPageResources(context, newResources) {
      context.commit("setPageResources", newResources);
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
    rootPath: (state) => state.rootPath,
    // page: (state) => state.page,
    contentLogin: (state) => state.content ? state.content.login : "",
    contentForgotten: (state) => state.content ? state.content.forgotten : "",
    fields: (state) => state.fields,
    contentResetPassword: (state) => state.content.reset,
    // grids: (state) => state.grids,
    // folders: (state) => state.folders,
    resources: (state) => state.resources,
    // buttons: (state) => state.buttons,
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
    views: (state) => state.views,
  },
  modules: {
    Navigation,
    Authentication,
    UI,
    Content,
  },
});
