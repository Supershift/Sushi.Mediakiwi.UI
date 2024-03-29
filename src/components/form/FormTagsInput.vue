<template>
  <div
    class="tag-input"
    :class="{'with-count': showCount}">
    <input
      v-model="newTag"
      type="text"
      :list="id"
      autocomplete="off"
      :name="field.propertyName"
      :aria-label="field.helpText"
      :title="field.helpText"
      :maxlength="field?.maxLength"
      :required="field?.isMandatory"
      :hidden="field?.isHidden"
      :style="{
        'padding-left': `${paddingLeft}px`,
      }"
      @keydown.prevent.enter="addTag(newTag)"
      @keydown.prevent.tab="addTag(newTag)"
      @keydown.prevent.esc="clear()"
      @blur="addTag(newTag)"
      @keydown.delete="
        newTag.length ||
          removeTag(tags.length - 1)
      " />

    <datalist v-if="options" :id="id">
      <option
        v-for="option in availableOptions"
        :key="option"
        :value="option.value"
        @click="addTag(option.value)"
        >
        {{ option.text }}
      </option>
    </datalist>

    <ul ref="tagsUl" class="tags">
      <li
        v-for="(tag, index) in tags"
        :key="tag"
        class="tag"
        :class="{duplicate: tag === duplicate}"
        :title="displayName(tag)?.text">
        {{ displayName(tag)?.value }}
        <button
          class="delete"
          @click="removeTag(index)">
          <!-- eslint-disable-next-line vue/no-unregistered-components -->
          <fa icon="times"></fa>
        </button>
      </li>
    </ul>
    <div v-if="showCount" class="count">
      <span>{{ tagsLength }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ref,
  watch,
  nextTick,
  onMounted,
  computed,
  defineComponent,
  PropType,
} from "vue";
import { ITagsUI } from "../../models/Local/Interfaces";


import { IField, IFieldOption } from "../../models/Mediakiwi/Interfaces";
export default defineComponent({
  name: "TagsInput",
  props: {
    field: { 
      type: Object as PropType<IField>,
      required: true
    },
    fieldModel: {
      type: Array as PropType<Array<string>>,
      required: false,
      default: () => {
        return [];
      },
    },
    options: {
      type: Array as PropType<Array<IFieldOption>>,
      required: false
    },
    allowCustom: {type: Boolean, default: false},
    showCount: {type: Boolean, default: false},
  },
  emits: ["change-made"],
  setup(props, {emit}) {
    /* 
      Made using example : https://codesandbox.io/s/crazy-sunset-w25zb?file=/src/components/TagInput.vue 
    */
    const radixNumber = 36;
    const startubstring = 7;
    // Tags
    const tags = ref<Array<string>>(props.fieldModel);
    const newTag = ref("");
    const id = Math.random()
      .toString(radixNumber)
      .substring(startubstring);
    const tagsLength = computed(
      () => `${tags.value.length} tags`
    );

    // handling duplicates
    const duplicate = ref("");
    const oneSecond = 1000;
    function clear() {
      newTag.value = "";
    }
    const handleDuplicate = (tag: string) => {
      duplicate.value = tag;
      setTimeout(
        () => (duplicate.value = ""),
        oneSecond
      );
      clear();
    };

    function addTag(tag: string) {
            
      if (!tag) {
        return;
      } // prevent empty tag

      // return early if duplicate
      if (tags.value.includes(tag)) {
        handleDuplicate(tag);
        return;
      }
      // only allow predefined tags when allowCustom is false
      if (
        props.allowCustom === false &&
        props.options &&
        props.options.findIndex((o) => o.value === tag) !== -1
      ) {
        //trim and strip all special char and whitespace and post
        tags.value.push(tag.toUpperCase().trim().replace(/[^a-zA-Z ]/g, ""));
        clear(); // reset newTag
        return;
      } 
    }
    const removeTag = (index: number) => {
      tags.value.splice(index, 1);
    };

    // positioning and handling tag change
    const tenPadding = 10;
    const paddingLeft = ref(tenPadding);
    const tagsUl = ref<ITagsUI>();
    const onTagsChange = () => {
      if (tagsUl.value && tagsUl.value.scrollWidth && tagsUl.value.clientWidth) {
      // position cursor
      const extraCushion = 15;
      paddingLeft.value =
        tagsUl.value.clientWidth + extraCushion;
      // scroll to end of tags
        tagsUl.value.scrollTo(
        tagsUl.value.scrollWidth,
        0
      );
      }
      
      // emit value on tags change
      emit("change-made", tags.value);
    };
    watch(tags, () => nextTick(onTagsChange), {
      deep: true,
    });
    onMounted(onTagsChange);

    // options
    const availableOptions = computed(() => {
      if (!props.options) {
        return false;
      }
      return props.options.filter(
        (option: IFieldOption) => !tags.value.includes(option.value)
      );
    });

    function displayName(tagValue: string) {
      if (props.options) {
        return props.options.find((o: IFieldOption) => o.value === tagValue);
      }
      return ""
    }

    return {
      tags,
      newTag,
      addTag,
      removeTag,
      clear,
      paddingLeft,
      tagsUl,
      availableOptions,
      id,
      duplicate,
      tagsLength,
      displayName,
    };
  },
});
</script>
<style scoped lang="scss">
ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  max-width: 75%;
  overflow-x: auto;
}
.tag {
  background: $color-grad-success;
  padding: 8px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  transition: 0.1s ease;
  display: flex;
  flex-wrap: wrap;
}

.tag-input {
  position: relative;
  font-family: $font-primary;
  font-size: $font-size-l;
  input {
    height: 50px;
    width: 100%;
    max-width: calc(100vw - 80px);
    font-size: $font-size-l;
    color: $color-drakgrey;
    padding-left: 1rem;
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
}

.delete {
  color: white;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}
@keyframes shake {
  10%,
  90% {
    transform: scale(0.9) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: scale(0.9) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: scale(0.9) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: scale(0.9) translate3d(4px, 0, 0);
  }
}
.tag.duplicate {
  background: $color-grad-alert;
  animation: shake 1.5s;
}
.count {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;
}
.count span {
  background: #eee;
  padding: 2px;
  border-radius: 2px;
}
.with-count input {
  padding-right: 60px;
}
.with-count ul {
  max-width: 60%;
}
</style>
