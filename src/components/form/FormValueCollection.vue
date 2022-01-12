<template>
  <div :class="classname">
    <label v-if="undefinedCheck(field.prefix)">{{
      undefinedCheck(field.prefix)
    }}</label>
    <section
      v-for="(nameValue, index) of valueRef"
      :key="nameValue"
      :class="valueCollectionClasses">
      <FormValue
        :field="getField(nameValue, index)"
        @on-change="handleChange" />
      <!-- eslint-disable-next-line vue/no-unregistered-components -->
      <fa
        icon="times"
        class="delete"
        @click="removeNameValuePair(nameValue)" />
    </section>
    <FormPlus
      :field="plusField"
      classname="small"
      @click="addNameValuePair" />
    <label v-if="undefinedCheck(field.suffix)">{{
      undefinedCheck(field.suffix)
    }}</label>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  ref,
} from "vue";
import {fieldMixins, emptyField} from "./index";
import FormPlus from "./FormPlus.vue";
import FormValue from "./FormValue.vue";
import {IField} from "../../models/Mediakiwi/Interfaces";
import {MediakiwiFormVueTypeEnum} from "@/models/Mediakiwi/Enums";

export default defineComponent({
  name: "FormValueCollection",
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [fieldMixins],
  components: {
    FormValue,
    FormPlus,
  },
  emits: ["value-changed"],
  setup(props, context) {
    let valueRef = ref<Array<IField>>([]);
    const valueCollectionClasses = computed(
      () =>
        `name-value-collection ${props.field.className}`
    );
    const valueCollectionContainerClasses =
      computed(
        () =>
          `name-value-collection-container ${props.classname}`
      );
    const plusField = computed(() =>
      Object.assign(emptyField, {propertyName:"plusField", fieldIcon:"plus", readOnly: props.field.isReadOnly, vueType: MediakiwiFormVueTypeEnum.formPlus, placeholder: "Empty value"}) as IField
    );
    function getField(
      nameValue: string,
      index: number
    ) {
      const field = Object.assign(emptyField, {vueType:MediakiwiFormVueTypeEnum.formValue, propertyName: `${props.field.propertyName}_${index}`, value: nameValue, event: props.field.event, readOnly: props.field.isReadOnly});
      return field;
    }
    function addNameValuePair() {
      if (!props.field.isReadOnly) {
        valueRef.value.push(emptyField);
      }
    }
    function handleChange() {
      context.emit("value-changed", valueRef, props.field);
    }
    function removeNameValuePair(
      nameValuePair: string
    ) {
      let index = valueRef.value.findIndex(
        (r: IField) =>
          r.value === nameValuePair &&
          r.value === nameValuePair
      );
      valueRef.value.splice(index, 1);
    }
    onBeforeMount(() => {
      // valueRef.value.push({propertyName: "",});
    });
    return {
      valueCollectionClasses,
      valueCollectionContainerClasses,
      removeNameValuePair,
      addNameValuePair,
      handleChange,
      valueRef,
      plusField,
      getField,
    };
  },
});
</script>

<style scoped lang="scss">
.name-value-collection {
  display: inline-flex;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;

  .name-value {
    input:first-child {
      width: calc(33% + 7px);
    }
    input:only-child {
      width: 100%;
    }
  }

  .delete {
    margin-left: 10px;
    font-size: 125%;
    color: $color-success;
  }
}
</style>
