<template>
  <div :class="customDropdownContainerClasses">
    <label v-if="undefinedCheck(field)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <dropdown
      v-model="localField"
      tabindex="-1"
      :id="field.propertyName"
      :name="field.propertyName"
      :value="field.value"
      :options="select2data"
      :settings="select2Settings"
      :class="customDropdownClasses"
      :disabled="field.disabled || field.readOnly"
      ref="dropdown"
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
import Dropdown from "vue-select";
import "vue-select/dist/vue-select.css";

export default defineComponent({
    name: "DropDown",
    mixins: [fieldMixins],
    components: {
      "dropdown": Dropdown
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
    },
    emits: ["onChange"],
    setup(props, context) {
      let localField = ref<FieldModel>();
      let select2Settings = reactive({
        width: "100%",
        placeholder: "",
        allowClear: true,
      });
      const customDropdownClasses = computed(() => ["dropdown-primary ", props.field.className]);
      const customDropdownContainerClasses = computed(() => ["dropdown-container ", props.classname]);
      const select2data = computed(() => {
        if (!localField || !localField.value?.options || !localField.value?.options) {
          return [];
        }
        
        return localField.value?.options.map((r) => {
          return {
            id: r.value,
            label: r.name,
            disabled: false,
          };
        });
      });
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
        customDropdownContainerClasses,
        select2Settings,
      };
  },
});
</script>

<style scoped lang="scss">
.dropdown-container {
  font-family: $font-primary;
  font-size: $font-size-s;
  margin-bottom: 15px;
}
</style>