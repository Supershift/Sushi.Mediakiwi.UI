<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <article class="file-upload-container">
    <div class="error" v-if="errorMessage" v-html="errorMessage"></div>
    <div class="dropzone-container">
      <DropZone
        ref="myDropzone"
        id="dropzone"
        :upload-on-drop="false"
        :multiple-uploads="true"
        :accepted-files="acceptedFiles"
        :param-name="paramName"
        :max-filesize="maxFilesize"
        :url="url"
        @uploaded="onSuccessUpload"
        @errorUpload="onErrorUpload"></DropZone>
    </div>
    <CustomButton :button="customSubmitButton" @button-clicked="post" />
  </article>
</template>

<!-- eslint-disable no-console -->
<script>
import {defineComponent} from "@vue/runtime-core";
import DropZone from "dropzone-vue";
import CustomButton from "./../base-components/CustomButton.vue";
// optionally import default styles
import "dropzone-vue/dist/dropzone-vue.common.css";

export default defineComponent({
  props: {
    view: {
      type: Object,
      required: true,
    },
  },
  components: {
    DropZone,
    CustomButton,
  },
  computed: {
    acceptedFiles() {
      return this.view.additionalProperties
        .find((property) => property.name === "acceptedFiles")
        .value.split(",");
    },
    url() {
      return this.view.additionalProperties.find(
        (property) => property.name === "uploadUrl"
      ).value;
    },
  },
  data() {
    return {
      loading: false,
      uploadErrors: 0,
      errorMessage: "",
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 300000000,
      customSubmitButton: {
        customClass: "btn-upload right",
        buttonIcon: "",
        disabled: false,
        buttondName: "upload",
        value: "Upload",
        readOnly: false,
      },
    };
  },
  methods: {
    onErrorUpload(file, mes, xhr) {
      if (xhr && xhr.responseText) {
        let messages = "";
        var xhrResponse = JSON.parse(xhr.responseText);
        if (xhrResponse) {
          try {
            var response = JSON.parse(xhrResponse.message);
            if (response && typeof response.Errors !== "undefined") {
              messages = response.Errors.join(", ");
            }
          } catch (e) {
            messages = xhrResponse.message;
          }
        }
        this.errorMessage = messages;
      }
      this.uploadErrors++;
      this.$refs.myDropzone.removeAllFiles();
      this.loading = false;
    },
    onSuccessUpload(file, response) {
      this.loading = false;
      // console.log(response);
      // console.log(file);
      this.loading = false;
    },
    post() {
      this.loading = true;
      this.$refs.myDropzone.processQueue();
    },
  },
});
</script>
<style lang="scss">
.file-upload-container {
  .dropzone-container {
    margin-bottom: 25px;
    .dropzone__box {
      border-color: #ddd;
      min-height: 150px;
      cursor: pointer;

      .gg-close {
        color: $color-alert;
      }

      .gg-danger {
        color: $color-blue;
      }

      .dropzone__item {
        margin: 0;
        font-family: $font-primary;
      }

      .dropzone__message {
        height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: $font-primary;

        &::before {
          content: "";
          background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='inbox-in' class='svg-inline--fa fa-inbox-in fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='%23203195' d='M395.5 185.5l-99 99c-4.7 4.7-12.3 4.7-17 0l-99-99c-7.6-7.6-2.2-20.5 8.5-20.5h67V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v153h67c10.7 0 16.1 12.9 8.5 20.5zM528 352H408l-32 64H200l-32-64H48v112h480V352zm48 2.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V354.2c0-11.8 4.3-23.1 12.1-31.9l101.6-114.2c2.3-2.6 4.9-4.9 7.7-7 2.4-1.7 5.6-1.4 7.7.7l24.8 24.9c2.2 2.2 2.3 5.9.2 8.2L92.7 304h105l32 64h116.7l32-64h105L422 234.9c-2.1-2.4-2-5.9.2-8.2l24.6-25c2-2.1 5.3-2.4 7.7-.7 2.9 2.1 5.5 4.4 7.9 7.1L564 322.3c7.7 8.8 12 20.2 12 31.9z'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          width: 70px;
          height: 70px;
          background-position: center;
          display: block;
          margin: 0 auto 10px;
        }
      }
    }
  }
}
</style>
