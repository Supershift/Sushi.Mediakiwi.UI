<template>
  <button
    :class="customButtonClasses"
    @click.prevent="handleClicked"
    :disabled="
      button?.disabled || button.readOnly
    ">
    {{ button.value }}
  </button>
</template>

<script lang="ts">
import {ButtonModel} from "@/models/Mediakiwi/ButtonModel";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";

export default defineComponent({
  name: "FormButton",
  props: {
    button: {
      type: Object as PropType<ButtonModel>,
      required: true,
    },
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const customButtonClasses = computed(() => [
      "btn ",
      props.button?.className,
    ]);
    function handleClicked() {
      context.emit(
        "button-clicked",
        props.button.value
      );
    }
    return {
      customButtonClasses,
      handleClicked,
    };
  },
});
</script>

<style scoped lang="scss">
.btn {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: $color-main;
    }
  }
}
</style>
