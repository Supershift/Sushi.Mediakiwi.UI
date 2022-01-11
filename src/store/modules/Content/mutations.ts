import { MutationTypes } from "./mutation-types"
import { MutationTree } from "vuex"
import { ContentState } from "./index"
import { IResource, IButton, IField, IGrid, IForm, IPostContentMediakiwiResponse, IGetContentMediakiwiResponse, IContentList } from "@/models/Mediakiwi/Interfaces"
import { mediakiwiLogic } from "@/utils/mediakiwiLogic"


export type Mutations<S = ContentState> = {
  [MutationTypes.SET_CONTENT](state: S, payload: IGetContentMediakiwiResponse |null): void,
  [MutationTypes.SET_GRIDS](state: S, payload: IGrid[]): void,
  [MutationTypes.SET_FOLDERS](state: S, payload: IField[]): void,
  [MutationTypes.SET_BUTTONS](state: S, payload: IForm[]): void,
  [MutationTypes.SET_PAGE](state: S, payload: IContentList): void,
  [MutationTypes.SET_FORMS](state: S, payload: IField[]): void,
  [MutationTypes.SET_RESOURCES](state: S, payload: IResource[]): void,
  [MutationTypes.SET_POST_CONTENT](state: S, payload: IPostContentMediakiwiResponse): void,
}

export const mutations: MutationTree<ContentState> & Mutations = {
    [MutationTypes.SET_CONTENT](state: ContentState, payload: IGetContentMediakiwiResponse): void {
      if (payload) {
        state.content = payload;
        mediakiwiLogic.putResponseToStore({...payload, closeLayer: false});
      } else {
        state.content = null
      }
    },
    [MutationTypes.SET_GRIDS](state: ContentState, payload: IGrid[]): void {
      if (payload) {
        state.grids = payload;
      }
    },
    [MutationTypes.SET_FOLDERS](state: ContentState, payload: IField[]): void {
      if (payload) {
        state.folders = payload;
      }
    },
    [MutationTypes.SET_BUTTONS](state: ContentState, payload: IForm[]): void {
      if (payload) {
        const buttonList: IButton[] = []
        payload.map((form: IForm) => {
          if (form.buttons) {
            form.buttons.forEach((button: IButton) => {
              buttonList.push(button);
            })
          }
        });
        state.buttons = buttonList;
      }
    },
    [MutationTypes.SET_PAGE](state: ContentState, payload: IContentList): void {
      if (payload) {
        state.page = payload;
      }
    },
    [MutationTypes.SET_FORMS](state: ContentState, payload: IField[]): void {
      if (payload) {
        state.forms = payload;
      }
    },
    [MutationTypes.SET_RESOURCES](state: ContentState, payload: IResource[]): void {
      if (payload) {
        state.resources = payload;
      }
    },
    [MutationTypes.SET_POST_CONTENT](state: ContentState, payload: IPostContentMediakiwiResponse): void {
      if (payload) {
        if (state.content) {
          //state.content.list.forms = payload.forms
          state.content = payload;
          mediakiwiLogic.putResponseToStore({...payload, closeLayer: false});
        }
      }
    },
}