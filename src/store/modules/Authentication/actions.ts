import { ActionTree, ActionContext } from "vuex"
import { RootState, store } from "../../index"
import { AuthenticationState } from "./index"
import { Mutations } from "./mutations"
import { ActionTypes } from "./action-types"
import { authenticationAPIService } from "@/utils/api-service"
import router from "@/router"
import AuthenticateRequestModel from "@/models/Mediakiwi/Request/Authentication/AuthenticateRequestModel"
import { ResetPasswordRequestModel } from "@/models/Mediakiwi/Request/Authentication/ResetPasswordRequestModel"
import { UITypes } from "../UI"
import { AuthenticateResponseModel } from "@/models/Mediakiwi/Response/Authentication/AuthenticateResponseModel"
import { MutationTypes } from "./mutation-types"

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AuthenticationState, RootState>, "commit">

export interface Actions {
  [ActionTypes.AUTHENTICATE](
    { commit }: AugmentedActionContext,
    payload: AuthenticateRequestModel
  ): Promise<void>,
  [ActionTypes.UNAUTHENTICATE](
    { commit }: AugmentedActionContext
  ): Promise<void>,
  [ActionTypes.RESET_PASSWORD](
    { commit }: AugmentedActionContext,
    payload: ResetPasswordRequestModel
  ): Promise<void>,
  [ActionTypes.SET_PROFILE](
    { commit }: AugmentedActionContext,
    payload: AuthenticateResponseModel
  ): void,
}

export const actions: ActionTree<AuthenticationState, RootState> & Actions = {
  [ActionTypes.AUTHENTICATE]({ commit }, payload) {
    store.dispatch(UITypes.SET_LOADING, true);
    return authenticationAPIService.signInMediakiwiAPI(payload)
    .then(() => {
      commit(MutationTypes.AUTHENTICATE, true)
    })
    .finally(() => {
      store.dispatch(UITypes.SET_LOADING, false);
    });
  },
  [ActionTypes.UNAUTHENTICATE]({ commit }) {
    const originUrl = router.currentRoute.value.fullPath;
    store.dispatch(UITypes.SET_LOADING, true);
      return authenticationAPIService.signOutMediakiwiAPI(originUrl)
      .then(() => {
        commit(MutationTypes.UNAUTHENTICATE, true);
        commit(MutationTypes.SET_PROFILE, null);
      })
      .finally(() => {
        store.dispatch(UITypes.SET_LOADING, false);
      });
  },
  [ActionTypes.RESET_PASSWORD]({ commit }, payload) {
    const waitforRedirect = 4000;
    store.dispatch(UITypes.SET_LOADING, true);
    return authenticationAPIService.resetPasswordMediakiwiAPI(payload)
    .then(() => {
      setTimeout(() => {
        commit(MutationTypes.RESET_PASSWORD, true)
      }, waitforRedirect);
    })
    .finally(() => {
      store.dispatch(UITypes.SET_LOADING, false);
    })
  },
  [ActionTypes.SET_PROFILE]({ commit }, payload) {
    commit(MutationTypes.SET_PROFILE, payload);
  }
}