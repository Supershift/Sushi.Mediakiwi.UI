<template>
  <div :class="tbbcContainerClasses">
    <ul class="action-list">
      <li v-for="field in fields" :key="field">
        <FormButton
          :field="field"
          @button-clicked="handleClicked" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from "@vue/runtime-core";
import FieldModel from "../models/Mediakiwi/FieldModel";
import FormButton from "./form/FormButton.vue";

export default defineComponent({
  name: "TopBottomButtonComponent",
  props: {
    fields: {
      type: Array as PropType<Array<FieldModel>>,
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
  setup(props, context) {
    const tbbcContainerClasses = computed(() => [
      "tbbc-container " + props.classname,
    ]);
    function handleClicked(value: string) {
      context.emit("button-clicked", value);
    }
    return {
      tbbcContainerClasses,
      handleClicked,
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
    display: flex;
    justify-content: space-between;
    button {
      text-transform: capitalize;
    }
  }
}
</style>
