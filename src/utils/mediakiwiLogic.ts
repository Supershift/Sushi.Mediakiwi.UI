import PostMediakiwiRequestModel from "@/models/Mediakiwi/Request/postMediakiwiRequestModel";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import { store } from "@/store";
import PageModel from "@/store/modules/PageModel";

export const mediakiwiLogic = {
  /** Binds the data from the Mediakiwi Response to the vuex store  */
  putResponseToStore(response: MediakiwiResponseModel) {
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
    store.dispatch("setGrids", response.grids);
    store.dispatch("setFolders", response.folders);
    store.dispatch("setResources", response.resources);
    store.dispatch("setFields", response.fields);
    store.dispatch("setButtons", response.buttons);
  },
  /** Creates a @type {PostMediakiwiRequestModel} from the altered data in the vuex store */
  getMediakiwiModelFromStore() {
    const request: PostMediakiwiRequestModel = {
      fields: store.state.fields ? store.state.fields : [],
      channel: store.state.channel,
      url: ""
    }

    return request;
  }
}
