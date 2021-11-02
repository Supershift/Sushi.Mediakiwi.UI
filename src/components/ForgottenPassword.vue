<template>
  <form action="" class="forgotten-password">
    <img
      src="../assets/images/vaultN-logo.svg"
      class="forgotten-logo" />
    <h1>
      {{
        contentForgottenPassword.forgottenHeadlineText
      }}
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
import CustomButton from "./form/CustomButton.vue";
import CustomInput from "./form/CustomInput.vue";
import FormErrors from "./form/FormErrors.vue";
import MessageModel from "../models/MessageModel";
import InputModel from "../models/InputModel";
import ButtonModel from "../models/ButtonModel";
import {store} from "@/store";

export default defineComponent({
  name: "ForgottenPassword",
  components: {
    FormErrors,
    CustomInput,
    CustomButton,
  },
  setup() {
    const errroMessages = ref<MessageModel[]>([]);
    const contentForgottenPassword = computed(
      () => store.getters.contentForgottenPassword
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
        contentForgottenPassword.value
          .submitButtonText,
      readOnly: false,
    });

    return {
      customEmailInput,
      errroMessages,
      customSubmitButton,
      contentForgottenPassword,
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
