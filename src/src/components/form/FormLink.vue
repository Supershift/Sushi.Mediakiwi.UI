
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
            <figure class="icon-x del" />
            <input
              :id="itemID"
              type="hidden"
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
          <figure class="icon-plus" />
        </a>
      </div>
      <div class="clear" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive, } from "vue";
import { observer } from "vue-mutation-observer";
import { portalName } from "../../utils/utils";
import { fieldMixins } from "./index";
import route from "vue-router";
import FieldModel from "../../models/FieldModel";

export default defineComponent({
  name: "FormLink",
  directives: {
    observer,
  },
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
  setup(props, context) {
    let rootPath = computed(() => route.useRoute().path);
    let valueRef = reactive({});
    const fieldID = computed((option) => {
      return `_e125c${option._uid}`;
    });
    const newLayerUrl = computed(() => {
      return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${fieldID}`;
    });
    const itemLayerUrl = computed(() => {
      if (props.field.value && props.field.contentTypeID) {
        return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${fieldID}&item=${props.field.contentTypeID}`;
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
        return `${props.field.contentTypeID}|${props.field.value}`;
      }
      return "";
    });
    const valueLabel = computed(() => {
      if (props.field.value && props.field.value) {
        return `${props.field.value}`;
      } // <span>(${this.link.width}px / ${this.link.height}px)</span>`
      return "";
    });
    function handler(mutationList: Event) {
      if (props.field.event !== "none") {
        if (mutationList) {
          let elmID = mutationList[0].target.id;
          let input = document.querySelector(`ul#${elmID} input[id^="${elmID.substr(1)}"]`);
          if (input) {
            let id = parseInt(input.nodeValue.split("|")[0], 10);
            let label = input.nodeValue.split("|")[1];

            let link = {
              id,
              label,
            };
            valueRef =  link;
          } else {
            valueRef = "";
          }
          context.emit("onChange", null, props.field);
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
      valueRef,
      dataLayer,
    };
  },
});
</script>


<style scoped lang="scss">

</style>