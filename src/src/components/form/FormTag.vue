<template>
  <div :class="classname">
    <label v-if="prefix(field)" v-html="prefix(field)"></label>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-min-length="0"
      :autocomplete-items="filteredItems"
      @tags-changed="tagsChanged"
      v-bind:disabled="field.disabled || field.readOnly"
    />
    <label v-if="suffix(field)" v-html="suffix(field)"></label>
  </div>
</template>

<script lang="ts">
import { fieldMixins } from './index';
import VueTagsInput from '@sipec/vue3-tags-input';
import { computed } from 'vue';


export default {
  props: ['field', 'classname'],
  mixins: [fieldMixins],
  components: {
    VueTagsInput
  },
  setup(props, context) {
    const filteredItems = computed(() => {
        return this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
    })
    const autocompleteItems = computed(() => {
        return this.field.options.filter((o) => o.text).map((option) => {
            return {
                text: option.text
            };
        });
    })
    return {};
  },
  computed: {
    tags: {
      get() {
        if (this.field.value) {
          return this.field.value.map((v) => {
            let option = this.field.options.find((o) => o.value === v);
            let text = ""
            if (v) {
              if (typeof (v) === "string") {
                text = v;
              }
              else if (typeof (v) === "object") {
                v.text
              }
            }

            return {
              text: option ? option.text : text,
              tiClasses: ["ti-valid"]
            };
          });
        }
        return [];
      },
      set(value) {
          // console.log(value);
          this.field.value = value.map(r => r.text);
      }
    }
  },
  data() {
    return {
      tag: "",
    }
  },       
  created: function () {
    if (this.field && !this.field.value)
      this.field.value = [];
  },
  methods: {
    tagsChanged(newTags) {
      // update the tags (required by component)
      this.tags = newTags;                

      // update the application of my change
      this.valueChanged();
    },
    valueChanged() {
      console.log('triggerChange:tagvue');
      this.$emit('onchange', undefined, this.field);
    },
  },
}
</script>
