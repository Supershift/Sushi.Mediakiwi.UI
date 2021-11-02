<template>
  <div class="content-container row">
    <div class="col main-container">
      <template
        v-if="
          fetchedFolders && fetchedFolders.length
        ">
        <FolderComponent />
      </template>
      <FormComponent
        :fields="fetchedFields"
        :notifications="customNotifications" />
      <!-- <FormRichText
        :richtext="customRichText"
        classname="test" />
      <FormDropDown
        :field="test"
        classname="test" />
      <FormTags :tags="test" classname="test" />
      <FormTextArea
        :textarea="test"
        classname="test" />
      <FormValueCollection
        :field="test"
        classname="test" />
      <FormDate :field="test" valueType="date" />
      <FormTime :field="test" valueType="time" />
      <FormNameValueCollection
        :field="test"
        classname="test" />
      <FormTextLine
        :textline="test"
        classname="test" />
      <FormChoiceRadio
        :field="test"
        classname="test" />
      <FormChoiceCheckBox
        :field="test"
        classname="test" /> -->
      <template v-if="grids && grids.length">
        <GridComponent
          v-for="(grid, index) in grids"
          :key="index"
          :grid="grid" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
} from "vue";

import {store} from "@/store";
import FormDropDown from "./form/FormDropDown.vue";
import FormTags from "./form/FormTag.vue";
import FormTextArea from "./form/FormTextArea.vue";
import FormValueCollection from "./form/FormValueCollection.vue";
import FormDate from "./form/FormDate.vue";
import FormNameValueCollection from "./form/FormNameValueCollection.vue";
import FormTextLine from "./form/FormTextLine.vue";
import FormRichText from "./form/FormRichText.vue";
import FormChoiceRadio from "./form/FormChoiceRadio.vue";
import FormChoiceCheckBox from "./form/FormChoiceCheckBox.vue";
import FormTime from "./form/FormTime.vue";

import SelectModel from "../models/SelectModel";
import RadioModel from "../models/RadioModel";
import CheckboxModel from "../models/CheckboxModel";
import FieldModel from "../models/FieldModel";
import MessageModel from "../models/MessageModel";

import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import FolderComponent from "./folder/FolderComponent.vue";
import OptionModel from "../models/OptionModel";
import GridModel from "@/models/Mediakiwi/GridModel";

export default defineComponent({
  name: "MainView",
  components: {
    // FormChoiceRadio,
    // FormRichText,
    FormComponent,
    GridComponent,
    FolderComponent,
    // FormDropDown,
    // FormTags,
    // FormTextArea,
    // FormValueCollection,
    // FormDate,
    // FormTime,
    // FormNameValueCollection,
    // FormTextLine,
    // FormChoiceCheckBox,
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

    // TODO Delete
    const customSelectTestOptions = [
      {
        value: 0,
        name: "test",
        text: "test",
        countForOption: 1,
      },
      {
        value: 1,
        name: "test",
        text: "test",
        countForOption: 2,
      },
    ] as OptionModel[];

    const customSelectTestInput =
      ref<SelectModel>({
        error: "",
        disabled: false,
        mandatory: false,
        value: "",
        tabindex: 0,
        fieldName: "main-select",
        fieldIcon: "",
        customClass: "select-primary",
        hasValidation: false,
        isValid: true,
        showLabel: true,
        showDefault: true,
        defaultLabel: "",
        options: customSelectTestOptions,
        multiple: false,
      });
    const customRadioTestInput = ref<RadioModel>({
      disabled: false,
      fieldValue: "",
      fieldName: "main-radio",
      fieldIcon: "",
      fieldGroupName: "r_main",
      prefix: "Hello",
      suffix: "World",
      customClass: "radio-primary",
      options: customSelectTestOptions,
    });
    const customCheckboxTestInput =
      ref<CheckboxModel>({
        disabled: false,
        fieldValue: "",
        fieldName: "main-checkbox",
        fieldIcon: "",
        fieldGroupName: "cb_main",
        prefix: "Hello",
        suffix: "World",
        customClass: "checkbox-primary",
        options: customSelectTestOptions,
      });
    const customFields = ref<FieldModel[]>([
      {
        contentTypeID: 10,
        propertyName: "TestProperty",
        propertyType: "string",
        fieldIcon: "plus",
        title: "Test Property",
        vueType: "5",
        expression: 1,
        value: "User input",
        options: null,
        className: null,
        event: null,
        inputPost: null,
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
      },
    ]);
    const test = ref<FieldModel>({
      contentTypeID: 10,
      propertyName: "TestProperty",
      propertyType: "string",
      fieldIcon: "plus",
      title: "Test Property",
      vueType: "5",
      expression: 1,
      value: "User input",
      options: [
        {
          name: "test",
          text: "test",
          value: "wd",
          countForOption: 1,
        },
        {
          text: "test2",
          name: "test2",
          value: "daw",
          countForOption: 1,
        },
      ],
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
    const customRichText = ref<FieldModel>({
      contentTypeID: 10,
      propertyName: "TestProperty",
      propertyType: "string",
      fieldIcon: "plus",
      title: "Test Property",
      vueType: "5",
      expression: 1,
      value: "User input",
      options: null,
      className: null,
      event: null,
      inputPost: null,
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
      customSelectTestInput,
      customRadioTestInput,
      customCheckboxTestInput,
      customFields,
      customNotifications,
      fetchedFields,
      customRichText,
      test,
      grids,
      fetchedFolders,
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
