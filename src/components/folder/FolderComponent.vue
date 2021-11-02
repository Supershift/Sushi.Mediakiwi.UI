<template>
  <section class="component folder-collection">
    <article class="column-3">
      <Folder
        v-for="(folder, index) in folders"
        :key="index"
        :folder="folder" />
    </article>
  </section>
</template>

<script lang="ts">
import Folder from "./Folder.vue";
import {store} from "@/store";
import {computed, defineComponent} from "vue";

export default defineComponent({
  components: {
    Folder,
  },
  setup() {
    const folders = computed(
      () => store.getters.folders
    );
    return {
      folders,
    };
  },
});
</script>

<style scoped lang="scss">
.folder-collection {
  margin-bottom: -20px;
  min-height: 600px;

  .column {
    &-1 {
      width: 100%;
    }

    &-2 {
      column-count: 2;
      column-gap: 15px;
      column-width: 50%;
    }

    &-3 {
      column-count: 3;
      column-gap: 15px;
      column-width: 33%;
    }
  }
}
</style>
