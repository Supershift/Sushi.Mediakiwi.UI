import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { ContentState } from "./index"
import { ButtonModel, Field, GetContentMediakiwiResponseModel, Grid, PageItem } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel"
import { mediakiwiLogic } from "@/utils/mediakiwiLogic"
import PageModel from "@/models/PageModel"
import ResourceModel from "@/models/Mediakiwi/ResourceModel"
import { PostContentMediakiwiResponseModel } from "@/models/Mediakiwi/Response/Content/PostContentMediakiwiResponseModel"

export type Mutations<S = ContentState> = {
  [MutationTypes.SET_CONTENT](state: S, payload: GetContentMediakiwiResponseModel): void,
  [MutationTypes.SET_GRIDS](state: S, payload: Grid[]): void,
  [MutationTypes.SET_FOLDERS](state: S, payload: Field[]): void,
  [MutationTypes.SET_BUTTONS](state: S, payload: ButtonModel[]): void,
  [MutationTypes.SET_PAGE](state: S, payload: PageModel): void,
  [MutationTypes.SET_FIELDS](state: S, payload: Field[]): void,
  [MutationTypes.SET_RESOURCES](state: S, payload: ResourceModel[]): void,
  [MutationTypes.SET_POST_CONTENT](state: S, payload: PostContentMediakiwiResponseModel|any): void,
}

export const mutations: MutationTree<ContentState> & Mutations = {
    [MutationTypes.SET_CONTENT](state: ContentState, payload: GetContentMediakiwiResponseModel): void {
      if (payload) {
        state.content = payload;
        mediakiwiLogic.putResponseToStore({...payload, closeLayer: false});
      }
    },
    [MutationTypes.SET_GRIDS](state: ContentState, payload: Grid[]): void {
      if (payload) {
        state.grids = payload;
      }
    },
    [MutationTypes.SET_FOLDERS](state: ContentState, payload: Field[]): void {
      if (payload) {
        state.folders = payload;
      }
    },
    [MutationTypes.SET_BUTTONS](state: ContentState, payload: ButtonModel[]): void {
      if (payload) {
        state.buttons = payload;
      }
    },
    [MutationTypes.SET_PAGE](state: ContentState, payload: PageModel): void {
      if (payload) {
        state.page = payload;
      }
    },
    [MutationTypes.SET_FIELDS](state: ContentState, payload: Field[]): void {
      if (payload) {
        state.fields = payload;
      }
    },
    [MutationTypes.SET_RESOURCES](state: ContentState, payload: ResourceModel[]): void {
      if (payload) {
        state.resources = payload;
      }
    },
    [MutationTypes.SET_POST_CONTENT](state: ContentState, payload: PostContentMediakiwiResponseModel): void {
      if (payload) {
        if (state.content) {
          state.content.list.forms = payload.forms
        }
      }
    },
}