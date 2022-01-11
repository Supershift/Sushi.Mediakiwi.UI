import { store } from "@/store";
import axios from "axios";
import { NotificationActionTypes } from "./utils";
import { AuthenticationTypes } from "@/store/modules/Authentication";
import { UITypes } from "@/store/modules/UI";
import { IGetContentMediakiwiResponse, IGetNavigationResponse, IGetSitesResponse, IPostContentMediakiwiResponse, IAuthenticateRequest, IResetPasswordRequest, IPostContentMediakiwiRequest, IGetNavigationRequest, IGetContentMediakiwiRequest } from "@/models/Mediakiwi/Interfaces";
import router from "@/router";

export const serverCodes = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

axios.interceptors.response.use(
  function (response) { 
    return response;
}, function (err) {
    store.dispatch("clearCache");
    router.push("/login");
    return Promise.reject(err)
});

// Interceptor for handling calls to the API
const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  headers: {
    "Content-Type": "application/json",
  }
});

export const authenticationAPIService = {
  // Authentication
  signInMediakiwiAPI(request: IAuthenticateRequest) {
    const requestBody: IAuthenticateRequest = {
      ...request,
      apiKey: store.getters["Authentication/apiKey"],
    };
    return new Promise((resolve, reject) => {
      axiosInstance.post("authentication/Login", requestBody, { withCredentials: true })
        .then((response) => {
          if (response.status === serverCodes.OK) {   
            store.dispatch(UITypes.SET_NOTIFICATION, { message: "Signed In!", actionType: NotificationActionTypes.SUCCESS, actionText: "OK" });         
            store.dispatch(AuthenticationTypes.SET_PROFILE, response.data);
            resolve(response);
          }
        })
        .catch((err) => {
          store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response?.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          reject(err);
        })
    });
  },
  signOutMediakiwiAPI(url: string) {
    const config = {
      headers: { "original-url": url },
      withCredentials: true
    };
    return new Promise((resolve, reject) => {
      axiosInstance.post("authentication/LogOut", null, config)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          reject(err);
      })
    });
  },
  resetPasswordMediakiwiAPI(request: IResetPasswordRequest) {
    const requestBody: IResetPasswordRequest = {
      ...request,
    };
    return new Promise((resolve, reject) => {
      axiosInstance.post("authentication/ResetPassword", requestBody)
        .then((response) => {
          if (response.status === serverCodes.OK) {
            store.dispatch(UITypes.SET_NOTIFICATION, { message: "Your password has been reset successfully", actionType: NotificationActionTypes.SUCCESS, actionText: "OK" });
          }
          resolve(response)
        })
        .catch((err) => {
          store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          reject(err);
        })
    })
  },
}
export const navigationAPIService = {
  // Navigation
  getTopNavigationMediakiwiAPI(request: IGetNavigationRequest, url: string): Promise<IGetNavigationResponse> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url } 
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<IGetNavigationResponse>("navigation/GetTopnavigation", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response?.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        reject(err)
      })
    });
  },
  getSideNavigationMediakiwiAPI(request: IGetNavigationRequest, url: string): Promise<IGetNavigationResponse> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<IGetNavigationResponse>("navigation/GetSidenavigation", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response?.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        reject(err);
      })
    });
  },
  getSitesMediakiwiAPI(request: IGetNavigationRequest, url: string): Promise<IGetSitesResponse> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<IGetSitesResponse>("navigation/GetSites", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response?.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        reject(err);
      })
    });
  },
}
export const contentAPIService = {
  // Content 
  getContentMediakiwiAPI(request: IGetContentMediakiwiRequest, url: string) : Promise<IGetContentMediakiwiResponse> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<IGetContentMediakiwiResponse>("content/GetContent", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        } 
      })
      .catch((err) => {        
        store.dispatch(UITypes.SET_NOTIFICATION, { message: "Something went wrong", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
        reject(err);
      })
    });
  },
  postContentMediakiwiAPI(request: IPostContentMediakiwiRequest, url: string): Promise<IPostContentMediakiwiResponse> {
    const config = {
      withCredentials: true,
      headers: { 
        "original-url": url,
      }
    };
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axiosInstance.post<any>("content/PostContent", request, config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: err?.response?.data.title, actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        reject(err);
      })
    });
  },
}
