<template>
  <FormDateTime :field="field" :classname="classname" :valueType="'date'" @onChange="handleChange" />
</template>

<script lang="ts">
import FormDateTime from "./FormDateTime.vue";
import { defineComponent, PropType } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  name: "FormDate",
  components: {
    FormDateTime,
  },
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    valueType: {
      type: String,
      required: false,
      default: "",
    }
  },
  emits: ["onChange"],
  setup(props, context) {
    function handleChange(e: Event, value: Date ) {
      if (props.field.event !== "none") {
        context.emit("onChange", e, value);
      }
    }
    return {
      handleChange,
    };
  },
});
</script>
