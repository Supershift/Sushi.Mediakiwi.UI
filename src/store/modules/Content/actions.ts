import { ActionTree, ActionContext } from "vuex"
import { RootState, store } from "../../index"
import { Mutations } from "./mutations"
import { ActionTypes } from "./action-types"
import { contentAPIService } from "@/utils/api-service"
import { UITypes } from "../UI"
import { ContentState } from "./index"
import { MutationTypes } from "./mutation-types"
import { ResourceModel, Field, GetContentMediakiwiResponseModel, Grid, Form } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel"
import PageModel from "@/models/PageModel"
import { PostContentMediakiwiResponseModel } from "@/models/Mediakiwi/Response/Content/PostContentMediakiwiResponseModel"
import { PostContentMediakiwiRequestModel } from "@/models/Mediakiwi/Request/Content/PostContentMediakiwiRequestModel"
import router from "@/router"

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ContentState, RootState>, "commit">

export interface Actions {
  [ActionTypes.GET_CONTENT](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>,
  [ActionTypes.SET_CONTENT](
    { commit }: AugmentedActionContext,
    payload: GetContentMediakiwiResponseModel
  ): void,
  [ActionTypes.SET_FOLDERS](
    { commit }: AugmentedActionContext,
    payload: Field[]
  ): void,
  [ActionTypes.SET_GRIDS](
    { commit }: AugmentedActionContext,
    payload: Grid[]
  ): void,
  [ActionTypes.SET_BUTTONS](
    { commit }: AugmentedActionContext,
    payload: Form[]
  ): void,
  [ActionTypes.SET_PAGE](
    { commit }: AugmentedActionContext,
    payload: PageModel
  ): void,
  [ActionTypes.SET_FORMS](
    { commit }: AugmentedActionContext,
    payload: Field[]
  ): void,
  [ActionTypes.SET_RESOURCES](
    { commit }: AugmentedActionContext,
    payload: ResourceModel[]
  ): void,
  [ActionTypes.POST_CONTENT](
    { commit }: AugmentedActionContext,
    payload: PostContentMediakiwiRequestModel,
  ): Promise<void>,
  [ActionTypes.SET_POST_CONTENT](
    { commit }: AugmentedActionContext,
    payload: PostContentMediakiwiResponseModel
  ): void,
}

export const actions: ActionTree<ContentState, RootState> & Actions = {
  [ActionTypes.GET_CONTENT]({ commit }, payload) {
      commit(MutationTypes.SET_CONTENT, null);
      const siteID = store.getters.currentSiteID;
      const request = {
        data: { CurrentSiteID: siteID },
        url: payload
      };
      store.dispatch(UITypes.SET_LOADING, true);
      return contentAPIService.getContentMediakiwiAPI(request.data, request.url)
      .then((response) => {
        commit(MutationTypes.SET_CONTENT, response);
      })
      .finally(() => {
        store.dispatch(UITypes.SET_LOADING, false);
      });
  },
  [ActionTypes.POST_CONTENT]({ commit }, payload) {
    const siteID = store.getters["navigation/currentSiteId"];
    const request = {
      data: {...payload, CurrentSiteId: siteID },
      url: router.currentRoute.value.fullPath,
    };
    store.dispatch(UITypes.SET_LOADING, true);
    return contentAPIService.postContentMediakiwiAPI(request.data, request.url)
    .then((response) => {
      commit(MutationTypes.SET_POST_CONTENT, response);
    })
    .finally(() => {
      store.dispatch(UITypes.SET_LOADING, false);
    });
  },
  [ActionTypes.SET_CONTENT]({ commit }, payload) {
    commit(MutationTypes.SET_CONTENT, payload);
  },
  [ActionTypes.SET_GRIDS]({ commit }, payload) {
    commit(MutationTypes.SET_GRIDS, payload);
  },
  [ActionTypes.SET_FOLDERS]({ commit }, payload) {
    commit(MutationTypes.SET_FOLDERS, payload);
  },
  [ActionTypes.SET_BUTTONS]({ commit }, payload) {
    commit(MutationTypes.SET_BUTTONS, payload);
  },
  [ActionTypes.SET_PAGE]({ commit }, payload) {
    commit(MutationTypes.SET_PAGE, payload);
  },
  [ActionTypes.SET_FORMS]({ commit }, payload) {
    commit(MutationTypes.SET_FORMS, payload);
  },
  [ActionTypes.SET_RESOURCES]({ commit }, payload) {
    commit(MutationTypes.SET_RESOURCES, payload);
  },
  [ActionTypes.SET_POST_CONTENT]({ commit }, payload) {
    commit(MutationTypes.SET_POST_CONTENT, payload);
  },
}