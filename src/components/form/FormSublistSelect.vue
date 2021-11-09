<template>
  <div class="long">
    <div class="multiSortable select">
      <ul :id="componentId" class="single add">
        <li class="instant">
          <a
            class="openlayer"
            @click="openLayer"
            title="File Upload"
            v-html="valueLabel"></a>
          <figure class="icon-x del"></figure>
          <input
            type="hidden"
            :id="itemId"
            :name="itemId"
            :class="sublistClasses"
            />
        </li>
      </ul>
    </div>
    <div class="buttonContainer">
      <a
        class="openlayer"
        title="File Upload"
        @click="openLayer">
        <!-- eslint-disable-next-line vue/no-unregistered-components -->
        <fa icon="plus"></fa
      ></a>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ref,
  defineComponent,
  onMounted,
  PropType,
} from "vue";
import FieldModel from "@/models/Mediakiwi/FieldModel";
import {getSublistSelectValueLabel} from ".";
import {mediakiwiLogic} from "@/utils/mediakiwiLogic";

export default defineComponent({
  props: {
    field: {
      type: Object as PropType<FieldModel>,
      required: true,
    },
  },
  emits: ["on-change"],
  setup(props, context) {
    const valueRef = ref(props.field.value);
    const sublistClasses = computed(() => {
      return `sublist-primary ${props.field.className}`;
    });

    const componentId = computed<string>(
      () => props.field.propertyName
    );

    const itemId = computed<string>(
      () => `${componentId.value}_hidden`
    );

    const valueLabel = computed(() =>
      getSublistSelectValueLabel(valueRef.value)
    );

    function handleChange() {
      context.emit(
        "on-change",
        null,
        props.field,
        valueRef
      );
    }

    function openLayer() {
      if (props.field.layerConfiguration) {
        mediakiwiLogic.openLayer(
          props.field.layerConfiguration
        );
      }
    }

    onMounted(() => {
      const targetNode = document.querySelector(
        `ul#${componentId.value} input#${itemId.value}`
      );
      const observerOptions = {
        attributes: true,
      };
      const observer = new MutationObserver(
        () => {
          let input = document.querySelector(
            `input#${itemId.value}`
          ) as HTMLInputElement;

          if (input && input.value) {
            valueRef.value = JSON.parse(
              input.value
            );
            handleChange();
          }
        }
      );
      if (targetNode) {
        observer.observe(
          targetNode,
          observerOptions
        );
      }
    });

    return {
      valueRef,
      valueLabel,
      componentId,
      itemId,
      openLayer,
      handleChange,
      sublistClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
.long {
  position: relative;
  display: flex;
  flex-direction: row;

  div.select {
    flex: 1;

    ul.single {
      list-style: none;
      overflow: auto !important;
      margin: 0;
      padding: 0;
      width: 100%;
      float: left;
      height: 50px;
      min-height: 31px;
      border: 1px solid #dddee0;
      border-radius: 4px;


      li {
        margin: 0;
        padding: 15px 0 0 10px !important;
        cursor: pointer;
        color: #000 !important;
        font-weight: 400 !important;
        font-size: 13px;
        user-select: none;
        -webkit-user-select: none;
        &:last-child {
          border-bottom: none;
        }

        a {
          color: #000 !important;
        }

        figure {
          position: absolute;
          right: 10px;
          margin-top: -17px;
          color: #4e5862;
          font-size: 120%;
          &:last-of-type {
            position: absolute;
            right: 10px !important;
            left: auto;
            color: #c0c3c7;
            font-size: 120%;
          }
        }
      }
    }
  }
  div.buttonContainer {
    float: left;
    margin: 0 0 0 10px;

    a {
      display: inline-block;
      text-align: center;
      border-radius: 2px !important;
      background: $color-main;
      box-shadow: $box-shadow-1;
      padding: 15px;

      svg {
        color: white;
      }
    }
  }
}
.sublist-primary {
  background: #fff;
}
</style>
