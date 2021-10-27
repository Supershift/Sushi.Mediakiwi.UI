<template>
    <div :class="classname">
        <label v-if="prefix(textline)" v-html="prefix(textline)"></label>
        <label 
          :class="getClass(textline)"
          :name="textline.propertyName"
          :id="textline.propertyName"
        >
          {{ valueRef.value }}
        </label>
        <label v-if="suffix(textline)" v-html="suffix(textline)"></label>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import FieldModel from '../../models/FieldModel';
import { fieldMixins, vueTypes } from './index';

export default defineComponent({
  props: {
    textline: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
  },
  mixins: [fieldMixins],
  setup(props, context) {
    let valueRef = ref("");
    let classes = ref("");
    const id = computed(() => {
      return props.textline.propertyName;
    });
    onMounted(() => {
      valueRef.value = props.textline.value;
      !valueRef.value ? valueRef.value = "&nbsp;" : false;
      if (props.textline.vueType == vueTypes.formChoiceCheckbox) {
        classes.value.concat(" half short");
        props.textline.value ? valueRef.value = "Yes" : "No";
      }
    })
    function getClass(field: FieldModel) {
      let expression = ''; //this.expressCell(field.expression);
      if (typeof (field.className) !== 'undefined' && field.className) {
        expression += ` ${field.className}`;
      }
      return expression;
    }
    return {
      id,
      classes,
      getClass,
    };
  },
})
</script>
