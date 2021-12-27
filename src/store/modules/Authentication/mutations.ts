import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { AuthenticationState } from "./index"
import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel"
import router from "@/router"
import ls from "secure-ls"

export type Mutations<S = AuthenticationState> = {
  [MutationTypes.SET_PROFILE](state: S, payload: AuthenticateResponseModel|null): void,
  [MutationTypes.AUTHENTICATE](state: S, payload: boolean): void,
  [MutationTypes.UNAUTHENTICATE](state: S, payload: boolean): void,
  [MutationTypes.RESET_PASSWORD](state: S, payload: boolean):void,
}

export const mutations: MutationTree<AuthenticationState> & Mutations = {
    [MutationTypes.SET_PROFILE](state: AuthenticationState, payload: AuthenticateResponseModel|null): void {
      if (payload) {
        state.profileData = payload;
        if (!state.profileData.userAvatarUrl) {
          state.profileData.userAvatarUrl = "/images/noName.jpg";
        }
      } else {
        state.profileData = null;
      }
    },
    [MutationTypes.AUTHENTICATE](state: AuthenticationState, payload: boolean): void {
      state.isLoggedIn = true;
      router.push("/");
    },
    [MutationTypes.UNAUTHENTICATE](state: AuthenticationState, payload: boolean): void {
      window.sessionStorage.clear();
      window.localStorage.clear();
      state.isLoggedIn = false;
      router.push("/login");
    },
    [MutationTypes.RESET_PASSWORD](state:AuthenticationState, payload: boolean): void {
      router.push("/");
    }
}