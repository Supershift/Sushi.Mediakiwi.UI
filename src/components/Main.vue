<template>
  <div class="content-container row">
    <div class="col main-container">
      <FormComponent
        :fields="fetchedFields"
        :notifications="customNotifications"
      />
      <FormRichText
        :field="customRichText"
        classname="test"
      />
      <FormChoiceDropdown
        :field="test"
        classname="test"
      />
      <FormTags
        :field="test"
        classname="test"
      />
      <FormTextArea
        :field="test"
        classname="test"
      />
      <FormValueCollection
        :field="test"
        classname="test"
      />
      <FormDate
        :field="test"
        value-type="date"
      />
      <FormTime
        :field="test"
        value-type="time"
      />
      <FormNameValueCollection
        :field="test"
        classname="test"
      />
      <FormTextLine
        :field="test"
        classname="test"
      />
      <FormChoiceRadio
        :field="test"
        classname="test"
      />
      <FormChoiceCheckBox
        :field="test"
        classname="test"
      />
      <GridComponent :grid="customGrid" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";

import store from "../store";

import FormChoiceDropdown from "./form/FormChoiceDropDown.vue";
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

import GridModel from "../models/GridModel";
import FieldModel from "../models/FieldModel";
import MessageModel from "../models/MessageModel";

import GridComponent from "./grid/GridComponent.vue";
import FormComponent from "./form/FormComponent.vue";
import OptionModel from "../models/OptionModel";
import ItemModel from "../models/ItemModel";


export default defineComponent({
  name: "MainView",
  components: {
    FormChoiceRadio,
    FormRichText,
    FormComponent,
    GridComponent,
    FormChoiceDropdown,
    FormTags,
    FormTextArea,
    FormValueCollection,
    FormDate,
    FormTime,
    FormNameValueCollection,
    FormTextLine,
    FormChoiceCheckBox, 
  },
  setup() {
    const fetchedFields = computed(() => store.getters.fields);
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
    const customOptionTest = 
    {
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
      error: { message: "", isError: false, propertyName: "" },
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
      error: { message: "", isError: false, propertyName: "" },
      locale: "",
      weekStart: 7,
    });
    const customNotifications = ref<MessageModel[]>([]);

    const customGrid = reactive<GridModel>({
      title: "custom grid",
      layerConfiguration: null,
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
          href: "?edit",
          id: "0",
          gridItems: [
            {
              column: 0,
              value: "1",
              vueType: "5",
              canWrap: false,
            },
            {
              column: 0,
              value: "12312",
              vueType: "5",
              canWrap: false,
            },
          ],
        },
        {
          href: "?edit",
          id: "1",
          gridItems: [
            {
              column: 0,
              value: "2",
              vueType: "5",
              canWrap: false,
            },
            {
              column: 0,
              value: "345345",
              vueType: "5",
              canWrap: false,
            },
          ],
        },
      ],
    });

    return {
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
  overflow: auto;
  .main-container {
    margin: 0;
    padding-top: 15px;
    padding-left: 50px;
  }
}
</style>
