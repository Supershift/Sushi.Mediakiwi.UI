<template>
  <div class="content-container row">
    <div class="col main-container">
      <CustomSelectInput :select="customSelectTestInput" />
      <CustomChoiceRadio :radio="customRadioTestInput" />
      <CustomChoiceCheckBox :checkbox="customCheckboxTestInput" />
      <FormComponent :fields="fetchedFields" :notifications="customNotifications" />
      <RichText :richtext="customRichText" />
      <!-- <DropDown :field="test" /> -->
      <!-- <Link /> -->
      <Grid :grid="customGrid"></Grid>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import CustomSelectInput from "./form/CustomSelectInput.vue";
import SelectModel from "../models/SelectModel";
import RadioModel from "../models/RadioModel";
import CustomChoiceRadio from "./form/CustomChoiceRadio.vue";
import CustomChoiceCheckBox from "./form/CustomChoiceCheckBox.vue";
import RichText from "../components/form/FormRichText.vue";
import CheckboxModel from "../models/CheckboxModel";
import FormComponent from "./form/FormComponent.vue";
import FieldModel from "../models/FieldModel";
import MessageModel from "../models/MessageModel";
import store from "../store";
// import DropDown from "./form/FormDropDown.vue";
// import Link from "./form/FormLink.vue";
import GridModel from "../models/GridModel";

export default defineComponent({
  name: "MainView",
  components: {
    CustomSelectInput,
    CustomChoiceRadio,
    CustomChoiceCheckBox,
    RichText,
    FormComponent,
    // DropDown,
    // Link,
  },
  setup() {
    const fetchedFields = computed(() => store.getters.fields);
    const customSelectTestOptions = [
      {
        value: 0,
        name: "test",
        countForOption: 1,
      },
      {
        value: 0,
        name: "test",
        countForOption: 2,
      },
    ];
    const customSelectTestInput = ref<SelectModel>({
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
    const customCheckboxTestInput = ref<CheckboxModel>({
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
        error: { message: "", isError: false, propertyName: "" },
        locale: "",
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
      error: { message:"", isError: false, propertyName:"" } ,
      locale: "",
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
      error: { message:"", isError: false, propertyName:"" } ,
      locale: "",
    });
    const customNotifications = ref<MessageModel[]>([]);

    const customGrid = reactive<GridModel>({
      columns: [
        {
          title: "Order",
          width: "200",
          align: 0,
        },
        {
          title: "Number",
          width: "200",
          align: 0,
        },
      ],
      rows: [
        {
          gridItems: [
            {
              column: 0,
              value: "1",
              href: null,
              vueType: "5",
            },
            {
              column: 0,
              value: "12312",
              href: null,
              vueType: "5",
            },
          ],
          rowID: 0,
        },
        {
          gridItems: [
            {
              column: 0,
              value: "2",
              href: null,
              vueType: "5",
            },
            {
              column: 0,
              value: "345345",
              href: null,
              vueType: "5",
            },
          ],
          rowID: 1,
        },
      ],
    });

    return {
      customSelectTestInput,
      customRadioTestInput,
      customCheckboxTestInput,
      customFields,
      customNotifications,
      fetchedFields,
      customRichText,
      test,
      customGrid,
    };
  },
});
</script>

<style lang="scss">
.content-container {
  margin: 0;
  height: 100vh;
  overflow: auto;
  .main-container {
    margin: 0;
    padding-top: 15px;
    padding-left: 50px;
  }
}
</style>
