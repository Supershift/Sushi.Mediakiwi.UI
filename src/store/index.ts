import { FieldValidationType, FieldValidationTypeMessage } from "@/components/form";
import { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { BaseContentModel } from "../models/BaseContentModel";
import PageModel from "../models/PageModel";
import {Navigation} from "./modules/Navigation";
import  {Authentication}  from "./modules/Authentication";
import {  UI } from "./modules/UI";
import { Content } from "./modules/Content";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";


// define your typings for the store state
export interface RootState {
  currentSiteID: number,
  rootPath: string,
  page?: PageModel | null,
  description: string,
  content: BaseContentModel,
  channel: number,
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

// define the Storage
const vuexLocal = window.localStorage;

// define security
const ls = new SecureLS({ isCompression: false });

export const store = createStore<RootState>({
  plugins: process.env.NODE_ENV === "development" ? [
    createLogger(),
    createPersistedState({
      storage: vuexLocal,
    })
   ] : 
    [ 
      createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      }
    })],
  state: {
    rootPath: "/",
    currentSiteID: 2,
    page: null,
    description: "",
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
    // setChannel(state, newChannel) {
    //   state.channel = newChannel;
    // },
  },
  actions: {
    // getMediakiwiAPI(context, request) {
    //   // TODO Replace logic with an axios.post to the request.url
    //   // the request should be passed as the requestBody

    //   // Determine what JSON to serve
    //   let apiPath = "/grids.json";
    //   if (request.url && request.url.indexOf("folder") > -1) {
    //     apiPath = "/folders.json";
    //   }
    //   else if (request.url && request.url.indexOf("?item=") > -1) {
    //     apiPath = "/fields.json";
    //   }
    //   else if (request.url && request.url.indexOf("custom") > -1) {
    //     apiPath = "/custom-resources.json";
    //   }
    //   else if (request.url && request.url.indexOf("upload") > -1) {
    //     apiPath = "/file-upload.json";
    //   }

    //   // Start a promise with an axios call
    //   // to fetch the mediakiwi json
    //   return new Promise((resolve, reject) => {
    //     axios.get(apiPath)
    //       .then((response) => resolve(response.data))
    //       .catch((err) => {
    //         alert("Something went wrong while fetching the page");
    //         reject(err);
    //       });
    //   });
    // },
    // postMediakiwiAPI(context, request) {
    //   return new Promise((resolve, reject) => {
    //     axios.post(request.url, request)
    //       .then((response) => resolve(response.data))
    //       .catch((err) => {
    //         alert("Something went wrong while fetching the page");
    //         reject(err);
    //       });
    //   });
    // },
    // deleteMediakiwiAPI(context, request) {
    //   return new Promise((resolve, reject) => {
    //     axios.delete(request.url, request)
    //       .then((response) => resolve(response.data))
    //       .catch((err) => {
    //         alert("Something went wrong while fetching the page");
    //         reject(err);
    //       });
    //   });
    // },
    // putMediakiwiAPI() {
    //   return new Promise((resolve, reject) => {
    //     // TODO enable REAL the web api
    //     axios.get("/fields-postback.json")
    //       .then((response) => {
    //         const responseData: MediakiwiResponseModel = response.data;
    //         // TODO Remove
    //         responseData.closeLayer = true;
    //         resolve(responseData);
    //       })
    //       .catch((err) => {
    //         alert("Something went wrong while fetching the page");
    //         reject(err);
    //       });

    //     // axios.put(request.url, request)
    //     //   .then((response) => resolve(response.data))
    //     //   .catch((err) => {
    //     //     alert("Something went wrong while fetching the page");
    //     //     reject(err);
    //     //   });
    //   });
    // },

  },
  getters: {
    rootPath: (state) => state.rootPath,
    contentLogin: (state) => state.content ? state.content.login : "",
    contentForgotten: (state) => state.content ? state.content.forgotten : "",
    contentResetPassword: (state) => state.content.reset,
    // topButtons: (state) => {
    //   return state.buttons?.filter((button) => (button.iconTarget === ButtonTargetType.topLeft || button.iconTarget === ButtonTargetType.topRight));
    // },
    // bottomButtons: (state) => {
    //   return state.buttons?.filter((button) => (button.iconTarget === ButtonTargetType.bottomLeft || button.iconTarget === ButtonTargetType.bottomRight));
    // },
    // fieldValues: (state) => {
    //   return state.fields?.map((field) => {
    //     return {
    //       title: field.title,
    //       value: field.value
    //     }
    //   });
    // },
    // views: (state) => state.views,
  },
  modules: {
    Navigation,
    Authentication,
    UI,
    Content,
  },
});
