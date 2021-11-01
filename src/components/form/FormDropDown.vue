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
      :options="select2data"
      placeholder=""
      clearable="true"
      taggable="false"
      :class="customDropdownClasses"
      :disabled="field.disabled || field.readOnly"
      ref="dropdown"
      @input="handleChange"
    />
    <label v-if="undefinedCheck(field.suffix)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import { fieldMixins } from "./index";
import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/FieldModel";
import Dropdown from "vue-select";
import "vue-select/dist/vue-select.css";

export default defineComponent({
  name: "DropDown",
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
  mixins: [fieldMixins],
  components: {
    dropdown: Dropdown,
  },
  emits: ["onChange"],
  setup(props, context) {
    let localField = ref<FieldModel>(props.field.value);
    const customDropdownClasses = computed(() => [
      "dropdown-primary ",
      props.field.className,
    ]);
    const customDropdownContainerClasses = computed(() => [
      "dropdown-container ",
      props.classname,
    ]);
    const select2data = computed(() => {
      if (!localField.value?.options) {
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
    function handleChange(e: Event) {
      if (localField.value?.event !== "none") {
        context.emit("onChange", e, localField);
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
    };
  },
});
</script>

<style lang="scss">
.dropdown-container {
  font-family: $font-primary;
  font-size: $font-size-s;
  margin-bottom: 15px;
  width: 100%;
}
.vs__dropdown-toggle{
  height: 50px;
  border: 1px solid #aaa;
  border-radius: $b-radius-6;
}
.vs__actions svg {
  fill: $color-success !important;
}
</style>
