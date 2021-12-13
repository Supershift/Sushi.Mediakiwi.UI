<template>
    <mediakiwiModal v-if="data"
                    :id="data.listID"
                    :key="data.listID"
                    :IDs="data"                    
                    @close="destroyDialog">
    </mediakiwiModal>
</template>
<script>
    import mediakiwiModal from './../components/page/mediakiwi-modal.vue'

    export default {
        components: {
            mediakiwiModal
        },
        data: function () {
            return {
                data: undefined,
            }
        },
        methods: {
            commit(data) {
                this.data = data;                
            },
            destroyDialog() {
                this.$wimModal.destroy();
            },
        },
    }
</script>