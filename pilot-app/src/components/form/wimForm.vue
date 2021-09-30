<template>
    <section>
        <table class="formTable">
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td v-if="row.isButtonRow">
                        <component
                            v-for="field in row.fields"
                            :key="field.propertyName"
                            :is="field.vueType"
                            :field="field"
                            @onclick="onButtonClick"
                        ></component>
                    </td>
                    <template v-else v-for="field in row.fields">
                        <component
                            v-if="field.vueType === 'wimSection'"
                            :key="field.propertyName"
                            :is="field.vueType"
                            :field="field"
                            v-model="field.value"
                        ></component>
                        <template v-else v-show="showField(field)">
                            <th :class="expressCell(field.expression)" colspan="1">
                                <label
                                    v-if="!hideLabelForType(field.vueType)"
                                    :for="field.propertyName"
                                    :title="field.title"
                                    v-html="field.title"
                                    :class="{ mandatory: field.mandatory }"
                                ></label>
                            </th>
                            <td :class="expressCell(field.expression)" :colspan="getColspan(row)">
                                <component
                                    v-if="field.vueType === 'wimButton'"
                                    :key="field.propertyName"
                                    :is="field.vueType"
                                    :field="field"
                                    @onclick="onButtonClick"
                                ></component>
                                <component
                                    v-else
                                    :key="field.componentKey"
                                    :is="field.vueType === 'undefined' ? 'wimTextline' : field.vueType"
                                    :field="field"
                                    v-model="field.value"
                                    @onchange="onFieldChange"
                                ></component>
                            </td>
                        </template>
                    </template>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<script>
import wimButton from "./fields/wimButton.vue";
import wimChoiceCheckbox from "./fields/wimChoiceCheckbox.vue";
import wimChoiceDropdown from "./fields/wimChoiceDropdown.vue";
import wimChoiceRadio from "./fields/wimChoiceRadio.vue";
import wimDateTime from "./fields/wimDateTime.vue";
import wimDate from "./fields/wimDate.vue";
import wimNameValue from "./fields/wimNameValue.vue";
import wimNameValueCollection from "./fields/wimNameValueCollection.vue";
import wimPlus from "./fields/wimPlus.vue";
import wimRichText from "./fields/wimRichText.vue";
import wimSection from "./fields/wimSection.vue";
import wimTagVue from "./fields/wimTagVue.vue";
import wimText from "./fields/wimText.vue";
import wimTextline from "./fields/wimTextline.vue";
import wimTextArea from "./fields/wimTextArea.vue";
import wimTime from "./fields/wimTime.vue";
import wimValue from "./fields/wimValue.vue";
import wimValueCollection from "./fields/wimValueCollection.vue";
import wimLink from "./fields/wimLink.vue";

import wimTreeselect from "./fields/wimTreeselect.vue";

import { MediakiwiFormTableRow } from "./form";

