<template>
  <button
    :class="customButtonClasses"
    @click.prevent="handleClicked"
    :disabled="field?.disabled || field.readOnly">
    {{ field.value }}
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "FormButton",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const customButtonClasses = computed(() => [
      "btn ",
      props.field?.className,
    ]);
    function handleClicked() {
      context.emit(
        "button-clicked",
        props.field.value
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
