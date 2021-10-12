<template>
  <form class="login" @submit.prevent="handleLogin">
    <h1>{{ loginHeadlineText }}</h1>
    <!-- <notification v-if="notifications" :notifications="notifications"></notification> -->
    <input required :value="email" type="email" placeholder="{{ loginEmailPlaceholder }}" />
    <input required :value="password" type="password" placeholder="{{ loginPasswordPlaceholder }}"/>
    <button class="btn right" type="submit">{{ loginButtonText }}</button>
    <a href="#/forgot">{{ loginForgotPasswordText }}</a>
    <a href="#/reset">{{ loginResetPasswordText }}</a>
  </form>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import store from '../store/index';

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const loginHeadlineText = computed(() => store.getters.loginHeadlineText);
    const loginButtonText = computed(() => store.getters.loginButtonText);
    const loginEmailPlaceholder = computed(() => store.getters.loginEmailPlaceholder);
    const loginPasswordPlaceholder = computed(() => store.getters.loginPasswordPlaceholder);
    const loginForgotPasswordText = computed(() => store.getters.loginForgotPasswordText);
    const loginResetPasswordText = computed(() => store.getters.loginResetPasswordText);
    function handleLogin() {
      console.log('TODO: Fix login');
    }
    return {
      email,
      password,
      loginHeadlineText,
      loginButtonText,
      loginResetPasswordText,
      loginForgotPasswordText,
      loginEmailPlaceholder,
      loginPasswordPlaceholder,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss"></style>
