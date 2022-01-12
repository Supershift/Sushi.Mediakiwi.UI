import { IAuthenticateResponse } from "@/models/Mediakiwi/Interfaces";
import { GetterTree } from "vuex";
import { RootState } from "../../index";
import { AuthenticationState } from "./index"

export type Getters = {
    profileData (state: AuthenticationState): IAuthenticateResponse | null,
    apiKey (state: AuthenticationState): string | null,
    isLoggedIn (state: AuthenticationState): boolean
};

export const getters: GetterTree<AuthenticationState, RootState> & Getters = {
    profileData: (state) => state.profileData,
    apiKey: (state) => state.apiKey,
    isLoggedIn: (state) => state.isLoggedIn,
};