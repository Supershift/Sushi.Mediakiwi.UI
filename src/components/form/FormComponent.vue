<template>
  <form id="uxForm" ref="uxForm">
    <div class="container" v-if="parentForms">
      <div class="" v-for="formRow in parentForms" :key="formRow">
        <div v-if="formRow.buttons && isTopSection(formRow)" class="row" >
          <div class="col">
            <component
              :is="checkVueType(field)"
              v-for="field in formRow.buttons"
              :key="field.propertyName"
              :field="field"
              @onclick="handleSubmit" 
              @button-clicked="handleSubmit"/>
          </div>
        </div>
        <div class="row" v-if="formRow.fields">
          <template v-for="field in formRow.fields">
              <component
                :is="checkVueType(field)"
                v-if="
                  checkVueType(field) ===
                  'FormSection'
                "
                :key="field.propertyName"
                v-model="field.value"
                :field="field"
                @value-changed="handleFieldsChanged(field)"/>
              <template v-else>
                <div
                  class="col"
                  v-show="showField(field)"
                  :key="field.propertyName"
                  :class="
                    expressCell(field.expression)
                  ">
                  <label
                    v-if="
                      !hideLabelForType(
                        field.vueType
                      )
                    "
                    :for="field.propertyName"
                    :title="field.title"
                    :class="{
                      mandatory: field.mandatory,
                    }">
                    {{ field.title }}
                  </label>
                </div>
                <div
                  class="col-xl"
                  :key="field.propertyName"
                  :class="
                    expressCell(field.expression)
                  ">

                    <component
                      :is="checkVueType(field)"
                      v-if="
                        field.vueType === 'FormButton'
                      "
                      :field="field"
                      :key="field.propertyName"
                      @onclick="
                        handleButtonClicked
                      "
                      @button-clicked="handleButtonClicked" />
                  <component
                    :is="
                      checkVueType(field) ===
                      'undefined'
                        ? 'FormInput'
                        : checkVueType(field)
                    "
                    v-else
                    :key="field"
                    :field="field"
                    v-model="field.value"
                    @value-changed="handleFieldsChanged" />
                </div>
              </template>
            </template>
          </div>
          <div v-if="formRow.buttons && !isTopSection" class="row">
            <div class="col">
              <component
                :is="checkVueType(field)"
                v-for="field in formRow.buttons"
                :key="field.propertyName"
                :field="field"
                @onclick="handleSubmit" 
                @button-clicked="handleSubmit"/>
            </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from "vue";
import {ILocalSection} from "../../models/Local/Interfaces";
import {fieldMixins} from "./index";
import FormButton from "./FormButton.vue";
import FormInput from "./FormInput.vue";
import FormSection from "./FormSection.vue";
import FormChoiceDropdown from "./FormChoiceDropDown.vue";
import FormTag from "./FormTag.vue";
import FormTextArea from "./FormTextArea.vue";
import FormValueCollection from "./FormValueCollection.vue";
import FormDate from "./FormDate.vue";
import FormPlus from "./FormPlus.vue";
import FormNameValueCollection from "./FormNameValueCollection.vue";
import FormText from "./FormText.vue";
import FormTextline from "./FormTextLine.vue";
import FormRichText from "./FormRichText.vue";
import FormChoiceRadio from "./FormChoiceRadio.vue";
import FormChoiceCheckbox from "./FormChoiceCheckBox.vue";
import FormTime from "./FormTime.vue";
import FormDateTime from "./FormDateTime.vue";
import FormSublistSelect from "./FormSublistSelect.vue";
import FormTooltip from "./FormTooltip.vue"
import {OutputExpressionTypeEnum, MediakiwiFormVueTypeEnum, ButtonSectionTypeEnum} from "@/models/Mediakiwi/Enums";
import { store } from "../../store";
import { ContentTypes } from "../../store/modules/Content";
import { IField, IForm, IPostContentMediakiwiRequest } from "../../models/Mediakiwi/Interfaces";

