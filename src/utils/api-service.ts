import { ButtonRequestMethodType } from "@/models/Mediakiwi/ButtonRequestMethodType";
import AuthenticateRequestModel from "@/models/Mediakiwi/Request/AuthenticateRequestModel";
import GetMediakiwiRequestModel from "@/models/Mediakiwi/Request/getMediakiwiRequestModel";
import { GetNavigationRequestModel } from "@/models/Mediakiwi/Request/GetNavigationRequestModel";
import PostMediakiwiRequestModel from "@/models/Mediakiwi/Request/postMediakiwiRequestModel";
import { ResetPasswordRequestModel } from "@/models/Mediakiwi/Request/ResetPasswordRequestModel";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import router from "@/router";
import { store } from "@/store";
import axios from "axios";
import { mediakiwiLogic } from "./mediakiwiLogic";
import { apiUrlBuilder, NotificationActionTypes } from "./utils";

export const serverCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export const apiService = {
  signInMediakiwiAPI(request: AuthenticateRequestModel) {
    const requestBody: AuthenticateRequestModel = {
      ...request,
      apiKey: store.getters.apiKey,
    };
    return new Promise((resolve, reject) => {
      axios.post(apiUrlBuilder("authentication/Login"), requestBody, { withCredentials: true })
        .then((response) => {
          if (response.status === serverCodes.OK) {   
            store.dispatch("toggleNotification", { message: "Signed In!", actionType: NotificationActionTypes.SUCCESS, actionText: "OK" });         
            store.dispatch("toggleAuthenticated", true);
            store.dispatch("setProfileInfomation", response.data);
          }
          resolve(response);
        })
        .catch((err) => {
          if (err.response.status === serverCodes.UNAUTHORIZED ||
            err.response.status === serverCodes.BAD_REQUEST ||
            err.response.status === serverCodes.FORBIDDEN) {
            store.dispatch("toggleNotification", { message: "Invalid credentials!", actionType: NotificationActionTypes.ALERT, actionText: "OK", hasAction: true });
          } else {
              store.dispatch("toggleNotification", { message: "Something went wrong!", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          }
          reject(err);
        })
    });
  },
  signOutMediakiwiAPI() {
    const config = {
      headers: { "original-url": "/" },
      withCredentials: true
    };
    return new Promise((resolve, reject) => {
      axios.post(apiUrlBuilder("authentication/LogOut"), null, config)
        .then((response) => {
          if (response.status === serverCodes.OK) {
            store.dispatch("toggleAuthenticated", false);
          }
          resolve(response)
        })
        .catch((err) => {
          if (err.response.status === serverCodes.UNAUTHORIZED || 
            err.response.status === serverCodes.BAD_REQUEST ||
            err.response.status === serverCodes.FORBIDDEN) {
            store.dispatch("toggleNotification", { message: "Invalid signout token! Please try again...", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
          } else {
            store.dispatch("toggleNotification", { message: "Something went wrong! Please try again...", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          }
          reject(err);
        })
    })
  },
  resetPasswordMediakiwiAPI(request: ResetPasswordRequestModel) {
    const requestBody: ResetPasswordRequestModel = {
      ...request,
    };
    return new Promise((resolve, reject) => {
      axios.post(apiUrlBuilder("authentication/ResetPassword"), requestBody, { withCredentials: true })
        .then((response) => {
          if (response.status === serverCodes.OK) {
            store.dispatch("toggleNotification", { message: "Your password has been reset successfully", actionType: NotificationActionTypes.SUCCESS, actionText: "OK" });
            alert("Password reset successful!");
          }
          resolve(response)
        })
        .catch((err) => {
          if (err.response.status === serverCodes.UNAUTHORIZED || 
            err.response.status === serverCodes.BAD_REQUEST ||
            err.response.status === serverCodes.FORBIDDEN) {
            store.dispatch("toggleNotification", { message: "Invalid credentials!", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
          } else {
            store.dispatch("toggleNotification", { message: "Something went wrong! Please try again...", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
          }
          reject(err);
        })
    })
  },
  getTopNavigationMediakiwiAPI(request: GetNavigationRequestModel, url: string) {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": "/" } 
    };
    return new Promise((resolve, reject) => {
      axios.get(apiUrlBuilder("navigation/GetTopnavigation"), config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          store.dispatch("setTopNavigation", response.data);
        }
        resolve(response);
      })
      .catch((err) => {
        if (err.response.status === serverCodes.UNAUTHORIZED || 
          err.response.status === serverCodes.BAD_REQUEST ||
          err.response.status === serverCodes.FORBIDDEN) {
          store.dispatch("toggleNotification", { message: "Invalid credentials! Top Navigation", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
        } else {
          store.dispatch("toggleNotification", { message: "Something went wrong! Please try again...", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        }
        reject(err)
      })
      .finally(() => {
        store.dispatch("toggleMediakiwiLoading");
      });
    });
  },
  getSideNavigationMediakiwiAPI(request: GetNavigationRequestModel, url: string) {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": "/" }
    };
    return new Promise((resolve, reject) => {
      axios.get(apiUrlBuilder("navigation/GetSidenavigation"), config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          store.dispatch("setSideNavigation", response.data);
        }
        resolve(response);
      })
      .catch((err) => {
        if (err.response.status === serverCodes.UNAUTHORIZED ||
          err.response.status === serverCodes.BAD_REQUEST ||
          err.response.status === serverCodes.FORBIDDEN) {
          store.dispatch("toggleNotification", { message: "Invalid credentials! Side Navigation", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
        } else {
          store.dispatch("toggleNotification", { message: "Something went wrong! Please try again...", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
        }
        reject(err);
      })
    });
  },
  fetchMediakiwiAPI(url: string) {
    const requestBody: GetMediakiwiRequestModel = {
      channel: store.getters.channel,
      url
    };

    return new Promise((resolve, reject) => {
      // Start the loader
      store.dispatch("toggleMediakiwiLoading");

      store.dispatch("getMediakiwiAPI", requestBody).then((response: MediakiwiResponseModel) => {
        if (response) {
          // Handle response
          mediakiwiLogic.putResponseToStore(response)

          // finally resolve the response
          store.dispatch("toggleMediakiwiLoading");
          resolve(response)
        }
        else {
          store.dispatch("toggleMediakiwiLoading");
          reject(response);
        }
      }).catch((error: unknown) => {
        // reject the response
        store.dispatch("toggleMediakiwiLoading");
        reject(error);
      });
    });
  },
  postMediakiwiAPI(request: PostMediakiwiRequestModel, requestMethod: ButtonRequestMethodType = ButtonRequestMethodType.post) {
    request.url = router.currentRoute.value.fullPath

    // determine the request method
    let method = "";
    switch (requestMethod) {
      case ButtonRequestMethodType.delete:
        method = "deleteMediakiwiAPI";
        break;
      case ButtonRequestMethodType.put:
        method = "putMediakiwiAPI";
        break;
      default:
        method = "postMediakiwiAPI";
        break;
    }

    return new Promise((resolve, reject) => {
      // Start the loader
      store.dispatch("toggleMediakiwiLoading");

      // call the POST method
      const referId = <string>router.currentRoute.value.query.referid;
      store.dispatch(method, request).then((response: MediakiwiResponseModel) => {
        if (response) {
          if (response.closeLayer && referId) {
            // trigger the mediakiwi logic on the parent window
            window.parent.mediakiwiLogic.fillSublistSelect(referId, response.fields);
            window.parent.mediakiwiLogic.closeLayer();
          }

          // Handle response
          mediakiwiLogic.putResponseToStore(response)

          // finally resolve the response
          store.dispatch("toggleMediakiwiLoading");
          resolve(response)
        }
        else {
          store.dispatch("toggleMediakiwiLoading");
          reject(response);
        }
      }).catch((error: unknown) => {
        // reject the response
        store.dispatch("toggleMediakiwiLoading");
        reject(error);
      });
    });
  },
  deleteMediakiwiAPI(request: PostMediakiwiRequestModel) {
    return this.postMediakiwiAPI(request, ButtonRequestMethodType.delete);
  },
  putMediakiwiAPI(request: PostMediakiwiRequestModel) {
    return this.postMediakiwiAPI(request, ButtonRequestMethodType.put);
  }
};
