<template>
    <div>
        <transition name="modal" v-if="show">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                                <button type="button"
                                        class="btn-close fa fa-times"
                                        @click="close">                                    
                                </button>
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <listView ref="list" 
                                          :IDs="IDs" 
                                          :options="listViewOptions"></listView>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import listView from './../../views/list.vue';

    export default {
        components: {
            listView
        },
        props: {
            IDs: {
                type: Object
            }
        },
        data: function () {
            return {
                show: true,
                listViewOptions: {
                    header: false,
                    scrollElement: '.modal-body'
                }
            }
        },
        methods: {
            closeAtOutsideClick() {
                this.cancel();
            },
            cancel() {
                this.close();
            },
            close() {
                this.show = false
                this.$emit('close')
            },
        },
        mounted() {
            // Fetch the mediakiwi content
            this.$refs.list.fetchList(this.IDs);
        }
    }
</script>