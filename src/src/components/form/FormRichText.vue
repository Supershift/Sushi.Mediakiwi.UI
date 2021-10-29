<template>
    <div :class="customRichtextContainerClasses">
        <editor
            api-key="4w7n1fpw2lpcb86gkmkqfpsrefktlebicr8wc1lzwuy0evy4"
            :id="richtext.propertyName"
            :init="tinymceInit"
            v-model="valueRef"
            :class="customRichtextClasses"
            :disabled="richtext.disabled || richtext.readOnly"
            @blur="handleChange"
        />
    </div>
</template>
<script lang="ts">
// import Editor from '@tinymce/tinymce-vue';
import { defineComponent, PropType, ref, computed, reactive } from "vue";
import FieldModel from "../../models/FieldModel";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
    name: "RichText",
    components: {
        editor: Editor,
    },
    props: {
        richtext: {
            type: Object as PropType<FieldModel>,
            required: true,
        },
        classname: {
            type: String,
            required: true,
        },
    },
    emits: ["valueChanged"],
    setup(props, context) {
        let valueRef = ref("");

        const customRichtextContainerClasses = computed(() => [
            "richtext-container ",
            props.richtext?.className,
        ]);
        const customRichtextClasses = computed(() => [
            "richtext-primary ",
            props.classname,
        ]);

        function handleChange(values: string) {
            if (props.richtext?.event !== "none") {
                context.emit("valueChanged", values);
            }
        }
        const tinymceInit = {
            menubar: false,
            statusbar: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
                "bold italic underline bullist numlist indent outdent link unlink removeformat subscript superscript code",
        };

        return {
            handleChange,
            customRichtextClasses,
            customRichtextContainerClasses,
            valueRef,
            tinymceInit,
        };
    },
});
</script>

<style scoped lang="scss">
.richtext-container {
  margin-bottom: 15px;
}
</style>
