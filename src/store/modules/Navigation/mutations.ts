import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { store } from "../../index"
import { GetNavigationResponseModel } from "@/models/Mediakiwi/Response/Navigation/GetNavigationResponseModel"
import { NavigationState } from "./index"
import { ContentTypes } from "../Content"
import { GetContentMediakiwiRequestModel } from "@/models/Mediakiwi/Request/Content/GetContentMediakiwiRequestModel"
import {  SiteItem } from "@/models/Mediakiwi/Response/Navigation/GetSitesResponseModel"

export type Mutations<S = NavigationState> = {
  [MutationTypes.SET_TOP_NAVIGATION](state: S, payload: GetNavigationResponseModel): void,
  [MutationTypes.SET_SIDE_NAVIGATION](state: S, payload: GetNavigationResponseModel): void,
  [MutationTypes.SET_SITE](state: S, payload: number): void,
  [MutationTypes.SET_SITES](state: S, payload: SiteItem[]): void,
}

export const mutations: MutationTree<NavigationState> & Mutations = {
    [MutationTypes.SET_TOP_NAVIGATION](state: NavigationState, payload: GetNavigationResponseModel): void {
      if (payload) {
        state.topNavigationItems = payload.items;
      }
    },
    [MutationTypes.SET_SIDE_NAVIGATION](state: NavigationState, payload: GetNavigationResponseModel): void {
      if (payload) {
        state.sideNavigationItems = payload.items;
      }
    },
    [MutationTypes.SET_SITE](state: NavigationState, payload: number): void {
      if (payload) {
        state.currentSiteID = payload;
        store.dispatch(ContentTypes.GET_CONTENT, { CurrentSiteID: payload } as GetContentMediakiwiRequestModel);
      }
    },
    [MutationTypes.SET_SITES](state: NavigationState, payload: SiteItem[]): void {
      if (payload) {
        state.availableSites = payload
      }
    },
}