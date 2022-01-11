import { IAuthenticateResponse } from "@/models/Mediakiwi/Interfaces";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface AuthenticationState {
  profileData: IAuthenticateResponse | null;
  apiKey: string | null;
  isLoggedIn: boolean;
}

export enum AuthenticationTypes {
    SET_PROFILE = "Authentication/SET_PROFILE",
    AUTHENTICATE = "Authentication/AUTHENTICATE",
    UNAUTHENTICATE = "Authentication/UNAUTHENTICATE",
    RESET_PASSWORD = "Authentication/RESET_PASSWORD",
}

export const Authentication: Module<AuthenticationState, RootState> = {
  namespaced: true,
    state: (): AuthenticationState => ({
      profileData: null,
      apiKey: `${process.env.VUE_APP_MK_API_KEY}`,
      isLoggedIn: false,
    }),
    mutations,
    actions,
    getters,
}
