<template>
    <div :class="classname">
        <label v-if="prefix(field)" v-html="prefix(field)"></label>
        <select
            :name="select.propName"
            :id="select.id"
            :disabled="select.disabled"
            :value="selectedValueState"
            @change="$emit('selectValueChanged', selectedValueState)"
        >
            <option :v-if="select.showDefault" value disabled selected>
                {{ select.defaultLabel }}
            </option>
            <option
                v-for="(opt, index) in select.propOptions"
                :key="index"
                :value="opt.propVal"
                >
                {{ opt.propName }}
            <span :v-if="opt.countForOption">({{ opt.countForOption }}) </span>
            </option>
        </select>
        <label v-if="suffix(field)" v-html="suffix(field)"></label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import SelectModel from '../../models/FormModels';

export default defineComponent({
    name: 'FormSelect',
    props: {
      select: {
        type: Object as PropType<SelectModel>,
        required: true,
      },
    },
    emits: ['selectValueChanged'],
    setup(props) {
      const selectedValueState = ref<number>();
      const isNotEmpty = computed(() => {
        return selectedValueState.value !== null;
      });
      const selectContainerClasses = computed(() => {
        return ["select-primary ", props.select?.customClass];
      });
      const iconClasses = computed(() => {
        return {
          "checkout-icon-valid": isNotEmpty.value,
        };
      });
      return {
        selectContainerClasses,
        iconClasses,
        selectedValueState,
      };
    },
});
</script>

<style scoped lang="scss"></style>