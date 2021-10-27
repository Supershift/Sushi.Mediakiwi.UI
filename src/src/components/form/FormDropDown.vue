<template>
  <div :class="classname">
    <label v-if="undefinedCheck(field)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <v-select
      v-model="localField"
      tabindex="-1"
      :id="field.propertyName"
      :name="field.propertyName"
      :value="field.value"
      :options="select2data"
      :settings="select2Settings"
      :class="customDropdownClasses"
      ref="dropdown"
      :disabled="field.disabled || field.readOnly"
      @change="handleChange"
    />
    <label v-if="undefinedCheck(field.suffix)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { fieldMixins } from "./index";
import { computed, defineComponent, onBeforeMount, PropType, reactive, ref } from "vue";
import FieldModel from "../../models/FieldModel";
import "vue-select/dist/vue-select.css";

export default defineComponent({
    name: "DropDown",
    mixins: [fieldMixins],
    props: {
      field: {
        type: Object as PropType<FieldModel>,
        required: true,
      },
      classname: {
        type: String,
        required: true,
      },
    },
    emits: ["onChange"],
    setup(props, context) {
      let localField = ref<FieldModel>();
      let select2Settings = reactive( {
        width: "100%",
        placeholder: "",
        allowClear: true,
      });
      const customDropdownClasses = computed(() => ["dropdown-primary ", props.classname]);
      function select2data() {
        if (!localField || !localField.value?.options || !localField.value?.options) {
          return [];
        }

        return localField.value?.options.map((r) => {
          return {
            id: r.value,
            text: r.name,
            disabled: false,
          };
        });
      }
      function handleChange() {
        if (localField.value?.event !== "none") {
          context.emit("onChange", null, localField);
        }
      }
      onBeforeMount(() => {
        localField.value = props.field;
      });
      return {
        select2data,
        handleChange,
        customDropdownClasses,
        select2Settings,
      };
  },
});
</script>
