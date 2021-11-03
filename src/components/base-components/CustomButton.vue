<template>
  <button
    :class="customButtonClasses"
    @click.prevent="handleClicked"
  >
    {{ button.value }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ButtonModel from "../../models/ButtonModel";

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
    const customButtonClasses = computed(() => ["btn ", props.button.customClass]);
    function handleClicked() {
      context.emit("button-clicked");
    }
    return {
      customButtonClasses,
      handleClicked,
    };
  },
});
</script>

<style scoped lang="scss"></style>
