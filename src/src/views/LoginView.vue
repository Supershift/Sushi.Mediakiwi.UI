<template>
  <div class="form-container">
    <Login />
  </div>
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

<style scoped lang="scss">
.form-container {
  background: url('../assets/images/login-bg-1920x1080.png');
  background-repeat: no-repeat;
  background-position: 70% 50%;
  background-size: cover;
  height: 100vh;
}
</style>
