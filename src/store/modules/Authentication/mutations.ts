import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { AuthenticationState } from "./index"
import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel"
import { RootState } from "@/store"

export type Mutations<S = AuthenticationState> = {
  [MutationTypes.SET_PROFILE](state: S, payload: AuthenticateResponseModel): void,
  [MutationTypes.TOGGLE_LOGIN](state: S, payload: boolean): void,
}

export const mutations: MutationTree<AuthenticationState> & Mutations = {
    [MutationTypes.SET_PROFILE](state: AuthenticationState, payload: AuthenticateResponseModel): void {
      if (payload) {
        state.profileData = payload;
        if (!state.profileData.userAvatarUrl) {
          state.profileData.userAvatarUrl = "/images/noName.jpg";
        }
      }
    },
    [MutationTypes.TOGGLE_LOGIN](state: AuthenticationState, payload: boolean): void {
      state.isLoggedIn = payload;
      sessionStorage.setItem("sushi_mediakiwi_ui_loggedin", JSON.stringify(payload));
    }
}