import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { RootState } from "../../index"
import NotificationModel from "@/models/Mediakiwi/NotificationModel"
import { UIState } from "."

export type Mutations<S = UIState> = {
  [MutationTypes.SET_DRAWER_OPEN](state: S, payload: boolean): void,
  [MutationTypes.SET_DIALOG_OPEN](state: S, payload: boolean): void,
  [MutationTypes.SET_DIALOG_SETTINGS](state: S, payload: boolean): void,
  [MutationTypes.SET_OPEN_IN_FRAME](state: S, payload: boolean): void,
  [MutationTypes.SET_NOTIFICATION](state: S, payload: NotificationModel): void,
  [MutationTypes.TOGGLE_NOTIFICATION](state: S, payload: boolean): void,
  [MutationTypes.SET_LOADING](state: S, payload: boolean): void,
}

export const mutations: MutationTree<UIState> & Mutations = {
    [MutationTypes.SET_DRAWER_OPEN](state: UIState, payload: boolean): void {
      if (payload) {
        state.drawer.open = payload;
      }
    },
    [MutationTypes.SET_DIALOG_OPEN](state: UIState, payload: boolean): void {
      state.dialog.show = payload;
    },
    [MutationTypes.SET_DIALOG_SETTINGS](state: UIState, payload: boolean): void {
      state.dialog.settings = payload;
    },
    [MutationTypes.SET_OPEN_IN_FRAME](state: UIState, payload: boolean): void {
      state.isLayerMode = payload;
    },
    [MutationTypes.SET_NOTIFICATION](state: UIState, payload: NotificationModel): void {
      if (payload) {
        state.notification = payload;
      }
    },
    [MutationTypes.SET_LOADING](state: UIState, payload: boolean): void {
      state.mediakiwiLoading = payload;
    },
    [MutationTypes.TOGGLE_NOTIFICATION](state: UIState, payload: boolean): void {
      if (!payload) {
        state.notification = null;
      }
    },
}