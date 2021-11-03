<template>
  <div :class="tbbcContainerClasses">
      <FormButton v-for="field, in fields" :key="field" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import FieldModel from "../models/FieldModel";
import FormButton from "./form/FormButton.vue";

export default defineComponent({
    name: "TopBottomButtonComponent",
    props:{
      fields: {
        type: Array as PropType<Array<FieldModel>>,
        required: true,
      },
      classname: {
        type: String,
        required: true,
      }
    },
    components: {
        FormButton,
    },
    setup(props, context) {
      const tbbcContainerClasses = computed(() => ["tbbc-container " + props.classname])
      return {
        tbbcContainerClasses
      };
    },
})
</script>

<style>

</style>