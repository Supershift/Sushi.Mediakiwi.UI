import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { store } from "../../index"
import { NavigationState } from "./index"
import { ContentTypes } from "../Content"
import {  ISite, IGetContentMediakiwiRequest, IGetNavigationResponse } from "@/models/Mediakiwi/Interfaces";

export type Mutations<S = NavigationState> = {
  [MutationTypes.SET_TOP_NAVIGATION](state: S, payload: IGetNavigationResponse): void,
  [MutationTypes.SET_SIDE_NAVIGATION](state: S, payload: IGetNavigationResponse): void,
  [MutationTypes.SET_SITE](state: S, payload: number): void,
  [MutationTypes.SET_SITES](state: S, payload: ISite[]): void,
}

export const mutations: MutationTree<NavigationState> & Mutations = {
    [MutationTypes.SET_TOP_NAVIGATION](state: NavigationState, payload: IGetNavigationResponse): void {
      if (payload) {
        state.topNavigationItems = payload.items;
      }
    },
    [MutationTypes.SET_SIDE_NAVIGATION](state: NavigationState, payload: IGetNavigationResponse): void {
      if (payload) {
        state.sideNavigationItems = payload.items;
      }
    },
    [MutationTypes.SET_SITE](state: NavigationState, payload: number): void {
      if (payload) {
        state.currentSiteID = payload;
        store.dispatch(ContentTypes.GET_CONTENT, { currentSiteID: payload } as IGetContentMediakiwiRequest);
      }
    },
    [MutationTypes.SET_SITES](state: NavigationState, payload: ISite[]): void {
      if (payload) {
        state.availableSites = payload
      }
    },
}