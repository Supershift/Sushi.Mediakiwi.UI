<template>
  <FormDateTime
    :field="field"
    :classname="classname"
    value-type="time"
    @on-change="handleChange" />
</template>

<script lang="ts">
import FormDateTime from "./FormDateTime.vue";
import {defineComponent, PropType} from "vue";
import FieldModel from "../../models/Mediakiwi/FieldModel";

export default defineComponent({
  name: "FormTime",
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  components: {
    FormDateTime,
  },
  emits: ["value-changed"],
  setup(props, context) {
    function handleChange(
      field: FieldModel,
      value: Date
    ) {
      context.emit("value-changed", value,  field);
    }
    return {
      handleChange,
    };
  },
});
</script>
