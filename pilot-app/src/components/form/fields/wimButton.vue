<template>
    <a :id="field.propertyName"
       :title="field.title"
       :data-title="field.title"
       :disabled="field.disabled || field.readOnly"
       :href="href"
       v-bind:target="field.target"
       v-bind:class="getButtonClass(field)"
       v-html="field.title"
       v-on="eventHandler(field, 'Event')"></a>
</template>
<script>
    import { fieldMixin } from './../form';
    import { MediakiwiQueryParam } from './../../../utils/shared'

    export default {
        props: ['field'],
        mixins: [fieldMixin],
        computed: {
            confirmation() {
                let options = undefined

                if (this.field.askConfirmation) {
                    options = {
                        message: this.field.confirmationMessage,
                        okText: this.field.confirmationMessageYes,
                        cancelText: this.field.confirmationMessageNo,
                    }
                }
                return options;
            },
            href() {
                if (!this.field.href || (this.field.href && this.field.href.indexOf('openinframe') > -1)) {
                    return undefined;
                }
                return this.field.href;
            }
        },
        data() {
            return {

            }
        },
        methods: {
            getButtonClass(button) {
                if (!button)
                    return;

                let _class = '';
                if (button.className) {
                    _class = button.className;
                }

                if (button.isPrimary)
                    _class += " button-primary";
                else
                    _class += " button-secundary";
                return _class;
            },
            confirm() {
                return new Promise((resolve, reject) => {
                    if (!this.confirmation)
                        return resolve();

                    this.$dialog.confirm(this.confirmation.message, this.confirmation).then((dialog) => {
                        resolve();
                    }, () => {
                        reject();
                    });
                });
            },
            Event($event) {
                $event.preventDefault();
                this.confirm().then(() => {
                    if (this.field.href) {
                        // TODO remove routing meuk
                        if (this.field.href.indexOf('openinframe=') > -1) {
                            // #/form/1/1?openinframe=1
                            let s = this.field.href
                                .replace('openinframe=1', '')
                                .replace('#/form/', '')
                                .replace('#/list/', '')
                                .replace('?', '')
                                .replace(/&/g, '');
                            s = s.split('/');

                            let listID = parseInt(s[0]);
                            let itemID = undefined;
                            if (s[1])
                                itemID = parseInt(s[1]);
                            this.$wimModal.open(new MediakiwiQueryParam(listID, itemID));
                        }
                        else {
                            //
                        }
                    }
                    else {
                        this.$emit('onclick', $event, this.field);
                    }
                }, () => {
                    // canceled
                });
                return false;
            },
        },
    }
</script>