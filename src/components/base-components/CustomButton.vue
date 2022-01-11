<template>
  <button
    :class="customButtonClasses"
    @click.prevent="handleClicked"
    :disabled="button.disabled"
  >
    <fa v-if="button.buttonIcon" :icon="buttonIconChoice" class="btn-icon" />{{ button.value }}
  </button>
</template>

<script lang="ts">
import { ILocalButton } from "../../models/Local/Interfaces";
import {
  computed,
  defineComponent,
  PropType,
} from "vue";

export default defineComponent({
  name: "FormButton",
  props: {
    button: {
      type: Object as PropType<ILocalButton>,
      required: true,
    },
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const buttonIconChoice = computed(() => ["far", props.button.buttonIcon]);
    const customButtonClasses = computed(() => [
      "btn ",
      props.button.customClass,
    ]);
    function handleClicked() {
      context.emit("button-clicked");
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>