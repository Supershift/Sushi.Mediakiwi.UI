<template>
  <transition
    name="modal"
    v-show="showModal"
    @after-leave="afterLeave">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          :style="customStyle">
          <div class="modal-header">
            <h1>{{ config.title }}</h1>
            <!-- eslint-disable-next-line vue/no-unregistered-components -->
            <fa
              icon="times"
              class="icon-close"
              title="Close"
              @click="softClose"></fa>
          </div>
          <div class="modal-body">
            <iframe
              :src="config.href"
              :title="config.title"></iframe>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import LayerConfigurationModel from "@/models/Mediakiwi/LayerConfigurationModel";
import {
  defineComponent,
  PropType,
  ref,
} from "vue";

export default defineComponent({
  props: {
    showModal: {
      type: Object as PropType<boolean>,
      required: true,
    },
    config: {
      type: Object as PropType<LayerConfigurationModel>,
      required: false,
    },
  },
  emits: ["soft-close", "close"],
  setup(props, context) {
    const customStyle = ref<string>();

    if (props.config) {
      customStyle.value = `width:${props.config.width};height:${props.config.height}`;
    }

    function softClose() {
      context.emit("soft-close");
    }

    function afterLeave() {
      context.emit("close");
    }

    return {
      customStyle,
      softClose,
      afterLeave,
    };
  },
});
</script>


<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  .modal-header {
    display: flex;
    flex-direction: row;
    padding: 20px 30px 0;

    h1 {
      font-family: $font-primary;
      margin: 0;
      flex: 1;
    }

    .icon-close {
      font-size: 23px;
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      cursor: pointer;
    }
  }

  .modal-body {
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
    }
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
