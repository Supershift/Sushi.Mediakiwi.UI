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
import { IButton } from "../models/Mediakiwi/Interfaces";
import {ButtonTargetTypeEnum} from "../models/Mediakiwi/Enums";
import {mediakiwiLogic} from "@/utils/mediakiwiLogic";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";
import FormButton from "./form/FormButton.vue";

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
  },
  components: {
    FormButton,
  },
  setup(props) {
    const tbbcContainerClasses = computed(() => [
      "action-list-container " + props.classname,
    ]);
    function handleClicked(value: IButton) {
      if (value) {
      mediakiwiLogic.getMediakiwiRequestForButtonActions(value.propertyName);
        // switch (value.requestMethod) {
        //   case ButtonRequestMethodType.put:
        //     apiService.putMediakiwiAPI(request);
        //     break;
        //   case ButtonRequestMethodType.delete:
        //     apiService.deleteMediakiwiAPI(request);
        //     break;
        //   default:
        //     apiService.postMediakiwiAPI(request);
        //     break;
        // }
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
        margin-right: 0;
      }

      button {
        text-transform: capitalize;
      }
    }
  }
}
</style>
