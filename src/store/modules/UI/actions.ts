import { ActionTree, ActionContext } from "vuex"
import { RootState, store } from "../../index"
import { Mutations } from "./mutations"
import { ActionTypes } from "./action-types"
import { MutationTypes } from "./mutation-types"
import NotificationModel from "@/models/Mediakiwi/NotificationModel"
import { UIState } from "./"

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UIState, RootState>, "commit">

export interface Actions {
  [ActionTypes.SET_DIALOG_OPEN](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void,
  [ActionTypes.SET_DIALOG_SETTINGS](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void,
  [ActionTypes.SET_DRAWER_OPEN](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void,
  [ActionTypes.SET_OPEN_IN_FRAME](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void,
  [ActionTypes.SET_LOADING](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void,
  [ActionTypes.SET_NOTIFICATION](
    { commit }: AugmentedActionContext,
    payload: NotificationModel
  ): void,
}

export const actions: ActionTree<UIState, RootState> & Actions = {
  [ActionTypes.SET_DRAWER_OPEN]({ commit }, payload) {
    commit(MutationTypes.SET_DRAWER_OPEN, payload);
  },
  [ActionTypes.SET_DIALOG_OPEN]({ commit }, payload) {
   commit(MutationTypes.SET_DIALOG_OPEN, payload);
  },
  [ActionTypes.SET_DIALOG_SETTINGS]({ commit }, payload) {
    commit(MutationTypes.SET_DIALOG_SETTINGS, payload);
  },
  [ActionTypes.SET_OPEN_IN_FRAME]({ commit }, payload) {
    commit(MutationTypes.SET_OPEN_IN_FRAME, payload);
  },
  [ActionTypes.SET_LOADING]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, payload);
  },
  [ActionTypes.SET_NOTIFICATION]({ commit }, payload) {
    commit(MutationTypes.SET_NOTIFICATION, payload);
  },
}