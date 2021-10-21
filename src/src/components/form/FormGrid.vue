<template>
  <section>
    <table class="formTable">
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
        >
          <td v-if="row.isButtonRow">
            <component
              :is="field.vueType"
              v-for="field in row.fields"
              :key="field.propertyName"
              :field="field"
              @onclick="onButtonClick"
            />
          </td>
          <template
            v-for="(field, index) in row.fields"
            v-else
          >
            <component
              :is="field.vueType"
              v-if="field.vueType === 'wimSection'"
              :key="field.propertyName"
              v-model="field.value"
              :field="field"
            />
            <template v-else>
              <th
                v-show="showField(field)"
                :key="index"
                :class="expressCell(field.expression)"
                colspan="1"
              >
                <label
                  v-if="!hideLabelForType(field.vueType)"
                  :for="field.propertyName"
                  :title="field.title"
                  :class="{ mandatory: field.mandatory }"
                  v-html="field.title"
                />
              </th>
              <td
                :key="index"
                :class="expressCell(field.expression)"
                :colspan="getColspan(row)"
              >
                <component
                  :is="field.vueType"
                  v-if="field.vueType === 'wimButton'"
                  :key="field.propertyName"
                  :field="field"
                  @onclick="onButtonClick"
                />
                <component
                  :is="field.vueType === 'undefined' ? 'wimTextline' : field.vueType"
                  v-else
                  :key="field.componentKey"
                  v-model="field.value"
                  :field="field"
                  @onchange="onFieldChange"
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
import { defineComponent, PropType, reactive, } from "vue";
import FieldModel from "../../models/FieldModel";
import GridRowModel from "../../models/FormGridRowModel";
import MessageModel from "../../models/MessageModel";
import SectionModel from "../../models/SectionModel";
import { ExpressionType } from "./index";

export default defineComponent({
  name: "FormGrid",
  mixin: [ ExpressionType ],
  props: {
    fields: {
      type: Array as PropType<Array<FieldModel>>,
      required: true,
    },
    notifications: {
      type: Object as PropType<Array<MessageModel>>,
      required: true,
    }
  },
  emits: ["toggle","addFields", "removeFields", "fieldChanged", "buttonClicked"],
  setup(props, context) {
    let rowArray = reactive<Array<GridRowModel>>([]);
    function clean(label: string): string {
      return label.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, "");
    }
    function expressCell(expression: ExpressionType) {
      return (expression !== ExpressionType.Full) ? "vhalf" : "full";
    }
    function getColspan(row: GridRowModel) {
      const threeCols = 3;
      const oneCol = 1;
      if (!row) {
          return 1;
      }

      // With 2 fields on single row the TD has a colspan of 1
      // With 1 field on single row; the TD has a colspan of 3 (4 minus the td title)
      return (row.fields.length === 1) ? threeCols : oneCol;
    }
    function showField(field: FieldModel) {
        if (field.hidden) {
            return false;
        }

        if (field.vueType === "wimSection") {
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
      context.emit("addFields", fields);
    }
    function handleRemoveFields(fields: FieldModel[]) {
      context.emit("removeFields", fields);
    }
    function handleFieldsChanged(e: Event, fields: FieldModel) {
      context.emit("fieldChanged", e, fields);
    }
    function handleButtonClicked(e: Event, field: FieldModel) {
      context.emit("buttonClicked", e, field);
    }
    function hideLabel(vueType: string) {
      return (vueType === "wimButton") ? true : false;
    }
    function isHalfField(expression: ExpressionType) {
        return (expression !== ExpressionType.Full) ? " half" : " long";
    }
    function rows() {
      //let rowArray = [];
      // rows have an array of fields with max. 2 items
      // one left one right
      let initalRow = reactive<GridRowModel>({
        isButtonRow: false,
        fields: [],
      });
      if (!props.fields || !props.fields.length) {
        return rowArray;
      }

      let currentFormSection = "baseSection";
      for (let field of props.fields) {
          const keyGen = 621355968000000000;
          const keyMultiply = 10000;
          const twoRows = 2;
          // set componentKey; This should update every time the field is updated
          field.componentKey = new Date().getTime() * keyMultiply + keyGen;

          if (!field.formSection) {
              if (field.vueType === "wimSection") {
                  currentFormSection = `${clean(field.title)}_${props.fields.indexOf(field)}`;
              }
              field.formSection = currentFormSection;
          }

          // Check if there is a notification for this field
          if (props.notifications && props.notifications.length) {
              let notification = props.notifications.find((message: MessageModel) => {
                  return message.propertyName === field.propertyName;
              });
              field.error = notification;
          }

          // is this a full width field?
          if (field.expression === ExpressionType.Full) {
              // add the current row object to the list
              if (initalRow.fields.length) {
                  initalRow.isButtonRow = initalRow.fields.map((mappedField) => mappedField.vueType).every((val) => val === "wimButton");
                  rowArray.push(initalRow);
              }
              // create a new row
              initalRow = { isButtonRow: false, fields: [] };
              // add push it to the list
              initalRow.fields.push(field);
          } else {
              if (initalRow.fields.length >= twoRows && initalRow.fields.map((mappedField) => mappedField.vueType).every((val) => val === "wimButton")) {
                  if (field.vueType !== "wimButton") {
                      initalRow.isButtonRow = true;
                      rowArray.push(initalRow);
                      // create a new row
                      initalRow = { isButtonRow: false, fields: [] };
                  }
              }
              // add to 'current' row
              initalRow.fields.push(field);
          }
          // add row to rows
          // when its 1 fullwith row
          // or there are 2 rows added
          let addRows = false;
          if (field.expression === ExpressionType.Full) {
              addRows = true;
          }

          if (initalRow.fields.length >= twoRows) {
              let x = initalRow.fields.map((r) => r.vueType);
              if (!x) {
                  x = [];
              }

              if (!x.every((val) => val === "wimButton")) {
                  addRows = true;
              }
          }

          if (addRows) {
              if (initalRow.fields.length) {
                  initalRow.isButtonRow = initalRow.fields.map((r) => r.vueType).every((val) => val === "wimButton");
                  rowArray.push(initalRow);
              }
              initalRow = { isButtonRow: false, fields: [] };
          }
      }

      // add last row
      if (initalRow.fields.length > 0) {
          initalRow.isButtonRow = initalRow.fields.map((r) => r.vueType).every((val) => val === "wimButton");
          rowArray.push(initalRow);
      }

      return rowArray;
    }
    return {
      rows,
      expressCell,
      getColspan,
      showField,
      handleToggle,
      handleAddFields,
      handleRemoveFields,
      handleFieldsChanged,
      handleButtonClicked,
      hideLabel,
      isHalfField,
    };
  },
});
</script>

<style scoped lang="scss"></style>