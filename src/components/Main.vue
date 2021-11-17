<template>
  <div class="content-container row">
    <div class="col main-container">
      <template
        v-if="
          fetchedTopButtons &&
          fetchedTopButtons.length &&
          checkWindowWidth
        ">
        <ButtonListComponent
          :buttons="fetchedTopButtons" 
        />
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

      <template
        v-if="
          fetchedBottomButtons &&
          fetchedBottomButtons.length &&
          checkWindowWidth
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

      <template
        v-if="
          fetchedViews && fetchedViews.length
        ">
        <Component
          v-for="view in fetchedViews"
          :key="view.id"
          :is="getTypeName(view)"
          :view="view" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from "vue";

import {store} from "../store";
import MessageModel from "../models/MessageModel";

import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import FolderComponent from "./folder/FolderComponent.vue";
import ResourcesComponent from "./resources/ResourcesComponent.vue";
import ButtonListComponent from "./ButtonListComponent.vue";
import FileUpload from "./file-upload/FileUpload.vue";
import {getViewTypeName} from "@/models/Mediakiwi/ViewType";
import ViewModel from "@/models/Mediakiwi/ViewModel";

export default defineComponent({
  name: "MainView",
  components: {
    FormComponent,
    GridComponent,
    FolderComponent,
    ResourcesComponent,
    ButtonListComponent,
    FileUpload,
  },
  setup() {
    const breakpointTablet = 986;
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

    const fetchedViews = computed(
      () => store.getters.views
    );

    const customNotifications = ref<
      MessageModel[]
    >([]);

    const checkWindowWidth = computed(
      () => window.innerWidth > breakpointTablet
    );
    function getTypeName(view: ViewModel) {
      if (view && view.type) {
        return getViewTypeName(view.type);
      }
      return null;
    }

    return {
      customNotifications,
      fetchedFields,
      fetchedGrids,
      fetchedFolders,
      fetchedResources,
      fetchedTopButtons,
      fetchedBottomButtons,
      fetchedFieldValues,
      checkWindowWidth,
      fetchedViews,
      getTypeName,
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
    padding: 15px;
    padding-left: 10px;
    padding-right: 30px;
    touch-action: manipulation;
    max-width: calc(100vw - 110px);
  }
}
@media (min-width: $grid-m) {
  .content-container{
    .main-container {
      padding-left: 30px;
      max-width: unset;
    }
  }
}
</style>
