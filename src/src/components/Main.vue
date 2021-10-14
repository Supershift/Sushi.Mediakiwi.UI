<template>
    <div class="content-container row">
        <div class="col main-container">
          <CustomSelectInput :select="customSelectTestInput"/>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import CustomSelectInput from './form/CustomSelectInput.vue';
import SelectInputModel from '../models/SelectModel';
import SelectOptionModel from '../models/OptionModel';

export default defineComponent({
  name: 'main-view',
  components: {
    CustomSelectInput,
  },
  setup() {
    const customSelectTestOptions = ref<SelectOptionModel>([{
      value: 0,
      name: 'test',
      countForOption: 1,
    }]);
    const customSelectTestInput = ref<SelectInputModel>({
      error: '',
      disabled: false,
      mandatory: false,
      value: '',
      tabindex: 0,
      fieldName: 'main-select',
      fieldIcon: '',
      customClass: 'select-primary',
      hasValidation: false,
      isValid: true,
      showLabel: true,
      showDefault: true,
      defaultLabel: true,
      options: customSelectTestOptions,
    });
    return {
      customSelectTestInput,
    };
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
