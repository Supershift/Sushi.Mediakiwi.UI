<template>
  <form 
    class="login"
    @submit.prevent="handleReset">
    <img
      src="../assets/images/mk-logo.png"
      class="login-logo" />
    <h1>
      {{ contentResetPassword.resetHeadlineText }}
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
import MessageModel from "../models/MessageModel";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import CustomButton from "./base-components/CustomButton.vue";
import CustomInput from "./base-components/CustomInput.vue";
import FormErrors from "./form/FormErrors.vue";
import { ResetPasswordRequestModel } from "../models/Mediakiwi/Request/ResetPasswordRequestModel";
import {fieldMixins} from "./form/index";
import {store} from "../store";

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
    const contentResetPassword = computed(
      () => store.getters.contentResetPassword,
    );
    const customEmailInput = ref<InputModel>({
      customClass: "input-email",
      fieldIcon: "email",
      fieldPlaceholder: contentResetPassword.value.resetEmailPlaceholder,
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "email",
      fieldValue: "",
      fieldType: "email",
      readOnly: false,
    });
    const customSubmitButton = ref<ButtonModel>({
      customClass: "btn-login",
      buttonIcon: "",
      disabled: true,
      buttondName: "submit",
      value: contentResetPassword.value.resetButtonText,
      readOnly: false,
    });
    function handleReset() {
      /* eslint no-console:0 */
      console.log("email.value, validEmail.value");
      
      if (email.value && validEmail.value) {
        /* eslint no-console:0 */
        console.log(customEmailInput.value.fieldValue);
        store.dispatch("resetPassword",  { emailAddress: customEmailInput.value.fieldValue } as ResetPasswordRequestModel );
      }
    }
    function handleTextChanged(value: string, fieldName: string) {
      /* eslint no-console:0 */
      console.log(email.value, validEmail.value);
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
      contentResetPassword,
      customSubmitButton,
      handleReset,
      handleTextChanged,
    };
  },
});
</script>

<style scoped lang="scss">
// Inherits from Login.vue(scss)
</style>
