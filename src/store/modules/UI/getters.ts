import DialogModel from "@/models/DialogModel";
import DrawerModel from "@/models/DrawerModel";
import NotificationModel from "@/models/Mediakiwi/NotificationModel";
import { GetterTree } from "vuex";
import { UIState } from "./index";
import { RootState } from "../../index";

export type Getters = {
    dialog (rootState: UIState ): DialogModel,
    drawer (rootState: UIState ): DrawerModel,
    isDrawerOpen (rootState: UIState ): boolean,
    notification (rootState: UIState): NotificationModel | null | undefined,
    isLayeredMode (rootState: UIState): boolean,
    mediakiwiLoading (rootState: UIState): boolean,
    isDialogOpen (rootState: UIState): boolean,
};

export const getters: GetterTree<UIState, RootState> & Getters = {
    dialog: (rootState) => rootState.dialog,
    drawer: (rootState) => rootState.drawer,
    isDrawerOpen: (rootState) => rootState.drawer ? rootState.drawer.open : false,
    isDialogOpen: (rootState) => rootState.dialog ? rootState.dialog.show : false,
    notification: (rootState) => rootState.notification,
    isLayeredMode: (rootState) => rootState.isLayerMode,
    mediakiwiLoading: (rootState) => rootState.mediakiwiLoading,
};