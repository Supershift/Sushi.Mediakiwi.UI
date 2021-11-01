import MediakiwiModel from "@/models/Mediakiwi/MediakiwiModel";
import store from "../store/index";

export const api = {
  fetchMediakiwiAPI(listID: string, itemID: string, queryString: string) {
    const request = {
      queryString,
      channel: store.getters.channel,
      listID,
      itemID,
    };
    return store.dispatch("getMediakiwiAPI", request);
  },
  fetchMediakiwiAPIByUrl(url: string) {
    const request = {
      channel: store.getters.channel,
      url
    };

    return new Promise((resolve, reject) => {
      store.dispatch("getMediakiwiAPIByUrl", request).then((response: MediakiwiModel) => {
        if (response) {
          // Handle response
          store.dispatch("setChannel", response.currentSiteID);
          store.dispatch("setProfileInfomation", response.profile);
          store.dispatch("setTopNavigation", response.topNavigation);
          store.dispatch("setSideNavigation", response.sideNavigation);

          // finally resolve the response
          store.dispatch("toggleMediakiwiLoading");
          resolve(response)
        }
        else {
          store.dispatch("toggleMediakiwiLoading");
          reject(response);
        }
      }).catch((error) => {
        // reject the response
        store.dispatch("toggleMediakiwiLoading");
        reject(error);
      });
    });
  },
};
