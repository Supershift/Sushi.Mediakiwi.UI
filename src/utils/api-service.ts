import AuthenticateRequestModel from "@/models/Mediakiwi/Request/Authentication/AuthenticateRequestModel";
import { GetContentMediakiwiRequestModel } from "@/models/Mediakiwi/Request/Content/GetContentMediakiwiRequestModel";
import { GetNavigationRequestModel } from "@/models/Mediakiwi/Request/Navigation/GetNavigationRequestModel";
import { PostContentMediakiwiRequestModel } from "@/models/Mediakiwi/Request/Content/PostContentMediakiwiRequestModel";
import { ResetPasswordRequestModel } from "@/models/Mediakiwi/Request/Authentication/ResetPasswordRequestModel";
import { store } from "@/store";
import axios from "axios";
import { NotificationActionTypes } from "./utils";
import { AuthenticationTypes } from "@/store/modules/Authentication";
import { UITypes } from "@/store/modules/UI";
import { GetContentMediakiwiResponseModel } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import { GetNavigationResponseModel } from "@/models/Mediakiwi/Response/Navigation/GetNavigationResponseModel";
import { GetSitesResponseModel } from "@/models/Mediakiwi/Response/Navigation/GetSitesResponseModel";
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

const CancelToken = axios.CancelToken;
const cancelSource = CancelToken.source();

// Interceptor for handling calls to the API
const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  headers: {
    "Content-Type": "application/json",
  },
  cancelToken: cancelSource.token
});

axiosInstance.interceptors.response.use(
  function (response) { 
    return response;
}, function (err) {
  /* eslint no-console:0*/
  console.log(err);
  
  if (err && err.response && err.response.status !== serverCodes.OK) {
    store.dispatch("clearCache");
    router.push("/login");
    store.dispatch(UITypes.SET_NOTIFICATION, { message: "Your Session might have expired, please login to continue.", actionType: NotificationActionTypes.ALERT, actionText: "OK" });
    return Promise.reject(err)
  } else {
    return Promise.reject(err);
  }
})

