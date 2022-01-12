import { IDialog, IDrawer } from "@/models/Local/Interfaces";
import {INotification} from "@/models/Mediakiwi/Interfaces";
import { GetterTree } from "vuex";
import { UIState } from "./index";
import { RootState } from "../../index";

export type Getters = {
    dialog (state: UIState ): IDialog,
    drawer (state: UIState ): IDrawer,
    isDrawerOpen (state: UIState ): boolean,
    notification (state: UIState): INotification | null | undefined,
    isLayeredMode (state: UIState): boolean,
    mediakiwiLoading (state: UIState): boolean,
    isDialogOpen (state: UIState): boolean,
};

export const getters: GetterTree<UIState, RootState> & Getters = {
    dialog: (state) => state.dialog,
    drawer: (state) => state.drawer,
    isDrawerOpen: (state) => state.drawer ? state.drawer.open : false,
    isDialogOpen: (state) => state.dialog ? state.dialog.show : false,
    notification: (state) => state.notification,
    isLayeredMode: (state) => state.isLayerMode,
    mediakiwiLoading: (state) => state.mediakiwiLoading,
};