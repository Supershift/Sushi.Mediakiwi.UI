import FieldModel from "@/models/Mediakiwi/FieldModel";
import LayerConfigurationModel from "@/models/Mediakiwi/LayerConfigurationModel";
import PostMediakiwiRequestModel from "@/models/Mediakiwi/Request/postMediakiwiRequestModel";
import MediakiwiResponseModel from "@/models/Mediakiwi/Response/MediakiwiResponseModel";
import { store } from "@/store";
import PageModel from "@/store/modules/PageModel";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "@vue/runtime-dom";
import MediakiwiModalWrapper from "./../components/modal/MediakiwiModalWrapper.vue";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { mediakiwiLogic: any; modalApp: any; modalAppMounted: any; }
}

const modalWrapperId = "mediakiwi-modal-wrapper"

export const mediakiwiLogic = {
  /** Bind the logic to the window for access outide vue */
  bind() {
    window.mediakiwiLogic = window.mediakiwiLogic || mediakiwiLogic;
  },
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
    store.dispatch("setViews", response.views);
  },
  /** Creates a @type {PostMediakiwiRequestModel} from the altered data in the vuex store */
  getMediakiwiModelFromStore(referId: string) {
    const request: PostMediakiwiRequestModel = {
      fields: store.state.fields ? store.state.fields : [],
      channel: store.state.channel,
      url: "",
      referId
    }

    return request;
  },
  /** Fill the sublist select based on the referId */
  fillSublistSelect(referId: string, fields: FieldModel[]) {
    const field = fields.find((field) => field.propertyName === referId);

    const referElement = document.querySelector(`#${referId}`)

    if (field && referElement) {
      // const linkElement = document.querySelector(`#${referId} .openlayer`);
      const hiddenInput = <HTMLInputElement>document.querySelector(`#${referId}_hidden`);

      if (hiddenInput) {
        hiddenInput.value = JSON.stringify(field.value);
      }
    }
  },
  /** Open a layer with @type { LayerConfigurationModel } configuration */
  openLayer(config: LayerConfigurationModel) {
    const modalApp = createApp(MediakiwiModalWrapper, { config });
    // eslint-disable-next-line vue/component-definition-name-casing
    modalApp.component("fa", FontAwesomeIcon)
    // inserting to dom
    const wrapper = document.createElement("div");
    wrapper.id = modalWrapperId;
    document.body.appendChild(wrapper);
    window.modalApp = window.modalApp || modalApp;
    window.modalAppMounted = window.modalAppMounted || modalApp.mount(wrapper);
  },
  /** Close and destroy the modal app  */
  closeLayer(unmount?: boolean) {
    if (window.modalApp) {
      const wrapper = document.querySelector(`#${modalWrapperId}`);
      if (wrapper) {
        // eslint-disable-next-line no-console
        if (window.modalAppMounted) {
          window.modalAppMounted.softClose();
          window.modalAppMounted = null;
        }
        if (unmount && window.modalApp) {
          window.modalApp.unmount(wrapper);
          window.modalApp = null;
          wrapper.remove();
        }
      }
    }
  }
}
