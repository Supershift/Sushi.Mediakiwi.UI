<template>
  <div class="content-container row">
    <div class="col main-container">
      <OverlayLoader />
      <!-- <BreadCrumbs /> -->
      <template
        v-if="
          fetchedTopButtons && fetchedForms && false &&
          checkWindowWidth
        ">
        <ButtonListComponent
          :buttons="fetchedTopButtons"
          :forms="fetchedForms"
        />
      </template>

      <NotificationComponent />

      <template
        v-if="
          fetchedFolders && fetchedFolders.length
        ">
        <FolderComponent/>
      </template>
      <template
        v-if="
          fetchedForms && fetchedForms.length
        ">
          <FormComponent
            :forms="fetchedForms"
            />
      </template>

      <template
        v-if="
          fetchedBottomButtons && fetchedForms && false &&
          checkWindowWidth
        ">
        <ButtonListComponent
          :buttons="fetchedBottomButtons"
          :forms="fetchedForms" />
      </template>

      <template
        v-if="
          fetchedGrids && fetchedGrids.length
        ">
        <GridComponent
          v-for="(grid, index) in fetchedGrids"
          :key="index"
          :grid="grid"
          :pagination="grid.pagination" />
      </template>

      <ResourcesComponent />

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
import {IMessage, IView} from "../models/Local/Interfaces";
import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import FolderComponent from "./folder/FolderComponent.vue";
import ResourcesComponent from "./resources/ResourcesComponent.vue";
import ButtonListComponent from "./ButtonListComponent.vue";
import NotificationComponent from "./notification/NotificationComponent.vue";
import FileUpload from "./file-upload/FileUpload.vue";
import BreadCrumbs from "./breadcrumbs/breadcrumbs.vue";
import {getViewTypeName} from "@/models/Local/Enums";
import OverlayLoader from "@/components/OverlayLoader.vue";

export default defineComponent({
  name: "MainView",
  components: {
    FormComponent,
    GridComponent,
    FolderComponent,
    ResourcesComponent,
    ButtonListComponent,
    NotificationComponent,
    FileUpload,
    BreadCrumbs,
    OverlayLoader,
  },
  setup() {
    const breakpointTablet = 986;
    const fetchedForms = computed(
      () => store.getters["Content/forms"]
    );

    const fetchedGrids = computed(
      () => store.getters["Content/grids"]
    );

    const fetchedFolders = computed(
      () => store.getters["Content/folders"]
    );

    const fetchedTopButtons = computed(
      () => store.getters["Content/topButtons"]
    );

    const fetchedBottomButtons = computed(
      () => store.getters["Content/bottomButtons"]
    );

    const fetchedFieldValues = computed(
      () => store.getters.fieldValues
    );

    const fetchedViews = computed(
      () => store.getters["Content/views"]
    );

    // resources is fetched inside of the component

    const customNotifications = ref<
      IMessage[]
    >([]);

    const checkWindowWidth = computed(
      () => window.innerWidth > breakpointTablet
    );
    function getTypeName(view: IView) {
      if (view && view.type) {
        return getViewTypeName(view.type);
      }
      return null;
    }

    return {
      customNotifications,
      fetchedForms,
      fetchedGrids,
      fetchedFolders,
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
