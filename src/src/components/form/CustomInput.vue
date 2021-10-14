<template>
    <div :class="inputContainerClasses">
        <label
        v-if="undefinedCheck(input.prefix)"
        v-html="undefinedCheck(input?.prefix)"
        class="input-prefix"
        ></label>
        <fa v-if="input.fieldIcon" :icon="fieldIconChoice" class="input-icon"></fa>
        <label :for="input.fieldName" class="input-label">
        <input type="text"
            :value="inputText"
            @change="handleChange"
            :class="customInputClasses"
            :name="input.fieldName"
            :id="id"
            :required="input.fieldRequired"
            :placeholder="input.fieldPlaceholder"
            v-bind:disabled="input.disabled || input.readOnly">
        </label>
        <label
        v-if="undefinedCheck(input.suffix)"
        v-html="undefinedCheck(input?.suffix)"
        class="input-suffix"
        ></label>
    </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from 'vue';
import InputModel from '../../models/InputModel';
import useCheckUndefined from './index';

export default defineComponent({
  name: 'FormInput',
  props: {
    input: {
      type: Object as PropType<InputModel>,
      required: true,
    },
  },
  mixins: [useCheckUndefined],
  emits: ['valueChanged'],
  setup(props, context) {
    const inputText = reactive<String>('');
    const id = computed(() => `_${props.input.customClass}-${props.input.fieldName}`);
    const inputContainerClasses = computed(() => {
      let iconColor: String;
      switch (props.input.fieldIcon) {
        case 'email':
          iconColor = 'normal';
          break;
        case 'password':
          iconColor = 'alert';
          break;
        case 'warning':
          iconColor = 'warn';
          break;
        case 'key':
          iconColor = 'normal';
          break;
        case 'finger':
          iconColor = 'normal';
          break;
        default:
          iconColor = 'normal';
          break;
      }
      return ['input-container ', iconColor];
    });
    const customInputClasses = computed(() => ['input-primary ', props.input.customClass]);
    const fieldIconChoice = computed(() => {
      let icon: any;
      switch (props.input.fieldIcon) {
        case 'email':
          icon = ['fal', 'at'];
          break;
        case 'password':
          icon = ['fal', 'lock-alt'];
          break;
        case 'warning':
          icon = ['fal', 'exclamation-triangle'];
          break;
        case 'key':
          icon = ['fal', 'key'];
          break;
        case 'finger':
          icon = ['fal', 'fingerprint'];
          break;
        default:
          icon = [''];
          break;
      }
      return icon;
    });
    function handleChange() {
      context.emit('valueChanged');
    }
    return {
      id,
      inputText,
      inputContainerClasses,
      customInputClasses,
      fieldIconChoice,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.input-container {
  position: relative;
  margin: 25px 0;
  margin-left: -70px;
  .input-icon {
    position: absolute;
    top: 18px;
    left: 15px;
  }
  .input-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
  .input-suffix {
    position: absolute;
    right: -60px;
    top: 14px;
    color: $color-alert;
    font-size: $font-size-xxl;
  }
}
.normal {
  .input-icon {
    color: $color-blue;
  }
}
.alert {
  .input-icon {
    color: $color-alert;
  }
}
.input-label {
  display: block;
  font-weight: bold;
  text-align: center;
  .input-primary {
      border: none;
      height: 50px;
      line-height: 40px;
      width: 100%;
      border-radius: 3px;
      padding-left: 35px;
      padding-right: 35px;
      font-size: $font-size-l;
      color: $color-drakgrey;
  }
}
</style>
