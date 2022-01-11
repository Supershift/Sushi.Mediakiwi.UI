import { IDialog, IDrawer } from "@/models/Local/Interfaces";
import {INotification} from "@/models/Mediakiwi/Interfaces";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface UIState {
    mediakiwiLoading: boolean;
    isLayerMode: boolean;
    drawer: IDrawer;
    dialog: IDialog;
    notification?: INotification | null ;
}

export enum UITypes {
    SET_LOADING = "UI/SET_LOADING",
    SET_OPEN_IN_FRAME = "UI/SET_OPEN_IN_FRAME",
    SET_DRAWER_OPEN = "UI/SET_DRAWER_OPEN",
    SET_DIALOG_OPEN = "UI/SET_DIALOG_OPEN",
    SET_DIALOG_SETTINGS = "UI/SET_DIALOG_SETTINGS",
    SET_NOTIFICATION = "UI/SET_NOTIFICATION",
    TOGGLE_NOTIFICATION = "UI/TOGGLE_NOTIFICATION",
}

export const UI: Module<UIState, RootState> = {
    namespaced: true,
    state: (): UIState => ({
        mediakiwiLoading: false,
        isLayerMode: false,
        drawer: {
            open: false,
        },
        dialog: {
            show: false,
            settings: false
        },
        notification: null,
    }),
    mutations,
    actions,
    getters,
}
