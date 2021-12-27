import { NavigationItemModel } from "@/models/Mediakiwi/NavigationModel";
import { SiteItem } from "@/models/Mediakiwi/Response/Navigation/GetSitesResponseModel";
import { GetterTree } from "vuex";
import { NavigationState } from ".";
import { RootState } from "../../index";

export type Getters = {
    topNavigationItems (state: NavigationState): NavigationItemModel[] | null,
    sideNavigationItems (state: NavigationState): NavigationItemModel[] | null,
    currentSiteID (state: NavigationState): number,
    availableSites (state: NavigationState): SiteItem[]
};

export const getters: GetterTree<NavigationState, RootState> & Getters = {
    topNavigationItems: (state) => state.topNavigationItems,
    sideNavigationItems: (state) => state.sideNavigationItems,
    currentSiteID: (state) => state.currentSiteID,
    availableSites: (state) => state.availableSites
};