<template>
  <section>
    <div class="container" v-if="forms">
      <div class="row" v-for="formRow in forms" :key="formRow">
        <div class="col" v-if="formRow.fields">
          <template v-for="field in formRow.fields">
              <component
                :is="checkVueType(field)"
                v-if="
                  checkVueType(field) ===
                  'FormSection'
                "
                :key="field.propertyName"
                v-model="field.value"
                :field="field" />
              <template v-else>
                <div class="col"
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
                <div class="col-xl"
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
                      " />
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
                    @on-change="
                      handleFieldsChanged
                    " />
                </div>
              </template>
            </template>
          </div>
          <div v-if="formRow.buttons">
          <component
              :is="checkVueType(field)"
              v-for="field in formRow.buttons"
              :key="field.propertyName"
              :field="field"
              @onclick="handleButtonClicked" />
          </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from "vue";
import {Field, Form} from "../../models/Mediakiwi/Response/Content/GetContentMediakiwiResponseModel";
import FormRowModel from "../../models/FormRowModel";
import SectionModel from "../../models/SectionModel";
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
import {OutputExpressionType} from "@/models/Mediakiwi/OutputExpressionType";
import {MediakiwiFormVueType} from "@/models/Mediakiwi/MediakiwiFormVueType";

export default defineComponent({
  name: "FormComponent",
  props: {
    forms: {
      type: Object as PropType<Form>,
      required: true,
    }
  },
  mixins: [OutputExpressionType, fieldMixins],
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
    function checkVueType(
      field: Field
    ): string {
      return MediakiwiFormVueType[field.vueType];
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
      expression: OutputExpressionType
    ) {
      return expression !==
        OutputExpressionType.full
        ? "half"
        : "full";
    }
    function getColspan(row: FormRowModel) {
      const threeCols = 3;
      const oneCol = 1;
      if (!row) {
        return 1;
      }

      // With 2 fields on single row the TD has a colspan of 1
      // With 1 field on single row; the TD has a colspan of 3 (4 minus the td title)
      return row.fields.length === 1
        ? threeCols
        : oneCol;
    }
    function showField(field: Field) {
      if (field.isHidden) {
        return false;
      }

      if (
        field.vueType !==
        MediakiwiFormVueType.formSection
      ) {
        return true;
      }

      if (!field.isHidden) {
        return false;
      }

      return true;
    }
    function handleToggle(section: SectionModel) {
      context.emit("toggle", section);
    }
    function handleAddFields(
      fields: Field[]
    ) {
      context.emit("add-fields", fields);
    }
    function handleRemoveFields(
      fields: Field[]
    ) {
      context.emit("remove-fields", fields);
    }
    function handleFieldsChanged(
      e: Event,
      field: Field,
      value: string
    ) {
      // Update the field's value
      field.value = value;

      if (field.isAutoPostback) {
        // TODO trigger API
      }
    }
    function handleButtonClicked(
      e: Event,
      field: Field
    ) {
      context.emit("button-clicked", e, field);
    }
    function hideLabelForType(vueType: string) {
      return vueType ===
        MediakiwiFormVueType.formButton.toString()
        ? true
        : false;
    }
    function isHalfField(
      expression: OutputExpressionType
    ) {
      return expression !==
        OutputExpressionType.full
        ? " half"
        : " long";
    }

    // Create the collection of rows
    // with fields sorted according to their cofiguration
    /* eslint complexity:["error", 22]*/
    // let rowArray = ref<Array<FormRowModel>>([]);

    // let currentFormSection = "baseSection";
    // const cellLimit = 2;

    // // create a new row
    // let currentRow = ref<FormRowModel>();
    
    // if (props.form && props.form.fields) {
    //   props.form.fields.forEach((field: Field) => {
    //     if (!field.formSection && props.form.fields) {
    //       if (
    //         field.vueType ===
    //         MediakiwiFormVueType.formSection
    //       ) {
    //         currentFormSection = `${clean(
    //           field.title
    //         )}_${props.form.fields.indexOf(field)}`;
    //       }
    //       field.formSection = currentFormSection;
    //     }

    //     // Check if there is a notification for this field
    //     if (
    //       props.notifications &&
    //       props.notifications.length
    //     ) {
    //       let notification =
    //         props.notifications.find(
    //           (message: MessageModel) => {
    //             return (
    //               message.propertyName ===
    //               field.propertyName
    //             );
    //           }
    //         );
    //       //field.error = notification;
    //     }

    //     // is this a full width field?
    //     if (
    //       field.expression ===
    //       OutputExpressionType.full
    //     ) {
    //       // add the current row object to the list
    //       if (currentRow.value && currentRow.value.fields) {
    //         rowArray.value.push(currentRow.value);
    //       }
    //       // create a new row
    //       currentRow.value = {fields: []};
    //       // add push it to the list
    //       currentRow.value.fields.push(field);
    //     } else {
    //       if (currentRow.value) {
    //         const mapped = currentRow.value.fields.map(
    //             (mappedField) =>
    //               mappedField.vueType
    //           ).every(
    //             (val) =>
    //               val ===
    //               MediakiwiFormVueType.formButton
    //           );
    //       if (
    //         currentRow.value.fields.length >=
    //           cellLimit &&
    //         mapped
    //       ) {
    //         if (
    //           currentRow.value &&
    //           field.vueType !==
    //           MediakiwiFormVueType.formButton
    //         ) {
    //           // currentRow.isButtonRow = true;
    //           rowArray.value.push(
    //             currentRow.value
    //           );
    //           // create a new row
    //           currentRow.value = {fields: []};
    //         }
    //       }
    //       currentRow.value.fields.push(field);
    //       }
    //     }

    //     if (currentRow.value) {
 
    //     // Check if we need to add the current row the rowcollection
    //     // When the current field is fullwidth
    //     // or the fields collection for the currentrow exceed the limit?
    //     let addRows = false;
    //     if (
    //       currentRow.value.fields &&
    //       field.expression ===
    //         OutputExpressionType.full ||
    //       currentRow.value.fields.length >=
    //         cellLimit
    //     ) {
    //       addRows = true;
    //     }

    //     if (
    //       currentRow.value.fields &&
    //       addRows &&
    //       currentRow.value.fields.length
    //     ) {
    //       // currentRow.isButtonRow = currentRow.fields.map((r) => r.vueType).every((val) => val === MediakiwiFormVueType.formButton);
    //       rowArray.value.push(currentRow.value);
    //       currentRow.value = {fields: []};
    //     }
    //     }
    //   });
    // }

    return {
      expressCell,
      getColspan,
      showField,
      handleToggle,
      handleAddFields,
      handleRemoveFields,
      handleFieldsChanged,
      handleButtonClicked,
      hideLabelForType,
      isHalfField,
      checkVueType,
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
      flex: 2 0 40%
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
      .col {
        &.half {
          width: 40%;
        }
      }
    }
  }
}
</style>