export default defineComponent({
  name: "FormComponent",
  props: {
    forms: {
      type: Object as PropType<Array<IForm>>,
      required: true,
    }
  },
  mixins: [OutputExpressionTypeEnum, fieldMixins],
  components: {
    FormPlus,
    FormButton,
    FormInput,
    FormSection,
    FormChoiceCheckbox,
    FormChoiceDropdown,
    FormTag,
    FormTextArea,
    FormValueCollection,
    FormNameValueCollection,
    FormDate,
    FormTime,
    FormDateTime,
    FormText,
    FormTextline,
    FormRichText,
    FormChoiceRadio,
    FormSublistSelect,
    FormTooltip,
  },
  emits: [
    "toggle",
    "add-fields",
    "remove-fields",
    "field-changed",
    "button-clicked",
  ],
  setup(props, context) {
    //TODO: Finish implementing a parent reference so that we can post it when clicking on a button
    const parentForms = ref<Array<IForm>>(props.forms);
    function isTopSection(form: IForm) {
      if (props.forms && form.buttons) {
        return form.buttons.some((b) => b.section === ButtonSectionTypeEnum.top)
      }
      return false;
    }
    function checkVueType(
      field: IField
    ): string {
      return MediakiwiFormVueTypeEnum[field.vueType];
    }
    function clean(label: string): string {
      return label
        .replace(
          /(?:^\w|[A-Z]|\b\w)/g,
          function (word, index) {
            return index === 0
              ? word.toLowerCase()
              : word.toUpperCase();
          }
        )
        .replace(/\s+/g, "");
    }
    function expressCell(
      expression: OutputExpressionTypeEnum
    ) {
      return expression !==
        OutputExpressionTypeEnum.full
        ? "half"
        : "full";
    }
    function getColspan(row: IForm) {
      const threeCols = 3;
      const oneCol = 1;
      if (!row) {
        return 1;
      }

      if (row.fields) {
        // With 2 fields on single row the TD has a colspan of 1
        // With 1 field on single row; the TD has a colspan of 3 (4 minus the td title)
        return row.fields.length === 1
          ? threeCols
          : oneCol;
      }
    }
    function showField(field: IField) {
      if (field.isHidden) {
        return false;
      }

      if (
        field.vueType !==
        MediakiwiFormVueTypeEnum.formSection
      ) {
        return true;
      }

      if (!field.isHidden) {
        return false;
      }

      return true;
    }
    function getIndex(list: IField[], propertyName: string ) {
      return list.findIndex((el) => el.propertyName === propertyName)
    }
    function handleToggle(section: ILocalSection) {
      context.emit("toggle", section);
    }
    function handleAddFields(
      fields: IField[]
    ) {
      context.emit("add-fields", fields);
    }
    function handleRemoveFields(
      fields: IField[]
    ) {
      context.emit("remove-fields", fields);
    }
    function handleSubmit(
      field: IField
    ) { 
      const siteID: number = store.getters["Navigation/currentSiteID"];
      const request: IPostContentMediakiwiRequest = {
        currentSiteId: siteID,
        postedField: field.title,
        forms: parentForms.value
      }      
      store.dispatch(ContentTypes.POST_CONTENT, request)
    }
    function handleFieldsChanged(
      value: string,
      field: IField,
    ) {
      // Update the field's value
      //field.value = value;
      parentForms.value.forEach((element: IForm) => {
        if (element && element.fields) {
          element.fields[getIndex(element.fields, field.propertyName)].value = value;
        }
      });      
      
      if (field.isAutoPostback) {
        handleSubmit(field);
      }
    }
    
    function hideLabelForType(vueType: string) {
      return vueType ===
        MediakiwiFormVueTypeEnum.formButton.toString()
        ? true
        : false;
    }
    function isHalfField(
      expression: OutputExpressionTypeEnum
    ) {
      return expression !==
        OutputExpressionTypeEnum.full
        ? " half"
        : " long";
    }

    return {
      parentForms,
      getIndex,
      expressCell,
      getColspan,
      showField,
      handleToggle,
      handleAddFields,
      handleRemoveFields,
      handleFieldsChanged,
      handleSubmit,
      hideLabelForType,
      isHalfField,
      checkVueType,
      isTopSection,
      clean,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  font-family: $font-primary;
  font-family: $font-size-l;
  .row {
    flex-direction: column;
    padding-bottom: $standard-spacing;
    .col {
      text-align: left;
      vertical-align: top;
      label {
        min-width: 175px;
        font-weight: 600;
        min-height: 24px;
      }
    }
    .col {
      padding: 5px 0;
      color: #000;
    }
    .col-xl {
      flex: 2 0 75%;
      padding: 5px 0;
    }
  }
  .input-text {
    margin-right: 0;
  }
}
@media (min-width: 786px) {
  .container {
    .row {
      flex-direction: row;
      .col, .col-xl {
        &.half {
          text-align: center;
          flex: 2 0 25%;
        }
      }
    }
  }
}
</style>
