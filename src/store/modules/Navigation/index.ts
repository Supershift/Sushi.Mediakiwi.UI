import {NavigationItemModel} from "@/models/Mediakiwi/NavigationModel";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface NavigationState {
  topNavigationItems: NavigationItemModel[];
  sideNavigationItems: NavigationItemModel[],
  currentSiteID: number;
}

export enum NavigationTypes {
  SET_TOP_NAVIGATION = "Navigation/SET_TOP_NAVIGATION",
  SET_SIDE_NAVIGATION = "Navigation/SET_SIDE_NAVIGATION",
  SET_SITE = "Navigation/SET_SITE",
  GET_TOP_NAVIGATION = "Navigation/GET_TOP_NAVIGATION",
  GET_SIDE_NAVIGATION = "Navigation/GET_SIDE_NAVIGATION",
  GET_SITES = "Navigation/GET_SITES",
}

export const Navigation: Module<NavigationState, RootState> = {
    namespaced: true,
    state: (): NavigationState => ({
      topNavigationItems: Array<NavigationItemModel>(),
      sideNavigationItems: Array<NavigationItemModel>(),
      currentSiteID: 2,
    }),
    mutations,
    actions,
    getters,
}
