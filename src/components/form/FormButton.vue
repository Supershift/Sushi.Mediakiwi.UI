<template>
  <button
    :class="customButtonClasses"
    @click.prevent="handleClicked"
  >
    {{ field?.value }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  name: "FormButton",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
  },
  emits: ["buttonClicked"],
  setup(props, context) {
    /* eslint no-console: 0*/
    console.log(props.field);
    const customButtonClasses = computed(() => ["btn ", props.field?.className]);
    function handleClicked() {
      context.emit("buttonClicked");
    }
    return {
      customButtonClasses,
      handleClicked,
    };
  },
});
</script>

<style scoped lang="scss"></style>
