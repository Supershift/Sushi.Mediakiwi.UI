import { INavigationItem, ISite } from "@/models/Mediakiwi/Interfaces";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface NavigationState {
  topNavigationItems: INavigationItem[];
  sideNavigationItems: INavigationItem[];
  currentSiteID: number;
  currentSite: ISite | null;
  availableSites: ISite[];
  homeURL: string;
}

export enum NavigationTypes {
  SET_TOP_NAVIGATION = "Navigation/SET_TOP_NAVIGATION",
  SET_SIDE_NAVIGATION = "Navigation/SET_SIDE_NAVIGATION",
  SET_SITE = "Navigation/SET_SITE",
  GET_TOP_NAVIGATION = "Navigation/GET_TOP_NAVIGATION",
  GET_SIDE_NAVIGATION = "Navigation/GET_SIDE_NAVIGATION",
  GET_SITES = "Navigation/GET_SITES",
  SET_SITES = "Navigation/SET_SITES",
}

export const Navigation: Module<NavigationState, RootState> = {
    namespaced: true,
    state: (): NavigationState => ({
      topNavigationItems: Array<INavigationItem>(),
      sideNavigationItems: Array<INavigationItem>(),
      currentSiteID: 2,
      availableSites: Array<ISite>(),
      homeURL: "",
      currentSite: null,
    }),
    mutations,
    actions,
    getters,
}
