<template>
  <div :class="classname">
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <section
      v-for="(nameValue, index) of valueRef"
      :key="nameValue"
      :class="valueCollectionClasses"
    >
      <FormValue
        :field="getField(nameValue, index)"
        @onChange="handleChange"
      />
      <fa
        icon="times"
        class="delete "
        @click="removeNameValuePair(nameValue)"
      />
    </section>
    <FormPlus
      :field="plusField"
      classname="small"
      @click="addNameValuePair"
    />
    <label v-if="undefinedCheck(field.suffix)">{{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, ref } from "vue";
import { fieldMixins, FieldType, emptyField } from "./index";
import FormPlus from "./FormPlus.vue";
import FormValue from "./FormValue.vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
    name: "FormValueCollection",
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
      FormValue,
      FormPlus,
    },
    emits: ["onChange"],
    setup(props, context) {
      let valueRef = ref<Array<FieldModel>>([]);
      const valueCollectionClasses = computed(() => `name-value-collection ${props.field.className}`);
      const valueCollectionContainerClasses = computed(() => `name-value-collection-container ${props.classname}`);
      const plusField = computed(() => Object.assign({}, emptyField));
      function getField(nameValue: string, index: number) {
        let field = Object.assign({}, emptyField);
        field.vueType = FieldType.formValue;
        field.propertyName = `${props.field.propertyName}_${index}`;
        field.value = nameValue;
        field.event = props.field.event;
        return field;
      }
      function addNameValuePair() {
        valueRef.value.push(emptyField);
      }
      function handleChange(e: Event) {
          context.emit("onChange", e, valueRef);
      }
      function removeNameValuePair(nameValuePair: string) {
        let index = valueRef.value.findIndex((r: FieldModel) => r.value === nameValuePair && r.value === nameValuePair);
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