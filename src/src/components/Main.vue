<template>
  <div class="content-container row">
    <div class="col main-container">
      <CustomSelectInput :select="customSelectTestInput" />
      <CustomChoiceRadio :radio="customRadioTestInput" />
      <CustomChoiceCheckBox :checkbox="customCheckboxTestInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomSelectInput from "./form/CustomSelectInput.vue";
import { SelectModel } from "../models/SelectModel";
import RadioModel from "../models/RadioModel";
import CustomChoiceRadio from "./form/CustomChoiceRadio.vue";
import CustomChoiceCheckBox from "./form/CustomChoiceCheckBox.vue";
import CheckboxModel from "../models/CheckboxModel";

export default defineComponent({
  name: "MainView",
  components: {
    CustomSelectInput,
    CustomChoiceRadio,
    CustomChoiceCheckBox,
  },
  setup() {
    const customSelectTestOptions = [{
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
      suffix: "",
      prefix: "",
      customClass: "radio-primary",
      options: customSelectTestOptions,
    });
    const customCheckboxTestInput = ref<CheckboxModel>({
      disabled: false,
      fieldValue: "",
      fieldName: "main-checkbox",
      fieldIcon: "",
      fieldGroupName: "cb_main",
      suffix: "",
      prefix: "",
      customClass: "checkbox-primary",
      options: customSelectTestOptions,
    });
    return {
      customSelectTestInput,
      customRadioTestInput,
      customCheckboxTestInput,
    };
  },
});
</script>

<style lang="scss">
.content-container {
  margin: auto;
  height: auto;
  .main-container {
      margin: auto;
      padding-top: 15px;
  }
}
</style>
