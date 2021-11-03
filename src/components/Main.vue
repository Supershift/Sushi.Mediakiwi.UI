<template>
  <div class="content-container row">
    <div class="col main-container">
      <template v-if="fetchedButtons && fetchedButtons.length">
        <ButtonListComponent
          :fields="fetchedButtons"
          classname="test" />
      </template>
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

      <template v-if="grids && grids.length">
        <GridComponent
          v-for="(grid, index) in grids"
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
import FieldModel from "../models/FieldModel";
import MessageModel from "../models/MessageModel";

import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import FolderComponent from "./folder/FolderComponent.vue";
import ResourcesComponent from "./resources/ResourcesComponent.vue";
import ButtonListComponent from "./ButtonListComponent.vue";
import OptionModel from "../models/OptionModel";
import ItemModel from "../models/OptionItemModel";

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

    const grids = computed(
      () => store.getters.grids
    );

    const fetchedFolders = computed(
      () => store.getters.folders
    );

    const fetchedResources = computed(
      () => store.getters.resources
    );

    const fetchedButtons = computed(
      () => store.getters.buttons
    );

    // TODO Delete
    const customItemsTest = [
      {
        value: "Hello",
        text: "hello",
        enabled: true,
        selected: true,
      },
      {
        value: "world",
        text: "world",
        enabled: true,
        selected: false,
      },
      {
        value: "test",
        text: "test",
        enabled: true,
        selected: false,
      },
    ] as ItemModel[];
    const customOptionTest = {
      items: customItemsTest,
      count: 1,
    } as OptionModel;

    const test = ref<FieldModel>({
      contentTypeID: 10,
      propertyName: "TestProperty",
      propertyType: "string",
      fieldIcon: "plus",
      title: "Test Property",
      vueType: "5",
      expression: 1,
      value: "User input",
      options: customOptionTest,
      className: null,
      event: null,
      inputPost: "test123",
      section: 0,
      hidden: null,
      groupName: null,
      suffix: null,
      prefix: null,
      formSection: null,
      canToggleSection: false,
      canDeleteSection: false,
      toggleDefaultClosed: false,
      readOnly: false,
      helpText: "This field can do stuff",
      componentKey: 0,
      error: {
        message: "",
        isError: false,
        propertyName: "",
      },
      locale: "",
      weekStart: 7,
    });
    const customNotifications = ref<
      MessageModel[]
    >([]);

    return {
      customNotifications,
      fetchedFields,
      test,
      grids,
      fetchedButtons,
      fetchedFolders,
      fetchedResources,
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
    padding-left: 50px;
  }
}
</style>
