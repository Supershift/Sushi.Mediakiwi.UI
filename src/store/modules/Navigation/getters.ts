import { ISite, INavigationItem } from "@/models/Mediakiwi/Interfaces";
import { GetterTree } from "vuex";
import { NavigationState } from ".";
import { RootState } from "../../index";

export type Getters = {
    topNavigationItems (state: NavigationState): INavigationItem[] | null,
    sideNavigationItems (state: NavigationState): INavigationItem[] | null,
    currentSiteID (state: NavigationState): number,
    currentSite (state: NavigationState): ISite | null,
    availableSites (state: NavigationState): ISite[],
    homeURL (state: NavigationState): string
};

export const getters: GetterTree<NavigationState, RootState> & Getters = {
    topNavigationItems: (state) => state.topNavigationItems,
    sideNavigationItems: (state) => state.sideNavigationItems,
    currentSiteID: (state) => state.currentSiteID,
    currentSite: (state) => state.availableSites.find((site: ISite) => site.id === state.currentSiteID) || null,
    availableSites: (state) => state.availableSites,
    homeURL: (state) => state.homeURL
};