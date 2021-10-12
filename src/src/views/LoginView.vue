<template>
  <article>
    <Login />
  </article>
</template>

<script>
import { defineComponent } from 'vue';
import Login from '../components/Login.vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    Login,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
