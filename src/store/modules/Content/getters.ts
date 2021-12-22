import { GetterTree } from "vuex";
import { ContentState } from "./index";
import { RootState } from "../../index";
import { ButtonModel, GetContentMediakiwiResponseModel, Grid, PageItem } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";

export type Getters = {
    content (rootState: ContentState): GetContentMediakiwiResponseModel | null,
    grids (rootState: ContentState): Grid[] | null,
    folders (rootState: ContentState): PageItem[] | null,
    buttons (rootState: ContentState): ButtonModel[] | null,
};

export const getters: GetterTree<ContentState, RootState> & Getters = {
    content: (rootState) => rootState.content,
    grids: (rootState) => rootState.grids,
    folders: (rootState) => rootState.folders,
    buttons: (rootState) => rootState.buttons,
};