<template>
    <div class="content-container row">
        <div class="col main-container">
          <CustomSelectInput />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import CustomSelectInput from './form/CustomSelectInput.vue';

export default defineComponent({
  name: 'main-view',
  components: {
    CustomSelectInput,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.content-container {
  margin: auto;
  height: auto;
  .main-container {
      margin: auto;
  }
}
</style>
