<template>
  <div :class="classname">
    <textarea
      cols="32"
      rows="3"
      type="text"
      v-model="textarea.value"
      v-on="eventHandler(textarea, 'handleChange')"
      :class="fieldClass(textarea)"
      :name="textarea.propertyName"
      :id="textarea.propertyName"
      v-bind:disabled="textarea.disabled || textarea.readOnly"
      ref="root">
    </textarea>
  </div>
</template>
<script lang="ts">
import { onMounted, PropType, ref } from '@vue/runtime-core';
import { fieldMixins } from './index';
import FieldModel from '../../models/FieldModel';

export default {
  props: {
    textarea: {
      type: Object as PropType<FieldModel>,
      required: true,
    }
  },
  mixins: [fieldMixins],
  setup(props, context) {
    let offset = ref<number>(null);
    const root = ref(null);
    function handleChange(e: Event) {
      context.emit('onchange', e, props.textarea);
    }
    function autoResize(element: HTMLElement) {
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + offset.value + 'px';
    }
    onMounted(() => {
      root.addEventListener("input", (e) => autoResize(e.target));
    });
    return {
      offset,
      handleChange,
      autoResize
    };
  },
}
</script>
