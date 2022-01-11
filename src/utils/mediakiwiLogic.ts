import { store } from "@/store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "@vue/runtime-dom";
import MediakiwiModalWrapper from "./../components/modal/MediakiwiModalWrapper.vue";
import { ContentTypes } from "@/store/modules/Content";
import { IField, ILayerConfiguration, IMediakiwiResponse, IPostMediakiwiRequest, IContentList } from "@/models/Mediakiwi/Interfaces";

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
  putResponseToStore(response: IMediakiwiResponse) {

    // Create the page model
    // const localPage: IPage = {
    //   ...response.list
    // }
     
    if (response.list) {
      store.dispatch(ContentTypes.SET_PAGE, response.list);
    }
    
    if (response.list && response.list.grids) {
      store.dispatch(ContentTypes.SET_GRIDS, response.list?.grids);
    }
    if (response.explorer && response.explorer.items) {
      store.dispatch(ContentTypes.SET_FOLDERS, response.explorer.items);
    }
    if (response.list && response.list.resources) {
      store.dispatch(ContentTypes.SET_RESOURCES, response.list?.resources);
    }
    if (response.list && response.list.forms) {
      store.dispatch(ContentTypes.SET_FORMS, response.list?.forms);
    }
    if (response.list && response.list.forms) {
      store.dispatch(ContentTypes.SET_BUTTONS, response.list?.forms);
    }
    // if (response.list && response.list.views) {
    //   store.dispatch("setViews", response.list);
    // }
  },
  /** Creates a @type {PostMediakiwiRequestModel} from the altered data in the vuex store */
  getMediakiwiRequestForButtonActions(url: string): IPostMediakiwiRequest {
    const siteID = store.getters["navigation/currentSiteId"];
    const request: IPostMediakiwiRequest = {
      currentSiteID: siteID,
      url
    }
    return request;
  },
  /** Fill the sublist select based on the referId */
  fillSublistSelect(referId: string, fields: IField[]) {
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
  /** Open a layer with @type { ILayerConfiguration } configuration */
  openLayer(config: ILayerConfiguration) {
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
