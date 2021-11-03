<template>
  <section>
    <table class="formTable">
      <tbody>
        <tr v-for="row in rowArray" :key="row.id">
          <td v-if="row.isButtonRow">
            <component
              :is="checkVueType(field)"
              v-for="field in row.fields"
              :key="field.propertyName"
              :field="field"
              @onclick="handleButtonClicked"
            />
          </td>
          <template
            v-for="field in row.fields"
            v-else>
            <component
              :is="checkVueType(field)"
              v-if="
                checkVueType(field) ===
                'FormSection'
              "
              :key="field.propertyName"
              v-model="field.value"
              :field="field"
            />
            <template v-else>
              <th
                v-show="showField(field)"
                :key="field.propertyName"
                :class="
                  expressCell(field.expression)
                "
                colspan="1">
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
              </th>
              <td
                :key="field.propertyName"
                :class="
                  expressCell(field.expression)
                "
                :colspan="getColspan(row)">
                <component
                  :is="checkVueType(field)"
                  v-if="field.vueType === 'FormButton'"
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
                  :key="field.componentKey"
                  :field="field"
                  v-model="field.value"
                  @onchange="handleFieldsChanged"
                />
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
} from "vue";
import FieldModel from "../../models/FieldModel";
import FormRowModel from "../../models/FormRowModel";
import MessageModel from "../../models/MessageModel";
import SectionModel from "../../models/SectionModel";
import {
  ExpressionType,
  fieldMixins,
  FieldType,
  vueTypes,
} from "./index";
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

export default defineComponent({
  name: "FormComponent",
  props: {
    fields: {
      type: Array as PropType<Array<FieldModel>>,
      required: true,
    },
    notifications: {
      type: Object as PropType<
        Array<MessageModel>
      >,
      required: true,
    },
  },
  mixins: [ExpressionType, fieldMixins],
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
      field: FieldModel
    ): string {
      switch (field.vueType) {
        case vueTypes.formButton:
          return FieldType.formButton;
        case vueTypes.formChoiceCheckbox:
          return FieldType.formChoiceCheckbox;
        case vueTypes.formChoiceDropdown:
          return FieldType.formChoiceDropdown;
        case vueTypes.formChoiceRadio:
          return FieldType.formChoiceRadio;
        case vueTypes.formDate:
          return FieldType.formDate;
        case vueTypes.formDateTime:
          return FieldType.formTime;
        case vueTypes.formRichText:
          return FieldType.formRichText;
        case vueTypes.formTextArea:
          return FieldType.formTextArea;
        case vueTypes.formText:
          return FieldType.formText;
        case vueTypes.formTextline:
          return FieldType.formTextline;
        case vueTypes.formPlus:
          return FieldType.formPlus;
        case vueTypes.formTag:
          return FieldType.formTag;
        default:
          return FieldType.formSection;
      }
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
      expression: ExpressionType
    ) {
      return expression !== ExpressionType.Full
        ? "vhalf"
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
    function showField(field: FieldModel) {
      if (field.hidden) {
        return false;
      }

      if (field.vueType !== vueTypes.formSection) {
        return true;
      }

      if (!field.hidden) {
        return false;
      }

      return true;
    }
    function handleToggle(section: SectionModel) {
      context.emit("toggle", section);
    }
    function handleAddFields(fields: FieldModel[]) {
      context.emit("add-fields", fields);
    }
    function handleRemoveFields(fields: FieldModel[]) {
      context.emit("remove-fields", fields);
    }
    function handleFieldsChanged(e: Event, fields: FieldModel) {
      context.emit("field-changed", e, fields);
    }
    function handleButtonClicked(e: Event, field: FieldModel) {
      context.emit("button-clicked", e, field);
    }
    function hideLabelForType(vueType: string) {
      return vueType === vueTypes.formButton.toString() ? true : false;
    }
    function isHalfField(
      expression: ExpressionType
    ) {
      return expression !== ExpressionType.Full
        ? " half"
        : " long";
    }

    // Create the collection of rows
    // with fields sorted according to their cofiguration
    let rowArray = ref<Array<FormRowModel>>([]);
    let currentFormSection = "baseSection";
    const cellLimit = 2;

    // create a new row
    let currentRow = ref<FormRowModel>({
      fields: [],
    });

    if (props.fields && props.fields.length) {
      props.fields.forEach((field) => {

        if (!field.formSection) {
          if (
            field.vueType === vueTypes.formSection
          ) {
            currentFormSection = `${clean(
              field.title
            )}_${props.fields.indexOf(field)}`;
          }
          field.formSection = currentFormSection;
        }

        // Check if there is a notification for this field
        if (
          props.notifications &&
          props.notifications.length
        ) {
          let notification =
            props.notifications.find(
              (message: MessageModel) => {
                return (
                  message.propertyName ===
                  field.propertyName
                );
              }
            );
          field.error = notification;
        }

        // is this a full width field?
        if (
          field.expression === ExpressionType.Full
        ) {
          // add the current row object to the list
          if (currentRow.value.fields.length) {
            rowArray.value.push(currentRow.value);
          }
          // create a new row
          currentRow.value = {fields: []};
          // add push it to the list
          currentRow.value.fields.push(field);
        } else {
          if (
            currentRow.value.fields.length >=
              cellLimit &&
            currentRow.value.fields
              .map(
                (mappedField) =>
                  mappedField.vueType
              )
              .every(
                (val) =>
                  val === vueTypes.formButton
              )
          ) {
            if (
              field.vueType !==
              vueTypes.formButton
            ) {
              // currentRow.isButtonRow = true;
              rowArray.value.push(
                currentRow.value
              );
              // create a new row
              currentRow.value = {fields: []};
            }
          }
          currentRow.value.fields.push(field);
        }

        // Check if we need to add the current row the rowcollection
        // When the current field is fullwidth
        // or the fields collection for the currentrow exceed the limit?
        let addRows = false;
        if (
          field.expression ===
            ExpressionType.Full ||
          currentRow.value.fields.length >=
            cellLimit
        ) {
          addRows = true;
        }

        if (
          addRows &&
          currentRow.value.fields.length
        ) {
          // currentRow.isButtonRow = currentRow.fields.map((r) => r.vueType).every((val) => val === vueTypes.formButton);
          rowArray.value.push(currentRow.value);
          currentRow.value = {fields: []};
        }
      });
    }

    return {
      rowArray,
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
.formTable {
  font-family: $font-primary;
  font-family: $font-size-l;
  tr {
    th {
      padding: 8px 0 2px;
      text-align: left;
      vertical-align: top;
      width: 10%;
      label {
        width: 135px;
        padding: 4px 10px 4px 0;
        display: block;
        font-weight: 600;
        min-height: 24px;
      }
    }
    td {
      padding: 4px 80px 4px 0;
      vertical-align: top;
      color: #000;
      &.half {
        width: 40%;
      }
    }
  }
  .input-text {
    margin-right: 0;
  }
}
</style>
