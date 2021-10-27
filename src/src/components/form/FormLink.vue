<template>
    <div :class="classname">
        <div class="long" :class="fieldClass(field)">
            <div class="multiSortable select">
                <input type="hidden" :name="fieldID" value="_MK$PH_" />
                <ul :id="fieldID" class="single add" v-observer:subtree.childList="handler">
                    <li class="instant">
                        <a class="openlayer" :data-layer="dataLayer" title="File Upload" :href="itemLayerUrl" v-html="valueLabel"></a>
                        <figure class="icon-x del"></figure>
                        <input type="hidden" :id="itemID" :name="itemID" :value="valueText" />
                    </li>
                </ul>
            </div>
            <div class="buttonContainer">
                <a class="openlayer" :data-layer="dataLayer" :href="newLayerUrl" title="File Upload"><figure class="icon-plus"></figure></a>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script lang="ts">
import observer from "vue-mutation-observer";
import { portalName } from "../../utils/utils";
import { fieldMixins } from "./index";

export default {
    props: ["field", "classname"],
    mixins: [fieldMixins],
    directives: {
        observer,
    },
    computed: {
        fieldID(option) {
            return `_e125c${this._uid}`;
        },
        newLayerUrl() {
            return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${this.fieldID}`;
        },
        itemLayerUrl() {
            if (this.field.value && this.field.value.id) {
                return `${rootPath}/${portalName}?list=5&openinframe=1&referid=${this.fieldID}&item=${this.field.value.id}`;
            }
            return "";
        },
        dataLayer() {
            return "width:790px,height:450px,iframe:true,scrolling:false";
        },
        itemID() {
            return `${this.fieldID}$1$0`;
        },
        valueText() {
            if (this.field.value) {
                return `${this.field.value.id}|${this.field.value.label}`;
            }
            return "";
        },
        valueLabel() {
            if (this.field.value && this.field.value) {
                return `${this.field.value.label}`;
            } // <span>(${this.link.width}px / ${this.link.height}px)</span>`
            return "";
        },
    },
    methods: {
        handler(mutationList) {
            if (this.field.event !== "none") {
                if (mutationList.length >= 1) {
                    console.log("triggerChange:wimLink");
                    let elmID = mutationList[0].target.id;
                    let input = document.querySelector(`ul#${elmID} input[id^="${elmID.substr(1)}"]`);
                    if (input) {
                        let id = parseInt(input.nodeValue.split("|")[0]);
                        let label = input.nodeValue.split("|")[1];

                        let link = {
                            id,
                            label,
                        };
                        this.field.value = Object.assign({}, link);
                    } else {
                        this.field.value = undefined;
                    }
                    this.$emit("onchange", undefined, this.field);
                }
            }
        },
    },
};
</script>
