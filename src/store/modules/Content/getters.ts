import { GetterTree } from "vuex";
import { ContentState } from "./index";
import { RootState } from "../../index";
import { ButtonModel, Field, GetContentMediakiwiResponseModel, Grid, PageItem } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import { ButtonTargetType } from "@/models/Mediakiwi/ButtonTargetType";

export type Getters = {
    content (state: ContentState): GetContentMediakiwiResponseModel | null,
    grids (state: ContentState): Grid[] | null,
    folders (state: ContentState): Field[] | null,
    buttons (state: ContentState): ButtonModel[] | null,
    fields (state: ContentState): Field[] | null,
    topButtons: (state: ContentState) => ButtonModel[] | null | undefined,
    bottomButtons: (state: ContentState) => ButtonModel[] | null | undefined,
};

export const getters: GetterTree<ContentState, RootState> & Getters = {
    content: (state) => state.content,
    grids: (state) => state.grids,
    folders: (state) => state.folders,
    buttons: (state) => state.buttons,
    fields: (state) => state.fields,
    topButtons: (state) => {
        return state.buttons?.filter((button) => (button.section === ButtonTargetType.topLeft || button.section === ButtonTargetType.topRight));
    },
    bottomButtons: (state) => {
        return state.buttons?.filter((button) => (button.section === ButtonTargetType.bottomLeft || button.section === ButtonTargetType.bottomRight));
    },
};