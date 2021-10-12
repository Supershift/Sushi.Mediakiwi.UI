<template>
    <div :class="inputContainerClasses">
        <!-- <label v-if="returnValue(prefix)" v-html="returnValue(prefix)"></label> -->
        <fa v-if="fieldIcon" :icon="fieldIconChoice" class="input-icon"></fa>
        <label :for="fieldName" class="input-label">
        <input type="text"
            :value="inputText"
            @change="handleChange"
            :class="customInputClasses"
            :name="fieldName"
            :id="id"
            :required="fieldRequired"
            :placeholder="fieldPlaceholder"
            v-bind:disabled="disabled || readOnly">
        </label>
        <!-- <label v-if="returnValue(suffix)" v-html="returnValue(suffix)"></label> -->
    </div>
</template>
<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue';

export default defineComponent({
  name: 'FormInput',
  props: {
    customClass: {
      type: String,
      required: false,
    },
    customContainerClass: {
      type: String,
      required: false,
    },
    fieldPlaceholder: {
      type: String,
      required: false,
    },
    fieldName: {
      tpye: String,
      required: false,
    },
    fieldValue: {
      tpye: String,
      required: false,
    },
    fieldIcon: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    prefix: {
      type: String,
      required: false,
    },
    suffix: {
      type: String,
      required: false,
    },
    readOnly: {
      type: Boolean,
      required: false,
    },
    fieldRequired: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['valueChanged'],
  setup(props, context) {
    let inputText = ref('');
    const id = computed(() => `_ ${props.customClass}_${props.fieldName}`);
    const inputContainerClasses = computed(() => ['input-container ', props.customContainerClass]);
    const customInputClasses = computed(() => ['input-primary ', props.customClasses]);
    const fieldIconChoice = computed(() => {
      let icon = '';
      switch (props.fieldIcon) {
        case 'email':
          icon = ['fas', 'at'];
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
      console.log('TODO: Handle Click');
      context.emit('valueChanged');
    }
    onMounted(() => {
      if (props.fieldValue) {
        inputText = props.fieldValue;
      }
    });
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
  .input-icon {
    position: absolute;
    top: 18px;
    left: 15px;
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
