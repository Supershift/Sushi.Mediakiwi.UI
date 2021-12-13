<template>
    <div class="selections">
        <table class="selections-table" v-if="columns || rows">
            <thead v-if="columns">
                <tr>
                    <th v-for="column of columns"
                        v-bind:width="column.width" v-html="column.title"></th>
                </tr>
            </thead>
            <tbody v-if="rows">
                <tr v-for="row in rows" :id="row.itemID" @click="route(row)">
                    <td v-for="item in row.items" v-html="item.value"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import { MediakiwiQueryParam } from './../../utils/shared'

    export default {
        props: ["listID", "scrollElement", "columns", "rows"],
        components: {

        },
        methods: {
            route(row) {                
                if (row.openInFrame) {
                    this.$wimModal.open(new MediakiwiQueryParam(this.listID, parseInt(row.itemID), row.params));
                }
                else {
                    this.$router.push(`/form/${this.$route.params.listID}/${row.itemID}`)
                }

            },
            loadMoreEvent() {
                let elm = document.documentElement;
                let scrollHeight = document.body.scrollHeight;
                let windowHeight = window.innerHeight;
                let fromBottom = 200;

                if (this.scrollElement) {
                    elm = document.querySelector(this.scrollElement)
                    scrollHeight = elm.scrollHeight;
                    windowHeight = elm.clientHeight;
                    fromBottom = 10;
                }

                if (scrollHeight - windowHeight - elm.scrollTop < fromBottom && elm.scrollTop > 0)
                    this.$emit('onloadmore')
            }
        },
        computed: {

        },
        mounted() {
            if (this.scrollElement) {
                document.querySelector(this.scrollElement).addEventListener("scroll", () => { this.loadMoreEvent() });
            }
            else {
                // Add event for infinite scroll
                document.addEventListener("scroll", () => { this.loadMoreEvent() });
            }
        },
        destroyed() {
            if (this.scrollElement) {
                document.querySelector(this.scrollElement).removeEventListener("scroll", () => { this.loadMoreEvent() });
            }
            else {
                // Add event for infinite scroll
                document.removeEventListener("scroll", () => { this.loadMoreEvent() });
            }
        }
    }
</script>
