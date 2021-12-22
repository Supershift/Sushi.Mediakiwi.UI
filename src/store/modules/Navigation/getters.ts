import { NavigationItemModel } from "@/models/Mediakiwi/NavigationModel";
import { GetterTree } from "vuex";
import { NavigationState } from ".";
import { RootState } from "../../index";

export type Getters = {
    topNavigationItems (rootState: NavigationState): NavigationItemModel[] | null,
    sideNavigationItems (rootState: NavigationState): NavigationItemModel[] | null,
    currentSiteID (rootState: NavigationState): number,
};

export const getters: GetterTree<NavigationState, RootState> & Getters = {
    topNavigationItems: (rootState) => rootState.topNavigationItems,
    sideNavigationItems: (rootState) => rootState.sideNavigationItems,
    currentSiteID: (rootState) => rootState.currentSiteID,
};