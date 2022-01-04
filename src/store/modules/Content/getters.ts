import { GetterTree } from "vuex";
import { ContentState } from "./index";
import { RootState } from "../../index";
import { ResourceModel, ButtonModel, Field, GetContentMediakiwiResponseModel, Grid } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import { ButtonTargetType } from "@/models/Mediakiwi/ButtonTargetType";
import ViewModel from "@/models/Mediakiwi/ViewModel";
import PageModel from "@/models/PageModel";

export type Getters = {
    content (state: ContentState): GetContentMediakiwiResponseModel | null,
    grids (state: ContentState): Grid[] | null,
    folders (state: ContentState): Field[] | null,
    buttons (state: ContentState): ButtonModel[] | null,
    forms (state: ContentState): Field[] | null,
    resources (state: ContentState): ResourceModel[] | null,
    views (state: ContentState): ViewModel[] | null,
    page (state: ContentState): PageModel | null,
    topButtons: (state: ContentState) => ButtonModel[] | null | undefined,
    bottomButtons: (state: ContentState) => ButtonModel[] | null | undefined,
};

export const getters: GetterTree<ContentState, RootState> & Getters = {
    content: (state) => state.content,
    grids: (state) => state.grids,
    folders: (state) => state.folders,
    buttons: (state) => state.buttons,
    forms: (state) => state.forms,
    resources: (state) => state.resources,
    views: (state) => state.views,
    page: (state) => state.page,
    topButtons: (state) => {
        return state.buttons?.filter((button) => (button.section === ButtonTargetType.topLeft || button.section === ButtonTargetType.topRight));
    },
    bottomButtons: (state) => {
        return state.buttons?.filter((button) => (button.section === ButtonTargetType.bottomLeft || button.section === ButtonTargetType.bottomRight));
    },
};