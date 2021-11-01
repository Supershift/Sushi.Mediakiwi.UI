<template>
  <form
    class="login"
    @submit.prevent="handleLogin">
    <img
      src="../assets/images/vaultN-logo.svg"
      class="login-logo" />
    <h1>{{ contentLogin.loginHeadlineText }}</h1>
    <CustomInput
      :input="customEmailInput"
      @valueChanged="handleTextChanged" />
    <CustomInput
      :input="customPasswordInput"
      @valueChanged="handleTextChanged"
      class="password-input" />
    <FormErrors
      v-if="errroMessages"
      :messages="errroMessages" />
    <a href="#/forgot" class="link">
      {{ contentLogin.loginForgotPasswordText }}
    </a>
    <CustomButton
      :button="customLoginButton"
      @buttonClicked="handleLogin" />
    <a href="/reset" class="link">
      {{ contentLogin.loginCreateAccountText }}
    </a>
  </form>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from "vue";
import store from "../store/index";
import FormErrors from "./form/FormErrors.vue";
import CustomInput from "./form/CustomInput.vue";
import CustomButton from "./form/CustomButton.vue";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import MessageModel from "../models/MessageModel";

export default defineComponent({
  name: "Login",
  components: {
    FormErrors,
    CustomInput,
    CustomButton,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const errroMessages = ref<MessageModel[]>([]);
    const contentLogin = computed(
      () => store.getters.contentLogin
    );
    const customEmailInput = ref<InputModel>({
      customClass: "input-email",
      fieldIcon: "email",
      fieldPlaceholder: "Email",
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "email",
      fieldValue: "",
      readOnly: false,
    });
    const customPasswordInput = ref<InputModel>({
      customClass: "input-password",
      fieldIcon: "password",
      fieldPlaceholder: "Password",
      disabled: false,
      suffix: "",
      prefix: "",
      fieldName: "password",
      fieldValue: "",
      readOnly: false,
    });
    const customLoginButton = ref<ButtonModel>({
      customClass: "btn-login",
      buttonIcon: "",
      disabled: false,
      buttondName: "login",
      value: contentLogin.value.loginButtonText,
      readOnly: false,
    });
    function handleLogin() {
      store.dispatch("toggleLogIn");
    }
    function handleTextChanged() {
      // console.log('TODO: Fix Text changed');
    }
    return {
      email,
      password,
      contentLogin,
      errroMessages,
      customEmailInput,
      customPasswordInput,
      customLoginButton,
      handleLogin,
      handleTextChanged,
    };
  },
});
</script>

<style scoped lang="scss">
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
