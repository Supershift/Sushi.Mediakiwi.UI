import DialogModel from "@/models/DialogModel";
import DrawerModel from "@/models/DrawerModel";
import NotificationModel from "@/models/Mediakiwi/NotificationModel";
import { GetterTree } from "vuex";
import { UIState } from "./index";
import { RootState } from "../../index";

export type Getters = {
    dialog (state: UIState ): DialogModel,
    drawer (state: UIState ): DrawerModel,
    isDrawerOpen (state: UIState ): boolean,
    notification (state: UIState): NotificationModel | null | undefined,
    isLayeredMode (state: UIState): boolean,
    mediakiwiLoading (state: UIState): boolean,
    isDialogOpen (state: UIState): boolean,
   
};

export const getters: GetterTree<UIState, RootState> & Getters = {
    dialog: (state) => state.dialog,
    drawer: (state) => state.drawer,
    isDrawerOpen: (state) => state.drawer.open ? state.drawer.open : false,
    isDialogOpen: (state) => state.dialog ? state.dialog.show : false,
    notification: (state) => state.notification,
    isLayeredMode: (state) => state.isLayerMode,
    mediakiwiLoading: (state) => state.mediakiwiLoading,
};