export const authenticationAPIService = {
  // Authentication
  signInMediakiwiAPI(request: AuthenticateRequestModel) {
    const requestBody: AuthenticateRequestModel = {
      ...request,
      apiKey: store.getters["Authentication/apiKey"],
    };
    return new Promise((resolve, reject) => {
      axiosInstance.post("authentication/Login", requestBody, { withCredentials: true })
        .then((response) => {
          if (response.status === serverCodes.OK) {   
            store.dispatch(UITypes.SET_NOTIFICATION, { message: "Signed In!", actionType: NotificationActionTypes.SUCCESS, actionText: "OK" });         
            store.dispatch(AuthenticationTypes.SET_PROFILE, response.data);
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
    }).catch((thrown) => {
      if (axios.isCancel(thrown)) {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: "Request Canceled", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
      }
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
          if (response.status === serverCodes.OK) {
            // store.dispatch(AuthenticationTypes.TOGGLE_LOGIN, false);
          }
          resolve(response)
        })
        .catch((err) => {

          reject(err);
      })
    }).catch((thrown) => {
      if (axios.isCancel(thrown)) {
        store.dispatch(UITypes.SET_NOTIFICATION, { message: "Request Canceled", actionType: NotificationActionTypes.ERROR, actionText: "OK" });
      }
    });
  },
  resetPasswordMediakiwiAPI(request: ResetPasswordRequestModel) {
    const requestBody: ResetPasswordRequestModel = {
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
          reject(err);
        })
    })
  },
}
export const navigationAPIService = {
  // Navigation
  getTopNavigationMediakiwiAPI(request: GetNavigationRequestModel, url: string): Promise<GetNavigationResponseModel> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url } 
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<GetNavigationResponseModel>("navigation/GetTopnavigation", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {

        reject(err)
      })
    });
  },
  getSideNavigationMediakiwiAPI(request: GetNavigationRequestModel, url: string): Promise<GetNavigationResponseModel> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<GetNavigationResponseModel>("navigation/GetSidenavigation", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  getSitesMediakiwiAPI(request: GetNavigationRequestModel, url: string): Promise<GetSitesResponseModel> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<GetSitesResponseModel>("navigation/GetSites", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {

        reject(err);
      })
    });
  },
}
export const contentAPIService = {
  // Content 
  getContentMediakiwiAPI(request: GetContentMediakiwiRequestModel, url: string) : Promise<GetContentMediakiwiResponseModel> {
    const config = {
      params: request,
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.get<GetContentMediakiwiResponseModel>("content/GetContent", config)
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
  postContentMediakiwiAPI(request: PostContentMediakiwiRequestModel, url: string) {
    const config = {
      withCredentials: true,
      headers: { "original-url": url }
    };
    return new Promise((resolve, reject) => {
      axiosInstance.post("content/PostContent", config)
      .then((response) => {
        if (response.status === serverCodes.OK) {
          resolve(response.data);
        }
      })
      .catch((err) => {

        reject(err);
      })
    });
  },
}
// export const apiService = {
//   // Old API
//   fetchMediakiwiAPI(url: string) {
//     const requestBody: GetMediakiwiRequestModel = {
//       channel: store.getters.channel,
//       url
//     };

//     return new Promise((resolve, reject) => {
//       // Start the loader
//       store.dispatch(UITypes.SET_LOADING, true);

//       store.dispatch("getMediakiwiAPI", requestBody).then((response: MediakiwiResponseModel) => {
//         if (response) {
//           // Handle response
//           mediakiwiLogic.putResponseToStore(response)

//           // finally resolve the response
//           store.dispatch(UITypes.SET_LOADING, false);
//           resolve(response)
//         }
//         else {
//           store.dispatch(UITypes.SET_LOADING, false);
//           reject(response);
//         }
//       }).catch((error: unknown) => {
//         // reject the response
//         store.dispatch(UITypes.SET_LOADING, false);
//         reject(error);
//       });
//     });
//   },
//   postMediakiwiAPI(request: PostMediakiwiRequestModel, requestMethod: ButtonRequestMethodType = ButtonRequestMethodType.post) {
//     request.url = router.currentRoute.value.fullPath

//     // determine the request method
//     let method = "";
//     switch (requestMethod) {
//       case ButtonRequestMethodType.delete:
//         method = "deleteMediakiwiAPI";
//         break;
//       case ButtonRequestMethodType.put:
//         method = "putMediakiwiAPI";
//         break;
//       default:
//         method = "postMediakiwiAPI";
//         break;
//     }

//     return new Promise((resolve, reject) => {
//       // Start the loader
//       store.dispatch(UITypes.SET_LOADING, true);

//       // call the POST method
//       const referId = <string>router.currentRoute.value.query.referid;
//       store.dispatch(method, request).then((response: MediakiwiResponseModel) => {
//         if (response) {
//           if (response.closeLayer && referId) {
//             // trigger the mediakiwi logic on the parent window
//             window.parent.mediakiwiLogic.fillSublistSelect(referId, response.fields);
//             window.parent.mediakiwiLogic.closeLayer();
//           }

//           // Handle response
//           mediakiwiLogic.putResponseToStore(response)

//           // finally resolve the response
//           store.dispatch(UITypes.SET_LOADING, false);
//           resolve(response)
//         }
//         else {
//           store.dispatch(UITypes.SET_LOADING, false);
//           reject(response);
//         }
//       }).catch((error: unknown) => {
//         // reject the response
//         store.dispatch(UITypes.SET_LOADING, false);
//         reject(error);
//       });
//     });
//   },
//   deleteMediakiwiAPI(request: PostMediakiwiRequestModel) {
//     return this.postMediakiwiAPI(request, ButtonRequestMethodType.delete);
//   },
//   putMediakiwiAPI(request: PostMediakiwiRequestModel) {
//     return this.postMediakiwiAPI(request, ButtonRequestMethodType.put);
//   }
// };
