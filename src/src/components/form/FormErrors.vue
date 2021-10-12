<template>
    <div class="form-error-container">
        <span class="message" v-show="messageList.length">
            <p>
                <fa icon="exclamation-triangle"></fa>
                <span
                  v-for="(message, index) in messageList"
                  v-html="message.message"
                  :key="index"></span>
            </p>
        </span>
        <span class="error" v-show="errorList.length">
            <p>
                <fa icon="exclamation-triangle"></fa>
                <span
                v-for="(error,index) in errorList"
                v-html="error.message"
                :key="index"></span>
            </p>
        </span>
    </div>
</template>
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FormErrors',
  props: ['messages'],
  setup(props) {
    const messageList = computed(() => {
      if (props.messages && props.messages.length) {
        const msgs = props.messages.filter((message) => !message.isError);
        if (msgs) {
          return props.messages.map((m) => m.message || m.isError);
        }
      }
      return [];
    });
    const errorList = computed(() => {
      if (props.messages && props.messages.length) {
        const errs = props.messages.filter((message) => !message.isError);
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
