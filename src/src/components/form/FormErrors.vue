<template>
  <div class="form-error-container">
    <span
      v-show="messageList.length"
      class="message"
    >
      <p>
        <fa icon="exclamation-triangle" />
        <span
          v-for="(message, index) in messageList"
          :key="index">
          {{ message.message }}
        </span>
      </p>
    </span>
    <span
      v-show="errorList.length"
      class="error"
    >
      <p>
        <fa icon="exclamation-triangle" />
        <span
          v-for="(error,index) in errorList"
          :key="index">
          {{ error.message }}
        </span>
      </p>
    </span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import MessageModel from "../../models/MessageModel";

export default defineComponent({
  name: "FormErrors",
  props: {
    messages: {
      type: Object as PropType<MessageModel[]>,
      required: true,
    },
  },
  setup(props) {
    const messageList = computed(() => {
      if (props.messages && props.messages.length) {
        const msgs = props.messages.filter((message: MessageModel) => !message.isError);
        if (msgs) {
          return props.messages.map((m) => m.message || m.isError);
        }
      }
      return [];
    });
    const errorList = computed(() => {
      if (props.messages && props.messages.length) {
        const errs = props.messages.filter((message: MessageModel) => !message.isError);
        if (errs) {
          return props.messages.map((m) => m.message || m.isError);
        }
      }
      return [];
    });
    return {
      messageList,
      errorList,
    };
  },
});
</script>
