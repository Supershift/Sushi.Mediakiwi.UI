<template>
    <div>
        <header class="pageHeader" v-if="options.header">
            <bread-crumbs v-if="list && list.breadcrumbs" :content="list.breadcrumbs"></bread-crumbs>
            <list-details v-if="list && list.listDetails" :content="list.listDetails"></list-details>
        </header>

        <article class="pageArticle">
            <iconBar v-if="topButtons && topButtons.length"
                     :buttons="topButtons"
                     @onclick="onButtonClick"></iconBar>


            <notifications v-if="list && list.notifications"
                           :notifications="list.notifications"></notifications>


            <wimForm v-if="list && list.fields"
                     :fields="list.fields"
                     @onclick="onButtonClick"
                     @onchange="onFieldChange"></wimForm>

            <iconBar v-if="bottomButtons && bottomButtons.length"
                     :buttons="bottomButtons"
                     @onclick="onButtonClick"></iconBar>

            <explorer v-if="list &&  list.folders" :content="list.folders"></explorer>

            <appContainer v-if="list && list.resources && list.resources.length" :resources="list.resources"></appContainer>

            <wimList v-if="list && list.columns"
                     :listID="list.listID"
                     :columns="list.columns"
                     :rows="list.rows"
                     :openinframe="list.openInFrame"
                     :scrollElement="options.scrollElement"
                     @onloadmore="onLoadMore"></wimList>

            <div v-if="listLoading" class="loader">Loading...</div>
            <div v-if="listLoadingMore" class="loader small">Loading...</div>
        </article>
    </div>
</template>
<script>
    import iconBar from './../components/page/icon-bar.vue';
    import notifications from './../components/form/notifications.vue';
    import wimForm from './../components/form/wimForm.vue';
    import wimList from './../components/list/wimList.vue';
    import explorer from './../components/page/explorer.vue';
    import appContainer from './../components/app-container/app-container.vue';

    import breadCrumbs from './../components/navigation/bread-crumbs.vue';
    import listDetails from './../components/page/list-details.vue';

    import { shared, MediakiwiQueryParam } from './../utils/shared'
    import { api } from './../utils/api'
    import { formMixin } from './../components/form/form'

    export default {
        name: 'list-view',
        mixins: [shared, api, formMixin],
        props: {
            options: {
                type: Object,
                default() {
                    return {
                        header: true,
                        scrollElement: undefined
                    }
                },
            },
            IDs: {
                type: Object,
                default() {
                    return new MediakiwiQueryParam();
                }
            }
        },
        components: {
            notifications,
            iconBar,
            wimList,
            wimForm,
            appContainer,
            explorer,
            breadCrumbs,
            listDetails,
        },
        computed: {
            topButtons() {
                if (this.list && this.list.buttons) {
                    return this.list.buttons.filter(r => !r.section);
                }
            },
            bottomButtons() {
                if (this.list && this.list.buttons) {
                    return this.list.buttons.filter(r => r.section > 0);
                }
            },
            listLoading() {
                return this.$store.getters.listLoading
            },
            listLoadingMore() {
                return this.$store.getters.listLoadingMore
            },
        },
        data() {
            return {
                list: undefined,
                searchAfter: undefined,
            }
        },
        methods: {
            onButtonClick($event, field) {
                // console.log(`list: clicked on button ${field.title}`);
                this.fetchList(this.IDs, field.propertyName);
            },
            onFieldChange($event, field) {
                // console.log(`list: changed field ${field.title}`);
                this.fetchList(this.IDs, field.propertyName);
            },
            onLoadMore() {
                if (!this.listLoading && !this.listLoadingMore) {
                    this.fetchList(this.IDs, undefined, true);
            }
        },
        /// API
        fetchList(queryParams, target, loadmore) {
            // Build the request
            let request = {};

            // If there already is a list presen add it to the request
            if (this.list && this.list.fields) {
                request = this.getFormRequest(target, this.list.fields);
            }

            // Add listID
            if (queryParams && queryParams.listID)
                request.listID = queryParams.listID;

            // Add itemID
            if (queryParams && queryParams.itemID !== undefined && queryParams.itemID !== null)
                request.itemID = queryParams.itemID;

            if (queryParams && queryParams.queryString)
                request.queryString = queryParams.queryString;

            // Add the search after for infinite scroll
            if (loadmore && this.searchAfter)
                request.searchAfter = this.searchAfter.itemID;


            // set the loader to true and start the
            this.fetchMediakiwiListAPI(request).then(resp => {
                if (loadmore && this.list && this.list.rows) {
                    this.list.rows = this.list.rows.concat(resp.data.rows);
                }
                else {
                    this.list = resp.data;
                }

                if (this.list.rows)
                    this.searchAfter = this.list.rows[this.list.rows.length - 1];

            }).catch(err => {
                console.error(err);
            });
        },
    },
    }
</script>