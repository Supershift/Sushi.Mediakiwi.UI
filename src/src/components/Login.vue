<template>
  <form class="login" @submit.prevent="handleLogin">
    <img src="../assets/images/vaultN-logo.svg" class="login-logo" />
    <h1>{{ contentLogin.loginHeadlineText }}</h1>
    <CustomInput
    :customClass="'input-password'"
    :fieldIcon="'email'"
    :fieldPlaceholder="'Email'"
    :disabled="false"
    :suffix="'*'"
    :prefix="''"
    :fieldName="'email'"
    :fieldValue="''"
    :readOnly="false"
    :customContainerClass="'normal'" />
    <CustomInput
    :customClass="'input-password'"
    :fieldIcon="'password'"
    :fieldPlaceholder="'Password'"
    :disabled="false"
    :suffix="'*'"
    :prefix="''"
    :fieldName="'password'"
    :fieldValue="''"
    :readOnly="false"
    :customContainerClass="'alert'"/>
    <FormErrors v-if="errroMessages" :messages="errroMessages"></FormErrors>
    <a href="#/forgot" class="link">{{ contentLogin.loginForgotPasswordText }}</a>
    <button class="btn btn-login" type="submit">{{ contentLogin.loginButtonText }}</button>
    <a href="#/reset" class="link">{{ contentLogin.loginCreateAccountText }}</a>
  </form>
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  ref,
} from 'vue';
import store from '../store/index';
import FormErrors from './form/FormErrors.vue';
import CustomInput from './form/CustomInput.vue';
import CustomInputModel from '../models/customInputModel';

export default defineComponent({
  name: 'Login',
  components: {
    FormErrors,
    CustomInput,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const errroMessages = ref('');
    const contentLogin = computed(() => store.getters.contentLogin);
    const customEmailInput = reactive<CustomInputModel>({
      customClass: 'input-password',
      fieldIcon: 'email',
      fieldPlaceholder: 'Email',
      disabled: false,
      suffix: '*',
      prefix: '',
      fieldName: 'email',
      fieldValue: '',
      readOnly: false,
      customContainerClass: 'normal',
    });
    function handleLogin() {
      console.log('TODO: Fix login');
    }
    return {
      email,
      password,
      contentLogin,
      errroMessages,
      customEmailInput,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  position: relative;
  width: 370px;
  margin: auto;
  top: 50%;
  -webkit-transform: perspective(1px) translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: perspective(1px) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: $font-primary;
  &-logo {
    padding-bottom: 55px;
  }
  input {
    margin-bottom: 15px;
  }
  .link {
    margin-bottom: 15px;
    &:last-of-type {
      color: white;
    }
  }
  .btn-login {
    margin-bottom: 25px
  }
  h1 {
    margin: 0;
    padding-bottom: 15px;
    color: $color-blue;
  }
}
</style>
