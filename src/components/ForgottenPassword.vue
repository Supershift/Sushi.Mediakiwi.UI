<template>
  <form action="" class="login">
    <img
      src="../assets/images/vaultN-logo.svg"
      class="login-logo" />
    <h1>
      {{
        contentForgottenPassword.forgottenHeadlineText
      }}
    </h1>
    <CustomInput
      :input="customEmailInput"
      @value-changed="handleTextChanged" />
    <FormErrors
      v-if="errorMessages"
      :messages="errorMessages" />
    <CustomButton
      :button="customSubmitButton"
      @button-clicked="handleSubmit" />
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
} from "vue";
import CustomButton from "./base-components/CustomButton.vue";
import CustomInput from "./base-components/CustomInput.vue";
import FormErrors from "./form/FormErrors.vue";
import MessageModel from "../models/MessageModel";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import { store } from "../store";
import { fieldMixins } from "./form";

export default defineComponent({
  name: "ForgottenPassword",
  mixins: [fieldMixins],
  components: {
    FormErrors,
    CustomInput,
    CustomButton,
  },
  setup() {
    let errorMessages = reactive<MessageModel[]>([]);
    const validEmail = ref(false);
    const contentForgottenPassword = computed(
      () => store.getters.contentForgotten,
    );
    const customEmailInput = ref<InputModel>({
      customClass: "input-email",
      fieldIcon: "email",
      fieldPlaceholder: contentForgottenPassword.value.forgottenEmailPlaceholder,
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "email",
      fieldValue: "",
      fieldType: "email",
      readOnly: false,
    });
    const customSubmitButton = ref<ButtonModel>({
      customClass: "btn-login ",
      buttonIcon: "",
      disabled: true,
      buttondName: "submit",
      value: contentForgottenPassword.value.fogottenButtonText,
      readOnly: false,
    });
    function handleSubmit() {
      if (customEmailInput.value.fieldValue && validEmail) {
        store.dispatch("forgottenPassword", customEmailInput.value.fieldValue);
      }
    }
    function handleTextChanged(value: string, fieldName: string) {
      errorMessages = fieldMixins.methods.emailValidator(value, fieldName, errorMessages);
      if (errorMessages.length === 0) {
        validEmail.value = true;
      } else {
        validEmail.value = false; 
      }
      customSubmitButton.value.disabled = !validEmail.value;
    }
    return {
      customEmailInput,
      errorMessages,
      customSubmitButton,
      contentForgottenPassword,
      handleSubmit,
      handleTextChanged,
    };
  },
});
</script>

<style scoped lang="scss">
  // Inherits from Login.vue(scss)
</style>
