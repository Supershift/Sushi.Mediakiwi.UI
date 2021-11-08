<template>
  <a
    v-if="button.customUrl"
    :class="customButtonClasses"
    :href="button.customUrl"
    :disabled="
      button?.disabled || button.readOnly
    ">
    <fa :icon="buttonIconChoice" class="btn-icon" />{{ button.value }}
  </a>
  <button
    v-else
    :class="customButtonClasses"
    @click.prevent="handleClicked"
    :disabled="
      button?.disabled || button.readOnly
    ">
    <fa :icon="buttonIconChoice" class="btn-icon" />{{ button.value }}
  </button>
</template>

<script lang="ts">
import {ButtonModel} from "../../models/Mediakiwi/ButtonModel";
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
    const buttonIconChoice = computed(() => ["fal", props.button.icon]);
    function handleClicked() {
      context.emit(
        "button-clicked",
        props.button
      );
    }
    return {
      customButtonClasses,
      buttonIconChoice,
      handleClicked,
    };
  },
});
</script>

<style scoped lang="scss">
.btn {
  text-decoration: none;
  display: inline-block;
  font-family: $font-primary;
  font-size: $font-size-base;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: $color-main;
    }
  }
}
.btn-icon {
  padding-right: 15px;
}
</style>
