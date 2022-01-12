import { GetterTree } from "vuex";
import { ContentState } from "./index";
import { RootState } from "../../index";
import { IResource, IButton, IField, IGrid, IGetContentMediakiwiResponse, IContentList } from "@/models/Mediakiwi/Interfaces";
import { ButtonTargetTypeEnum } from "@/models/Mediakiwi/Enums";
import { IView } from "@/models/Local/Interfaces";

export type Getters = {
    content (state: ContentState): IGetContentMediakiwiResponse | null,
    grids (state: ContentState): IGrid[] | null,
    folders (state: ContentState): IField[] | null,
    buttons (state: ContentState): IButton[] | null,
    forms (state: ContentState): IField[] | null,
    resources (state: ContentState): IResource[] | null,
    views (state: ContentState): IView[] | null,
    page (state: ContentState): IContentList | null,
    topButtons: (state: ContentState) => IButton[] | null | undefined,
    bottomButtons: (state: ContentState) => IButton[] | null | undefined,
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
        return state.buttons?.filter((button) => (button.section === ButtonTargetTypeEnum.topLeft || button.section === ButtonTargetTypeEnum.topRight));
    },
    bottomButtons: (state) => {
        return state.buttons?.filter((button) => (button.section === ButtonTargetTypeEnum.bottomLeft || button.section === ButtonTargetTypeEnum.bottomRight));
    },
};