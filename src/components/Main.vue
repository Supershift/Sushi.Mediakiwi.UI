<template>
  <div class="content-container row">
    <div class="col main-container">
      <template
        v-if="
          fetchedTopButtons &&
          fetchedTopButtons.length
        ">
        <ButtonListComponent
          :buttons="fetchedTopButtons" />
      </template>

      <!-- TODO ADD NOTIFICATIONS HERE -->

      <template
        v-if="
          fetchedFolders && fetchedFolders.length
        ">
        <FolderComponent />
      </template>
      <template
        v-if="
          fetchedFields && fetchedFields.length
        ">
        <FormComponent
          :fields="fetchedFields"
          :notifications="customNotifications" />
      </template>

      <!-- eslint-disable vue/no-static-inline-styles -->
      <!-- <span
        style="
          position: absolute;
          right: 0px;
          top: 160px;
          z-index: 10000;
          font-size: 18px;
          overflow-y: auto;
          height: calc(100vh - 160px);
        ">
        fetchedFieldValues:
        <pre>{{ fetchedFieldValues }}</pre>
      </span> -->

      <template
        v-if="
          fetchedBottomButtons &&
          fetchedBottomButtons.length
        ">
        <ButtonListComponent
          :buttons="fetchedBottomButtons" />
      </template>

      <template
        v-if="
          fetchedGrids && fetchedGrids.length
        ">
        <GridComponent
          v-for="(grid, index) in fetchedGrids"
          :key="index"
          :grid="grid" />
      </template>

      <ResourcesComponent
        v-if="fetchedResources" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from "vue";

import {store} from "@/store";
import MessageModel from "../models/MessageModel";

import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import FolderComponent from "./folder/FolderComponent.vue";
import ResourcesComponent from "./resources/ResourcesComponent.vue";
import ButtonListComponent from "./ButtonListComponent.vue";

export default defineComponent({
  name: "MainView",
  components: {
    FormComponent,
    GridComponent,
    FolderComponent,
    ResourcesComponent,
    ButtonListComponent,
  },
  setup() {
    const fetchedFields = computed(
      () => store.getters.fields
    );

    const fetchedGrids = computed(
      () => store.getters.grids
    );

    const fetchedFolders = computed(
      () => store.getters.folders
    );

    const fetchedResources = computed(
      () => store.getters.resources
    );
    const fetchedTopButtons = computed(
      () => store.getters.topButtons
    );

    const fetchedBottomButtons = computed(
      () => store.getters.bottomButtons
    );

    const fetchedFieldValues = computed(
      () => store.getters.fieldValues
    );

    const customNotifications = ref<
      MessageModel[]
    >([]);

    return {
      customNotifications,
      fetchedFields,
      fetchedGrids,
      fetchedFolders,
      fetchedResources,
      fetchedTopButtons,
      fetchedBottomButtons,
      fetchedFieldValues,
    };
  },
});
</script>

<style lang="scss">
.content-container {
  margin: 0;
  overflow: auto;
  .main-container {
    margin: 0;
    padding-top: 15px;
    padding-left: 30px;
  }
}
.drawer-container {
  .main-container {
    padding-left: 50px;
  }
}
</style>
