<template>
  <div :class="customDropdownContainerClasses">
    <label v-if="undefinedCheck(field)">
      {{ undefinedCheck(field.prefix) }}
    </label>
    <dropdown
      v-model="selectedValueRef"
      :tabindex="1"
      :id="fieldID"
      :name="field.propertyName"
      :options="optionData"
      placeholder=""
      :clearable="true"
      :taggable="false"
      :aria-label="field.helpText"
      :title="field.helpText"
      :class="customDropdownClasses"
      :disabled="field.disabled || field.readOnly"
      ref="dropdown"
      @input="handleChange" />
    <label v-if="undefinedCheck(field.suffix)">
      {{ undefinedCheck(field.suffix) }}
    </label>
  </div>
</template>
<script lang="ts">
import {fieldMixins} from "./index";
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from "vue";
import Dropdown from "vue-select";
import "vue-select/dist/vue-select.css";
import {MediakiwiJSEventType} from "@/models/Mediakiwi/MediakiwiJSEventType";
import { Field, FieldOption } from "../../models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";

export default defineComponent({
  name: "FormChoiceDropdown",
  props: {
    field: {
      type: Object as PropType<Field>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [fieldMixins],
  components: {
    dropdown: Dropdown,
  },
  emits: ["on-change"],
  setup(props, context) {
    let valueRef = ref<Field>(props.field);
    const customDropdownClasses = computed(() => [
      "dropdown-primary ",
      props.field.className,
    ]);

    const fieldID = computed(() => [
      props.field.propertyName + "_dropdown",
    ]);

    const customDropdownContainerClasses =
      computed(() => [
        "dropdown-container ",
        props.classname,
      ]);
    const optionData = computed(() => {
      if (!valueRef.value?.options) {
        return [];
      }
      
      return valueRef.value?.options.map(
        (r: FieldOption) => {
          return {
            id: r.value,
            label: r.text,
            disabled: !r.isEnabled,
          };
        }
      );
    });

    const selectedValueRef = ref();
    selectedValueRef.value =
      optionData.value?.find(
        (r) => r.id === valueRef.value.value
      );

    function handleChange(e?: Event) {
      if (
        props.field.event !==
        MediakiwiJSEventType.none
      ) {
        context.emit(
          "on-change",
          e,
          props.field,
          selectedValueRef.value.id
        );
      }
    }

    watch(
      () => selectedValueRef.value,
      () => {
        handleChange();
      }
    );
    return {
      fieldID,
      optionData,
      handleChange,
      customDropdownClasses,
      customDropdownContainerClasses,
      valueRef,
      selectedValueRef,
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
.v-select {
  .vs__search {
    padding-left: 15px;
  }
}

.vs__dropdown-toggle {
  height: 50px;
  border: 1px solid #aaa;
  border-radius: $b-radius-6;
}
.vs__actions svg {
  fill: $color-success !important;
}
</style>
