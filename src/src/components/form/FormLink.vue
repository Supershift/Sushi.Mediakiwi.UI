
<template>
  <div :class="classname">
    <div
      class="long"
      :class="fieldClass(field)"
    >
      <div class="multiSortable select">
        <input
          type="hidden"
          :name="fieldID"
          value="_MK$PH_"
        >
        <ul
          :id="fieldID"
          v-observer:subtree.childList="handler"
          class="single add"
        >
          <li class="instant">
            <a
              class="openlayer"
              :data-layer="dataLayer"
              title="File Upload"
              :href="itemLayerUrl"
            >
            {{ valueLabel }}
            </a>
            <figure class="icon-x del"></figure>
            <input
              type="hidden"
              :id="itemID"
              :name="itemID"
              :value="valueText"
            >
          </li>
        </ul>
      </div>
      <div class="buttonContainer">
        <a
          class="openlayer"
          :data-layer="dataLayer"
          :href="newLayerUrl"
          title="File Upload"
        >
          <figure class="icon-plus"></figure>
        </a>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from '@vue/reactivity';
import observer from "vue-mutation-observer";
import { portalName } from "../../utils/utils";
import { fieldMixins } from "./index";
import { defineComponent } from '@vue/runtime-core';
import route from "vue-router";

export default defineComponent({
  props: ["field", "classname"],
  mixins: [fieldMixins],
  directives: {
    observer,
  },
  setup(props, context) {
    let rootPath = computed(() => route.useRoute().path)
    const fieldID = computed((option) => {
      return `_e125c${option._uid}`;
    });
    const newLayerUrl = computed(() => {
      return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${fieldID}`;
    });
    const itemLayerUrl = computed(() => {
      if (props.field.value && props.field.value.id) {
        return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${fieldID}&item=${props.field.value.id}`;
      }
      return "";
    });
    const dataLayer  = computed(() => {
      return "width:790px,height:450px,iframe:true,scrolling:false";
    });
    const itemID = computed(() => {
      return `${fieldID}$1$0`;
    });
    const valueText = computed(() => {
      if (props.field.value) {
        return `${props.field.value.id}|${props.field.value.label}`;
      }
      return "";
    });
    const valueLabel = computed(() => {
      if (props.field.value && props.field.value) {
        return `${props.field.value.label}`;
      } // <span>(${this.link.width}px / ${this.link.height}px)</span>`
      return "";
    });
    function handler(mutationList) {
      if (props.field.event !== "none") {
        if (mutationList.length >= 1) {
          console.log("triggerChange:wimLink");
          let elmID = mutationList[0].target.id;
          let input = document.querySelector(`ul#${elmID} input[id^="${elmID.substr(1)}"]`);
          if (input) {
            let id = parseInt(input.nodeValue.split("|")[0]);
            let label = input.nodeValue.split("|")[1];

            let link = {
              id,
              label,
            };
            props.field.value = Object.assign({}, link);
          } else {
            props.field.value = undefined;
          }
          context.emit("onchange", undefined, props.field);
        }
      }
    }
    return {
      fieldID,
      itemID,
      handler,
      valueLabel,
      valueText,
      newLayerUrl,
      itemLayerUrl,
      dataLayer,
    };
  },
});
</script>
