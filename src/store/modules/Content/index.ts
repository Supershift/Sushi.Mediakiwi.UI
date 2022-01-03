import { ResourceModel, GetContentMediakiwiResponseModel, Grid, ButtonModel, Field } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import ViewModel from "@/models/Mediakiwi/ViewModel";
import PageModel from "@/models/PageModel";
import { RootState } from "@/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export interface ContentState {
  content: GetContentMediakiwiResponseModel | null;
  grids: Grid[] | null;
  folders: Field[] | null;
  buttons: ButtonModel[] | null;
  page: PageModel | null;
  forms: Field[] | null;
  resources: ResourceModel[] | null;
  views: ViewModel[] | null;
}

export enum ContentTypes {
  SET_CONTENT = "Content/SET_CONTENT",
  GET_CONTENT = "Content/GET_CONTENT",
  SET_GRIDS = "Content/SET_GRIDS",
  SET_FOLDERS = "Content/SET_FOLDERS",
  SET_BUTTONS = "Content/SET_BUTTONS",
  POST_CONTENT = "Content/POST_CONTENT",
  SET_PAGE = "Content/SET_PAGE",
  SET_FORMS = "Content/SET_FORMS",
  SET_RESOURCES = "Content/SET_RESOURCES",
  SET_POST_CONTENT = "Content/SET_POST_CONTENT"
}

export const Content: Module<ContentState, RootState> = {
    namespaced: true,
    state: (): ContentState => ({
      content: null,
      grids: null,
      folders: null,
      buttons: null,
      page: null,
      forms: null,
      resources: null,
      views: null,
    }),
    mutations,
    actions,
    getters,
}
