import MediakiwiModel from "@/models/Mediakiwi/MediakiwiModel";
import { store } from "@/store";
import PageModel from "@/store/modules/PageModel";

export const api = {
  fetchMediakiwiAPI(url: string) {
    const request = {
      channel: store.getters.channel,
      url
    };

    return new Promise((resolve, reject) => {
      store.dispatch("getMediakiwiAPI", request).then((response: MediakiwiModel) => {
        if (response) {
          // Handle response
          store.dispatch("setChannel", response.currentSiteID);

          // Create the page model
          const pageData: PageModel = {
            title: response.listTitle ? response.listTitle : "",
            description: response.listDescription ? response.listDescription : "",
            settingsUrl: response.listSettingsUrl
          }
          store.dispatch("setPage", pageData);
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
      }).catch((error: unknown) => {
        // reject the response
        store.dispatch("toggleMediakiwiLoading");
        reject(error);
      });
    });
  },
};
