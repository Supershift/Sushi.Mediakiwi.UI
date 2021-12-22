import ResourceModel from "@/models/Mediakiwi/ResourceModel";
import { GetContentMediakiwiResponseModel, Grid, PageItem, ButtonModel, Field } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import PageModel from "@/models/PageModel";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface ContentState {
  content: GetContentMediakiwiResponseModel | null;
  grids: Grid[] | null;
  folders: PageItem[] | null;
  buttons: ButtonModel[] | null;
  page: PageModel | null;
  fields: Field[] | null;
  resources: ResourceModel[] | null;
}

export enum ContentTypes {
  SET_CONTENT = "Content/SET_CONTENT",
  GET_CONTENT = "Content/GET_CONTENT",
  SET_GRIDS = "Content/SET_GRIDS",
  SET_FOLDERS = "Content/SET_FOLDERS",
  SET_BUTTONS = "Content/SET_BUTTONS",
  POST_CONTENT = "Content/POST_CONTENT",
  SET_PAGE = "Content/SET_PAGE",
  SET_FIELDS = "Content/SET_FIELDS",
  SET_RESOURCES = "Content/SET_RESOURCES",
}

export const Content: Module<ContentState, RootState> = {
    namespaced: true,
    state: (): ContentState => ({
      content: null,
      grids: null,
      folders: null,
      buttons: null,
      page: null,
      fields: null,
      resources: null,
    }),
    mutations,
    actions,
    getters,
}
