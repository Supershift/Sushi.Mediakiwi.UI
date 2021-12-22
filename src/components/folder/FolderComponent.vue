<template>
  <section class="component folder-collection">
    <article class="folder-column">
      <Folder
        v-for="folder in folders"
        :key="folder.id"
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
      () => store.getters["Content/folders"]
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
  .folder-column {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
