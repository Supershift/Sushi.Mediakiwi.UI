<template>
  <div class="form-container">
    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoginView",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.form-container {
  background: url("../assets/images/login-bg-1920x1080.png");
  background-repeat: no-repeat;
  background-position: 70% 50%;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.login-ellipse {
  display: inline-block;
  text-align: center;
  width: 237px;
  height: 237px;
  position: relative;
  left: calc((237px / 3) * -1);
  transform: translateY(15%);
  margin-top: -50px;
  margin-bottom: -50px;

  &::before {
    border-width: 3px;
    border-color: rgb(42, 161, 232);
    border-style: solid;
    border-radius: 50%;
    position: absolute;
    width: inherit;
    height: inherit;
    display: block;
    content: "";
  }

  p {
    top: 20%;
    transform: translateY(-50%);
    position: relative;
    color: #fff;
    right: -50%;
    font-size: 30px;
    text-align: left;
    width: 380px;
    max-width: calc(100vw - 30px);
    font-family: $font-primary;
  }
}

@media screen and (min-width: 1024px) {
  .login-ellipse {
    width: 463px;
    height: 462px;
    top: unset;
    left: calc(100% + (462px / 6));
    bottom: 0;
    transform: translate(-100%);
    margin-top: -150px;
    margin-bottom: -150px;

    p {
      transform: unset;
      right: unset;
      width: unset;
      padding: 50px;
    }
  }
}

@media screen and (min-width: 1400px) {
  .form-container {
    align-items: center;
  }

  .login-ellipse {
    top: -250px;
    left: 463px;
    bottom: unset;
    right: unset;
    transform: unset;
    margin-top: unset;
    margin-bottom: -220px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      position: initial;
    }
  }
}
</style>
