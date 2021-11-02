<template>
  <div :class="nameValueCollectionContainerClasses">
    <label v-if="undefinedCheck(field.prefix)">{{ undefinedCheck(field.prefix) }}</label>
    <section
      :class="nameValueCollectionClasses"
      v-for="(nameValue, index) of valueNameValueRef"
      :key="nameValue"
    >
      <FormNameValue
        :field="getField(nameValue, index)"
        @onchange="handleChange"
      />
      <fa
        icon="times"
        class="delete "
        @click="removeNameValuePair(nameValue)"
      />
    </section>
    <FormPlus
      :field="plusField"
      @click="addNameValuePair"
      classname="small"
    />
    <label v-if="undefinedCheck(field.suffix)"> {{ undefinedCheck(field.suffix) }}</label>
  </div>
</template>

<script lang="ts">
import { fieldMixins, emptyField, FieldType} from "./index";
import FormPlus from "./FormPlus.vue";
import FormNameValue from "./FormNameValue.vue";
import { computed, defineComponent, onBeforeMount, PropType, ref } from "vue";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
    name: "FormNameValueCollection",
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
      FormPlus,
      FormNameValue
    },
    setup(props, context) {
      let valueNameValueRef = ref<Array<FieldModel>>([]);
      const nameValueCollectionClasses = computed(() => `name-value-collection ${props.field.className}`);
      const nameValueCollectionContainerClasses = computed(() => `name-value-collection-container ${props.classname}`);
      const plusField = computed(() => Object.assign({}, emptyField));
      function getField(nameValue: string, index: number) {
        let field = Object.assign({}, emptyField);
        field.vueType = FieldType.formNameValue;
        field.propertyName = `${props.field.propertyName}_${index}`;
        field.value = nameValue;
        field.event = props.field.event;
        return field;
      }
      function addNameValuePair() {
        valueNameValueRef.value.push(emptyField);
      }
      function handleChange(e: Event) {
          context.emit("onChange", e, valueNameValueRef);
      }
      function removeNameValuePair(nameValuePair: string) {
        let index = valueNameValueRef.value.findIndex((r: FieldModel) => r.value === nameValuePair && r.value === nameValuePair);
        valueNameValueRef.value.splice(index, 1);
      }
      onBeforeMount(() => {
        // valueRef.value.push({propertyName: "",});
      });
      return {
        nameValueCollectionClasses,
        nameValueCollectionContainerClasses,
        removeNameValuePair,
        addNameValuePair,
        handleChange,
        valueNameValueRef,
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