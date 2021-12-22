<template>
  <form action="" class="login">
    <img
      src="../assets/images/mk-logo.png"
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
      @button-clicked="handleReset" />
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
import { ResetPasswordRequestModel } from "../models/Mediakiwi/Request/Authentication/ResetPasswordRequestModel";
import { store } from "../store";
import { fieldMixins } from "./form";
import { AuthenticationTypes } from "../store/modules/Authentication";

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
    const email = ref("");
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
    function handleReset() {
      if (email.value && validEmail.value) {
        store.dispatch(AuthenticationTypes.RESET_PASSWORD,  { emailAddress: email.value } as ResetPasswordRequestModel );
      }
    }
    function handleTextChanged(value: string, fieldName: string) {
      errorMessages = fieldMixins.methods.emailValidator(value, fieldName, errorMessages);
      if (errorMessages.length === 0) {
        validEmail.value = true;
        email.value = value;
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
      handleReset,
      handleTextChanged,
    };
  },
});
</script>

<style scoped lang="scss">
  // Inherits from Login.vue(scss)
</style>
