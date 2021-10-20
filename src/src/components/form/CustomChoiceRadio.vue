<template>
  <div :class="radioContainerClasses">         
    <label
      v-if="undefinedCheck(radio.prefix)"
      v-html="undefinedCheck(radio.prefix)"
    />
    <span
      v-for="option in radio.options"
      :key="fieldID(option)"
      class="radio-choice-container"
    >
      <input
        :id="fieldID(option)"
        type="radio"
        :class="customRadioClasses"
        :name="radio.fieldGroupName"
        :value="valueRef.value"
        :disabled="radio.disabled"
        @change="handleChange"
      >
      <span class="checkmark" />
      <label
        :for="fieldID(option)"
        v-html="option.name"
      />
    </span>
    <fa
      v-if="radio.fieldIcon"
      :icon="fieldIconChoice"
      class="radio-icon"
    />
    <label
      v-if="undefinedCheck(radio.suffix)"
      v-html="undefinedCheck(radio.suffix)" 
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from "vue";
import useCheckUndefined from "./index";
import RadioModel from "../../models/RadioModel";
import OptionModel from "../../models/OptionModel";

export default defineComponent({
    name: "RadioChoice",
    mixins: [useCheckUndefined],
    props: {
        radio: {
            type: Object as PropType<RadioModel>,
            required: true,
        },
    },
    emits:["radioChanged"],
    setup(props, context) {
        const valueRef = reactive({value: ""});
        const customRadioClasses = computed(() => ["radio-primary ", props.radio.customClass]);
        onMounted(() => {
                if (typeof (props.radio.fieldValue) === "string") {
                if (props.radio.fieldValue.toLowerCase() === "false") {
                    //props.radio.fieldValue = "0";
                    valueRef.value = "0";
                }
                else if (props.radio.fieldValue.toLowerCase() === "true") {
                    //props.radio.fieldValue = "1";
                    valueRef.value = "1";
                }
            }
        });
        function handleChange(e: Event) {
            if (props.radio.fieldValue !== null) {
                context.emit("radioChanged", e, props.radio.fieldValue);
            }
        }
        function fieldID(option: OptionModel) {
            return `${props.radio.fieldValue}_${props.radio.fieldName}_${option.value}`;
        }
        const radioContainerClasses = computed(() => {
        let iconColor: string;
        switch (props.radio.fieldIcon) {
            case "email":
            iconColor = "normal";
            break;
            case "password":
            iconColor = "alert";
            break;
            case "warning":
            iconColor = "warn";
            break;
            case "key":
            iconColor = "normal";
            break;
            case "finger":
            iconColor = "normal";
            break;
            default:
            iconColor = "normal";
            break;
        }
        return ["radio-container ", iconColor];
        });
        const fieldIconChoice = computed(() => {
        let icon: string[];
        switch (props.radio.fieldIcon) {
            case "email":
            icon = ["fal", "at"];
            break;
            case "password":
            icon = ["fal", "lock-alt"];
            break;
            case "warning":
            icon = ["fal", "exclamation-triangle"];
            break;
            case "key":
            icon = ["fal", "key"];
            break;
            case "finger":
            icon = ["fal", "fingerprint"];
            break;
            default:
            icon = [""];
            break;
        }
        return icon;
        });
        return {
            fieldID,
            valueRef,
            fieldIconChoice,
            handleChange,
            customRadioClasses,
            radioContainerClasses,
        };
    },
});
</script>

<style scoped lang="scss">
.radio-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: $font-primary;
    font-size: $font-size-s;
    input {
        position: absolute;
        opacity: 0;
        z-index: 30;
        cursor: pointer;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background: #eee;
        border-radius: 50%;
        z-index: 20;
        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }
    .radio-choice-container {
        display: block;
        position: relative;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: $font-size-xl;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &:hover {
            input ~ .checkmark {
                background: $color-blue;
            }
        }
        input:checked ~ .checkmark  {
            background: $color-blue;
        }
        label {
            padding: 20px;
            padding-left: 35px ;
        }
        .checkmark{
            &:after {
                top: 9px;
                left: 9px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: white;
            }
        }
    }
    .normal {
        .radio-icon {
            color: $color-blue;
        }
    }
    .alert {
        .radio-icon {
            color: $color-alert;
        }
    }
}
</style>