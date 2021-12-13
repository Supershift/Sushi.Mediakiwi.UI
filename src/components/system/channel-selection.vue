<template>
    <div class="channel">
        <h3>Channel Selection</h3>
        <table>
            <tbody>
                <tr>
                    <th>Channel Selection</th>
                    <td>
                        <wimChoiceDropdown :field="field" 
                                           @onchange="change"></wimChoiceDropdown>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import wimChoiceDropdown from './../form/fields/wimChoiceDropdown.vue';
    import { MediakiwiField, FieldType, EventType } from './../form/form';

    export default {
        name: 'channel-selection',
        props: ['content'],
        components: {
            wimChoiceDropdown
        },
        computed: {
            field() {
                let f = new MediakiwiField(FieldType.wimChoiceDropdown, 'Channel', 'channel');
                f.options = this.content.channels;
                f.event = EventType.change
                f.value = this.$store.getters.channel
                return f;
            },            
        },
        methods: {
            change($event, field) {
                // set channel!!
                if (field.value) {
                    let channel = parseInt(field.value);
                    this.$store.dispatch('setChannel', channel);
                    this.$emit('onchange', channel);
                }
            }
        },
    }
</script>