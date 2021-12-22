import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel";
import { GetterTree } from "vuex";
import { RootState } from "../../index";
import { AuthenticationState } from "./index"

export type Getters = {
    profileData (rootState: AuthenticationState): AuthenticateResponseModel | null,
    apiKey (rootState: AuthenticationState): string | null,
    isLoggedIn (rootState: AuthenticationState): boolean,};

export const getters: GetterTree<AuthenticationState, RootState> & Getters = {
    profileData: (rootState) => rootState.profileData,
    apiKey: (rootState) => rootState.apiKey,
    isLoggedIn: (rootState) => {
        const loginStatus = sessionStorage.getItem("sushi_mediakiwi_ui_loggedin");
        if (rootState.isLoggedIn && loginStatus) {
            return true;
        } else {
            return false;
        }
    },
};