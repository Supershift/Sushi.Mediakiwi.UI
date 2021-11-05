<template>
  <div class="form-error-container">
    <span
      v-show="messageList.length"
      class="message"
    >
      <p>
        <span
          v-for="message in messageList"
          :key="message.code">
         <fa icon="exclamation-circle" class="icon" /> {{ message }}
        </span>
      </p>
    </span>
    <span
      v-show="errorList.length"
      class="error"
    >
      <p>
        <span
          v-for="error in errorList"
          :key="error.code">
         <fa icon="exclamation-triangle" class="icon" /> {{ error }}
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
          return msgs.map((m) => m.message);
        }
      }
      return [];
    });
    const errorList = computed(() => {
      if (props.messages && props.messages.length) {
        const errs = props.messages.filter((message: MessageModel) => message.isError);
        if (errs) {
          return errs.map((m) => m.message);
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

<style scoped lang="scss">
.form-error-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  .error .icon, .error span {
    color: $color-alert;
  }
  .message .icon, .message span {
    color: $color-info;
  }
  span {
    display: flex;
    align-items: flex-start;
    margin-bottom: 5px;
    p {
      margin: 0;
      span {
        display: flex;
        .icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
