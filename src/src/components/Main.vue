<template>
  <div class="content-container row">
    <div class="col main-container">
      <CustomSelectInput :select="customSelectTestInput" />
      <CustomChoiceRadio :radio="customRadioTestInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomSelectInput from "./form/CustomSelectInput.vue";
import { SelectModel } from "../models/SelectModel";
import SelectOptionModel from "../models/OptionModel";
import RadioModel from "../models/RadioModel";
import CustomChoiceRadio from "./form/CustomChoiceRadio.vue";

export default defineComponent({
  name: "MainView",
  components: {
    CustomSelectInput,
    CustomChoiceRadio,
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
      fieldGroupName: "main",
      suffix: "",
      prefix: "",
      customClass: "radio-primary",
      options: customSelectTestOptions,
    });
    return {
      customSelectTestInput,
      customRadioTestInput
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
