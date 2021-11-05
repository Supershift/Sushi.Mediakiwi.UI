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
import {ButtonTargetType} from "@/models/Mediakiwi/ButtonTargetType";
import {
  computed,
  defineComponent,
  PropType,
} from "@vue/runtime-core";
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
      required: true,
    },
  },
  components: {
    FormButton,
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const tbbcContainerClasses = computed(() => [
      "tbbc-container " + props.classname,
    ]);
    function handleClicked(value: string) {
      context.emit("button-clicked", value);
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
.tbbc-container {
  height: 60px;
  margin-right: 15px;

  .action-list {
    list-style: none;
    display: inline;

    li {
      margin-right: 15px;
      float: left;

      &.right {
        float: right;
      }

      button {
        text-transform: capitalize;
      }
    }
  }
}
</style>
