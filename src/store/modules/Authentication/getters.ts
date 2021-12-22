import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel";
import { GetterTree } from "vuex";
import { RootState } from "../../index";
import { AuthenticationState } from "./index"

export type Getters = {
    profileData (state: AuthenticationState): AuthenticateResponseModel | null,
    apiKey (state: AuthenticationState): string | null,
    isLoggedIn (state: AuthenticationState): boolean,};

export const getters: GetterTree<AuthenticationState, RootState> & Getters = {
    profileData: (state) => state.profileData,
    apiKey: (state) => state.apiKey,
    isLoggedIn: (state) => {
        const loginStatus = sessionStorage.getItem("sushi_mediakiwi_ui_loggedin");
        if (state.isLoggedIn && loginStatus) {
            return true;
        } else {
            return false;
        }
    },
};