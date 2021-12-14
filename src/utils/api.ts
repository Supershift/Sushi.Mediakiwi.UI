import { ButtonRequestMethodType } from "@/models/Mediakiwi/ButtonRequestMethodType";
import GetMediakiwiRequestModel from "@/models/Mediakiwi/Request/getMediakiwiRequestModel";
import PostMediakiwiRequestModel from "@/models/Mediakiwi/Request/postMediakiwiRequestModel";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import router from "@/router";
import { store } from "@/store";
import { mediakiwiLogic } from "./mediakiwiLogic";

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
export const api = {
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
