<template>
  <div :class="tbbcContainerClasses">
    <ul class="action-list">
      <li
        v-for="button in buttons"
        :key="button"
        :class="buttonPosition(button)">
        <FormButton
          :field="button"
          @button-clicked="handleClicked" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IButton, IForm, IPostContentMediakiwiRequest } from "../models/Mediakiwi/Interfaces";
import {ButtonTargetTypeEnum} from "../models/Mediakiwi/Enums";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";
import FormButton from "./form/FormButton.vue";
import { store } from "../store";
import { ContentTypes } from "../store/modules/Content";

export default defineComponent({
  name: "TopBottomButtonComponent",
  props: {
    buttons: {
      type: Array as PropType<Array<IButton>>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    forms: {
      type: Object as PropType<Array<IForm>>,
      required: true,
    }
  },
  components: {
    FormButton,
  },
  setup(props) {
    const tbbcContainerClasses = computed(() => [
      "action-list-container " + props.classname,
    ]);
    function handleClicked(button: IButton) {
      if (button) {
      const siteID: number = store.getters["Navigation/currentSiteID"];
      const request: IPostContentMediakiwiRequest = {
        currentSiteId: siteID,
        postedField: button.title,
        forms: props.forms
      }      
      store.dispatch(ContentTypes.POST_CONTENT, request)
      }
    }
    function buttonPosition(button: IButton) {
      if (!button) {
        return "";
      }
      if (
        button.section ===
          ButtonTargetTypeEnum.topRight ||
        button.section ===
          ButtonTargetTypeEnum.bottomRight
      ) {
        return "right";
      }
      return "";
    }

    return {
      tbbcContainerClasses,
      handleClicked,
      buttonPosition,
    };
  },
});
</script>

<style scoped lang="scss">
.action-list-container {
  height: 60px;
  margin: $standard-spacing 0;
  .action-list {
    list-style: none;
    display: inline;

    li {
      margin-right: 15px;
      float: left;

      &.right {
        float: right;
        margin: 0;
        margin-left : 10px;
      }

      button {
        text-transform: capitalize;
      }
    }
  }
}
</style>
