<template>
  <div :class="classname">
    <label v-if="prefix(field)" v-html="prefix(field)" />
    <datetime
      v-model="field.value"
      :type="componentType"
      :format="componentFormat"
      :phrases="phrases"
      
      @close="prehandleChange"
    >
    <!-- :week-start="weekStart" -->
      <template slot="button-cancel">
        <a
          class="button-white"
          v-html="phrases.cancel"
        />
      </template>
      <template
        slot="button-confirm"
        slot-scope="scope"
      >
        <a
          v-if="scope.step === &quot;date&quot;"
          class="button-primary"
          v-html="phrases.next"
        />
        <a
          v-else-if="scope.step === &quot;month&quot;"
          class="button-primary"
          v-html="phrases.next"
        />
        <a
          v-else
          class="button-primary"
          v-html="phrases.ok"
        />
      </template>
    </datetime>
    <label
      v-if="suffix(field)"
      v-html="suffix(field)"
    />
  </div>
</template>
<script>
    import { fieldMixin } from "./../form";
    import { Datetime } from "vue-datetime";
    // import luxon from 'luxon'
    import { Settings } from "luxon";

    // You need a specific loader for CSS files
    import "vue-datetime/dist/vue-datetime.css";

    export default {
        components: {
            datetime: Datetime
        },
        mixins: [fieldMixin],
        props: ["field", "classname", "type"],
        data() {
            return {
                phrases: {
                    ok: "Ok",
                    cancel: "Cancel",
                    next: "Next"
                },
                weekStart: 7,
            };
        },
        computed: {
            componentType() {
                if (typeof (this.type) !== "undefined" && this.type)
                    {return this.type;}

                return "datetime";
            },
            componentFormat() {
                switch (this.componentType) {
                    case "datetime":
                    default:
                        return "dd-MM-yyyy HH:mm";
                    case "date":
                        return "dd-MM-yyyy";
                    case "time":
                        return "HH:mm";
                }
            },
        },
        mounted() {
            Settings.defaultLocale = this.field.locale ? this.field.locale : "en-US";
            this.weekStart = this.field.weekStart;

            if (this.field.locale) {
                switch (this.field.locale.toLowerCase()) {
                    case "nl":
                    case "nl-nl":
                        this.phrases = { ok: "Ok", cancel: "Annuleren", next: "Volgende" };
                        break;
                }
            }
        },
        methods: {
            prehandleChange() {
                this.handleChange();
            },
            handleChange() {
                if (this.field.event !== "none") {
                    console.log(`triggerChange:${this.componentType}`);
                    this.$emit("onchange", undefined, this.field);
                }
            },
        },
    };
</script>
