<template>
  <div :class="tbbcContainerClasses">
    <ul class="action-list">
      <li
        v-for="button in buttons"
        :key="button"
        :class="buttonPosition(button)">
        <FormButton
          :button="button"
          @button-clicked="handleClicked" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {ButtonModel} from "@/models/Mediakiwi/ButtonModel";
import {ButtonRequestMethodType} from "@/models/Mediakiwi/ButtonRequestMethodType";
import {ButtonTargetType} from "@/models/Mediakiwi/ButtonTargetType";
import {api} from "@/utils/api";
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
      type: Array as PropType<Array<ButtonModel>>,
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
    function handleClicked(value: ButtonModel) {
      if (value) {
        const request =
          mediakiwiLogic.getMediakiwiModelFromStore(
            value.propertyName
          );

        switch (value.requestMethod) {
          case ButtonRequestMethodType.put:
            api.putMediakiwiAPI(request);
            break;
          case ButtonRequestMethodType.delete:
            api.deleteMediakiwiAPI(request);
            break;
          default:
            api.postMediakiwiAPI(request);
            break;
        }
      }
    }
    function buttonPosition(button: ButtonModel) {
      if (!button) {
        return "";
      }
      if (
        button.iconTarget ===
          ButtonTargetType.topRight ||
        button.iconTarget ===
          ButtonTargetType.bottomRight
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
