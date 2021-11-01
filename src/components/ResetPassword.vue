<template>
  <form action="" class="resset-password">
    <img
      src="../assets/images/vaultN-logo.svg"
      class="reset-logo" />
    <h1>
      {{ contentResetPassword.resetHeadlineText }}
    </h1>
    <CustomInput
      :input="customEmailInput"
      @valueChanged="handleTextChanged" />
    <FormErrors
      v-if="errroMessages"
      :messages="errroMessages" />
    <CustomButton
      :button="customLoginButton"
      @buttonClicked="handleSubmit" />
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
} from "vue";
import MessageModel from "../models/MessageModel";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import CustomButton from "./form/CustomButton.vue";
import CustomInput from "./form/CustomInput.vue";
import FormErrors from "./form/FormErrors.vue";
import store from "../store/index";

export default defineComponent({
  name: "ForgottenPassword",
  components: {
    FormErrors,
    CustomInput,
    CustomButton,
  },
  setup() {
    const errroMessages = ref<MessageModel[]>([]);
    const contentResetPassword = computed(
      () => store.getters.contentResetPassword
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
    const customSubmitButton = ref<ButtonModel>({
      customClass: "btn-submit",
      buttonIcon: "",
      disabled: false,
      buttondName: "submit",
      value:
        contentResetPassword.value
          .submitButtonText,
      readOnly: false,
    });
    return {
      customEmailInput,
      errroMessages,
      contentResetPassword,
      customSubmitButton,
    };
  },
});
</script>

<style scoped lang="scss">
.forgotten-password {
  .btn-submit {
    margin-bottom: 25px;
    width: 70%;
    font-size: $font-size-l;
  }
}
</style>
