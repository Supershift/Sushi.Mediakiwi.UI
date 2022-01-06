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
  description: string,
  content: BaseContentModel,
  channel: number,
}

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

// define the Storage
const vuexLocal = window.sessionStorage;

// define security
const ls = new SecureLS({ 
  isCompression: false,
  encodingType: "aes"
 });

export const store = createStore<RootState>({
  plugins: process.env.NODE_ENV === "development" ? [
    createLogger(),
    createPersistedState({
      storage: vuexLocal,
      paths:["Authentication","UI", "Navigation"]
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
    rootPath: `${process.env.VUE_APP_BASE_DOMAIN}` ? `${process.env.VUE_APP_BASE_DOMAIN}` : "/",
    currentSiteID: 2,
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
    clearCache(state) {
      ls.clear()
      state.currentSiteID = 2
    }
  },
  actions: {
    clearCache(context) {
      context.commit("clearCache");
    }
  },
  getters: {
    rootPath: (state) => state.rootPath,
    contentLogin: (state) => state.content ? state.content.login : "",
    contentForgotten: (state) => state.content ? state.content.forgotten : "",
    contentResetPassword: (state) => state.content.reset,
    currentSiteID: (state) => state.currentSiteID,
  },
  modules: {
    Navigation,
    Authentication,
    UI,
    Content,
  },
});
