import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { ContentState } from "./index"
import { ResourceModel, ButtonModel, Field, GetContentMediakiwiResponseModel, Grid, Form } from "@/models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel"
import { mediakiwiLogic } from "@/utils/mediakiwiLogic"
import PageModel from "@/models/PageModel"
import { PostContentMediakiwiResponseModel } from "@/models/Mediakiwi/Response/Content/PostContentMediakiwiResponseModel"


export type Mutations<S = ContentState> = {
  [MutationTypes.SET_CONTENT](state: S, payload: GetContentMediakiwiResponseModel|null): void,
  [MutationTypes.SET_GRIDS](state: S, payload: Grid[]): void,
  [MutationTypes.SET_FOLDERS](state: S, payload: Field[]): void,
  [MutationTypes.SET_BUTTONS](state: S, payload: Form[]): void,
  [MutationTypes.SET_PAGE](state: S, payload: PageModel): void,
  [MutationTypes.SET_FORMS](state: S, payload: Field[]): void,
  [MutationTypes.SET_RESOURCES](state: S, payload: ResourceModel[]): void,
  [MutationTypes.SET_POST_CONTENT](state: S, payload: PostContentMediakiwiResponseModel): void,
}

export const mutations: MutationTree<ContentState> & Mutations = {
    [MutationTypes.SET_CONTENT](state: ContentState, payload: GetContentMediakiwiResponseModel): void {
      if (payload) {
        state.content = payload;
        mediakiwiLogic.putResponseToStore({...payload, closeLayer: false});
      } else {
        state.content = null
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
    [MutationTypes.SET_BUTTONS](state: ContentState, payload: Form[]): void {
      if (payload) {
        const buttonList: ButtonModel[] = []
        payload.map((form: Form) => {
          if (form.buttons) {
            form.buttons.forEach((button: ButtonModel) => {
              buttonList.push(button);
            })
          }
        });
        state.buttons = buttonList;
      }
    },
    [MutationTypes.SET_PAGE](state: ContentState, payload: PageModel): void {
      if (payload) {
        state.page = payload;
      }
    },
    [MutationTypes.SET_FORMS](state: ContentState, payload: Field[]): void {
      if (payload) {
        state.forms = payload;
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
          //state.content.list.forms = payload.forms
          state.content = payload;
          mediakiwiLogic.putResponseToStore({...payload, closeLayer: false});
        }
      }
    },
}