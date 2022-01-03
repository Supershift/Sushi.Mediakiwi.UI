import { ActionTree, ActionContext } from "vuex"
import { RootState, store } from "../../index"
import { Mutations } from "./mutations"
import { ActionTypes } from "./action-types"
import { navigationAPIService } from "@/utils/api-service"
import { UITypes } from "../UI"
import { NavigationState } from "./index"
import { MutationTypes } from "./mutation-types"

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<NavigationState, RootState>, "commit">

export interface Actions {
  [ActionTypes.GET_TOP_NAVIGATION](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>,
  [ActionTypes.GET_SIDE_NAVIGATION](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>,
  [ActionTypes.GET_SITES](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>,
  [ActionTypes.SET_SITE](
    { commit }: AugmentedActionContext,
    payload: number
  ): void,
  
}

export const actions: ActionTree<NavigationState, RootState> & Actions = {
  [ActionTypes.GET_TOP_NAVIGATION]({ commit }, payload) {
      const siteID = store.state.currentSiteID;
      const request = {
        data: { CurrentSiteID: siteID },
        url: payload
      };
      store.dispatch(UITypes.SET_LOADING, true);
      return navigationAPIService.getTopNavigationMediakiwiAPI(request.data, request.url)
      .then((response) => {
       commit(MutationTypes.SET_TOP_NAVIGATION, response);
      })
      .finally(() => {
        store.dispatch(UITypes.SET_LOADING, false);
      });
  },
  [ActionTypes.GET_SIDE_NAVIGATION]({ commit  }, payload) {
    const siteID = store.state.currentSiteID;
    const request = {
      data: { CurrentSiteID: siteID },
      url: payload
    };
    store.dispatch(UITypes.SET_LOADING, true);
    return navigationAPIService.getSideNavigationMediakiwiAPI(request.data, request.url)
    .then((response) => {
      commit(MutationTypes.SET_SIDE_NAVIGATION, response);
    })
    .finally(() => {
      store.dispatch(UITypes.SET_LOADING, false);
    });
  },
  [ActionTypes.GET_SITES]({ commit }, payload) {
    const siteID = store.state.currentSiteID;
    const request = {
      data: { CurrentSiteID: siteID },
      url: payload
    };
    store.dispatch(UITypes.SET_LOADING, true);
    return navigationAPIService.getSitesMediakiwiAPI(request.data, request.url)
    .then((response) => {
      commit(MutationTypes.SET_SITES, response.items);
    })
    .finally(() => {
      store.dispatch(UITypes.SET_LOADING, false);
    });
  },
  [ActionTypes.SET_TOP_NAVIGATION]({ commit }, payload) {
    commit(MutationTypes.SET_TOP_NAVIGATION, payload);
  },
  [ActionTypes.SET_SIDE_NAVIGATION]({ commit }, payload) {
    commit(MutationTypes.SET_SIDE_NAVIGATION, payload);
  },
  [ActionTypes.SET_SITE]({ commit }, payload) {
    commit(MutationTypes.SET_SITE, payload);
  },
}