<template>
  <form
    class="login"
    @submit.prevent="handleLogin">
    <img
      src="../assets/images/mk-logo.png"
      class="login-logo" />
    <h1>{{ contentLogin.loginHeadlineText }}</h1>
    <CustomInput
      :input="customEmailInput"
      @value-changed="handleTextChanged" />
    <CustomInput
      :input="customPasswordInput"
      @value-changed="handleTextChanged"
      class="password-input" />
    <FormErrors
      v-if="errorMessages"
      :messages="errorMessages" />
    <router-link
      class="link"
      to="/forgot">
      {{
        contentLogin.loginForgotPasswordText
      }}
    </router-link>
    <CustomButton
      :button="customLoginButton"
      @button-clicked="handleLogin" />
  </form>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
} from "vue";
import { store } from "../store";
import FormErrors from "./form/FormErrors.vue";
import CustomInput from "./base-components/CustomInput.vue";
import CustomButton from "./base-components/CustomButton.vue";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import MessageModel from "../models/MessageModel";
import AuthenticateRequestModel from "../models/Mediakiwi/Request/AuthenticateRequestModel";
import { fieldMixins, FieldValidationType, FieldValidationTypeMessage } from "./form";

export default defineComponent({
  name: "Login",
  mixins: [ fieldMixins],
  components: {
    FormErrors,
    CustomInput,
    CustomButton,
  },
  setup() {
    const validForm = ref(false);
    const email = ref("");
    const password = ref("");
    let errorMessages = reactive<Array<MessageModel>>([]);
    const contentLogin = computed(
      () => store.getters.contentLogin
    );
    const customEmailInput = ref<InputModel>({
      customClass: "input-email",
      fieldIcon: "email",
      fieldPlaceholder: contentLogin.value.loginEmailPlaceholder,
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "email",
      fieldValue: "",
      fieldType: "email",
      readOnly: false,
    });
    const customPasswordInput = ref<InputModel>({
      customClass: "input-password",
      fieldIcon: "password",
      fieldPlaceholder: contentLogin.value.loginPasswordPlaceholder,
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "password",
      fieldValue: "",
      fieldType: "password",
      readOnly: false,
    });
    const customLoginButton = ref<ButtonModel>({
      customClass: "btn-login",
      buttonIcon: "",
      disabled: true,
      buttondName: "login",
      value: contentLogin.value.loginButtonText,
      readOnly: false,
    });
    function handleLogin() {
      store.dispatch("authenticateMediakiwiAPI", {
        emailAddress: email.value,
        password: password.value,
        apiKey: "",
      } as AuthenticateRequestModel);
    }
    function handleTextChanged(value: string, fieldName: string) {
      //errorMessages = fieldMixins.methods.emptyValidator(value, fieldName, errorMessages);
      errorMessages = fieldMixins.methods.emailValidator(value, fieldName, errorMessages);
      if (errorMessages.length === 0) {
        if (fieldName === "email") {
          email.value = value;
        } else if (fieldName === "password") {
          password.value = value;
        }
        validForm.value = true;
      } else {
        validForm.value = false;
      }
      customLoginButton.value.disabled = !validForm.value;
    }
    return {
      contentLogin,
      errorMessages,
      customEmailInput,
      customPasswordInput,
      customLoginButton,
      validForm,
      handleLogin,
      handleTextChanged,
    };
  },
});
</script>

<style lang="scss">
/*
  Child comonents:
  ForgottenPassword.vue and ResetPassword.vue
  inherits from this components scss
*/
.login {
  padding: 50px 13px 0;
  box-sizing: border-box;
  position: relative;
  width: 394px;
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: $font-primary;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;

  &-logo {
    padding-bottom: 40px;
    max-width: 80%;
  }
  .link {
    margin-bottom: 25px;
    &:last-of-type {
      color: white;
    }
  }
  .btn-login {
    margin-bottom: 25px;
    width: 70%;
    font-size: $font-size-l;
    font-family: $font-primary;
    background: $color-blue;
    color: #fff;
    &:hover {
      background: $color-hover-blue;
    }
  }
  .password-input {
    margin-top: 0;
  }
  h1 {
    margin: 0;
    padding-bottom: 15px;
    color: $color-blue;
  }
}
</style>