export default {
    props: ["fields", "notifications"],
    components: {
        wimButton,
        wimChoiceCheckbox,
        wimChoiceDropdown,
        wimChoiceRadio,
        wimDateTime,
        wimDate,
        wimNameValueCollection,
        wimNameValue,
        wimPlus,
        wimRichText,
        wimSection,
        wimTagVue,
        wimTextline,
        wimText,
        wimTextArea,
        wimTime,
        wimValue,
        wimValueCollection,
        wimTreeselect,
        wimLink,
    },
    computed: {
        rows() {
            let rows = [];
            // rows have an array of fields with max. 2 items
            // one left one right
            let row = new MediakiwiFormTableRow();
            if (!this.fields || !this.fields.length) {
                return rows;
            }

            let currentFormSection = "baseSection";
            for (let field of this.fields) {
                // set componentKey; This should update every time the field is updated
                field.componentKey = new Date().getTime() * 10000 + 621355968000000000;

                if (!field.formSection) {
                    if (field.vueType === "wimSection") {
                        currentFormSection = `${this.clean(field.title)}_${this.fields.indexOf(field)}`;
                    }
                    field.formSection = currentFormSection;
                }

                // Check if there is a notification for this field
                if (this.notifications && this.notifications.length) {
                    let notification = this.notifications.find((f) => {
                        return f.propertyName === field.propertyName;
                    });
                    field.error = notification;
                }

                // is this a full width field?
                if (field.expression === this.outputExpression.FullWidth) {
                    // add the current row object to the list
                    if (row.fields.length) {
                        row.isButtonRow = row.fields.map((r) => r.vueType).every((val, i, arr) => val === "wimButton");
                        rows.push(row);
                    }
                    // create a new row
                    row = new MediakiwiFormTableRow();
                    // add push it to the list
                    row.fields.push(field);
                } else {
                    if (row.fields.length >= 2 && row.fields.map((r) => r.vueType).every((val, i, arr) => val === "wimButton")) {
                        if (field.vueType !== "wimButton") {
                            row.isButtonRow = true;
                            rows.push(row);
                            // create a new row
                            row = new MediakiwiFormTableRow();
                        }
                    }
                    // add to 'current' row
                    row.fields.push(field);
                }
                // add row to rows
                // when its 1 fullwith row
                // or there are 2 rows added
                let addRows = false;
                if (field.expression === this.outputExpression.FullWidth) {
                    addRows = true;
                }

                if (row.fields.length >= 2) {
                    let x = row.fields.map((r) => r.vueType);
                    if (!x) {
                        x = [];
                    }

                    if (!x.every((val, i, arr) => val === "wimButton")) {
                        addRows = true;
                    }
                }

                if (addRows) {
                    if (row.fields.length) {
                        row.isButtonRow = row.fields.map((r) => r.vueType).every((val, i, arr) => val === "wimButton");
                        rows.push(row);
                    }
                    row = new MediakiwiFormTableRow();
                }
            }

            // add last row
            if (row.fields.length > 0) {
                row.isButtonRow = row.fields.map((r) => r.vueType).every((val, i, arr) => val === "wimButton");
                rows.push(row);
            }

            return rows;
        },
    },
    data() {
        return {
            // Corresponding to the mediakiwi enum
            outputExpression: Object.freeze({
                FullWidth: 0,
                Left: 1,
                Right: 2,
                Alternating: 3,
            }),
            dummyPlusField: {
                propertyName: "tjesting",
            },
        };
    },
    methods: {
        onButtonClick($event, field) {
            console.log("onButtonClick");
            this.$emit("onclick", $event, field);
        },
        onFieldChange($event, field) {
            console.log("onFieldChange");
            this.$emit("onchange", $event, field);
        },
        hideLabelForType(vueType) {
            switch (vueType) {
                case "wimButton":
                    return true;
            }
            return false;
        },
        //
        getColspan(row) {
            if (!row) {
                return 1;
            }

            // With 2 fields on single row the TD has a colspan of 1
            // With 1 field on single row; the TD has a colspan of 3 (4 minus the td title)
            //if (row.fields.length === 1) {
            //    return 3;
            //}
            //else {
            return 1;
            //}
        },
        isHalfField(expression) {
            let _class = "";
            //if (expression !== this.outputExpression.FullWidth)
            //    _class += " half";
            //else
            //    _class += " long";

            return _class;
        },
        expressCell(expression) {
            let _class = "";
            //if (expression !== this.outputExpression.FullWidth)
            //    _class += "vhalf";
            //else
            //    _class += "full";

            return _class;
        },
        expressionClass(expression) {
            let _class = this.isHalfField(expression);

            //switch (expression) {
            //    case 1:
            //        _class += " left";
            //        break;
            //    case 2:
            //        _class += " right";
            //        break;
            //}
            return _class;
        },
        showField(field) {
            if (field.hidden) {
                return false;
            }

            if (field.vueType === "wimSection") {
                return true;
            }

            if (!field.visible) {
                return false;
            }

            return true;
        },
        hide(buttons) {
            //for (let button of buttons) {
            //    if (button.section == 0)
            //        return "";
            //}
            //return 'hidden';
        },
        clean(label) {
            //return label.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            //    return index == 0 ? word.toLowerCase() : word.toUpperCase();
            //}).replace(/\s+/g, '');
        },
        removeFields(section) {
            // let sectionFields = this.fields.filter((f) => { return f.formSection === section });
            // this.$emit('removefields', sectionFields);
        },
        addFields(section) {
            // this.$emit('addFields', section);
        },
        toggle(section) {
            // this.$emit('toggle', section);
        },
        ///
        ///
    },
    mounted() {
        this.$on("postFields", this.postFields);
    },
};
</script>
