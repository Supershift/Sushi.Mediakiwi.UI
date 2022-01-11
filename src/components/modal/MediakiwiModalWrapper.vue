<template>
  <MediakiwiModal
    :show-modal="showModal"
    :config="config"
    @soft-close="softClose"
    @close="close"></MediakiwiModal>
</template>

<script lang="ts">
import {ILayerConfiguration} from "@/models/Mediakiwi/Interfaces";
import {mediakiwiLogic} from "@/utils/mediakiwiLogic";
import {
  defineComponent,
  onBeforeMount,
  PropType,
  ref,
} from "vue";
import MediakiwiModal from "./MediakiwiModal.vue";

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ILayerConfiguration>,
      required: false,
    },
  },
  components: {
    MediakiwiModal,
  },
  setup() {
    const showModal = ref<boolean>(true);

    function softClose() {
      showModal.value = false;
    }

    function keyDown(e: KeyboardEvent) {
      // .keyCode and .which are depricated, use like this
      if (e.code === "Escape") {
        softClose();
      }
    }

    function close() {
      mediakiwiLogic.closeLayer(true);
      document.removeEventListener(
        "keydown",
        keyDown
      );
    }

    onBeforeMount(() => {
      document.addEventListener(
        "keydown",
        keyDown
      );
    });

    return {
      showModal,
      close,
      softClose,
    };
  },
});
</script>
