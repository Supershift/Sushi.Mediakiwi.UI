<template>
    <article class="bodySection" v-if="isLoggedIn">
        <!-- <status-bar :message="statusMessage" @ondestroy="statusMessage = undefined"></status-bar> -->
        <section class="bodyHeader">
            <top-navigation
                v-if="content && (content.topNavigation || content.sideNavigation)"
                :content="content.topNavigation"
                :profile="content.profile"
                :channel="content.channel"
                :isMobile="isMobile"
                :sideNavigationContent="content.sideNavigation"
                @onchange="onTopNavChange"
            ></top-navigation>
        </section>
        <section class="bodyArticle">
            <aside class="bodyAside">
                <sideNavigation v-if="!isMobile && content && content.sideNavigation" :content="content.sideNavigation"></sideNavigation>
            </aside>
            <section class="bodyContent">
                <listView ref="list" :IDs="pageIDs"></listView>
            </section>
        </section>
    </article>

    <!--when not logged in-->
    <router-view v-else></router-view>
</template>
<script>
import logoutComponent from "./components/login/logout.vue";
import topNavigation from "./components/navigation/top-navigation.vue";
import sideNavigation from "./components/navigation/side-navigation.vue";
import listView from "./views/list.vue";
// import statusBar from './components/system/status-bar.vue';

import { shared, MediakiwiStatusMessage, MediakiwiQueryParam } from "./utils/shared";
import { api } from "./utils/api";
import { formMixin } from "./components/form/form";

export default {
    name: "home-view",
    mixins: [shared, api, formMixin],
    components: {
        logoutComponent,
        topNavigation,
        sideNavigation,
        listView,
        // statusBar
    },
    metaInfo() {
        return {
            title: this.content && this.content.meta && this.content.meta.pageTitle ? this.content.meta.pageTitle : "Mediakiwi",
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        mediakiwiLoading() {
            return this.$store.getters.mediakiwiLoading;
        },
        listLoading() {
            return this.$store.getters.listLoading;
        },
        listLoadingMore() {
            return this.$store.getters.listLoadingMore;
        },
        online() {
            return this.$store.getters.online;
        },
        pageIDs() {
            let pageIDs = new MediakiwiQueryParam();

            if (this.$route.params) {
                if (typeof this.$route.params.listID !== "undefined" && this.$route.params.listID) {
                    pageIDs.listID = parseInt(this.$route.params.listID);
                }

                if (typeof this.$route.params.itemID !== "undefined") {
                    pageIDs.itemID = parseInt(this.$route.params.itemID);
                }

                if (this.$route.query) {
                    let queries = Object.keys(this.$route.query).map((key) => `${key}=${this.$route.query[key]}`);
                    let queryString = "";

                    if (queries && queries.length) queryString = "?" + queries.join("&");

                    pageIDs.queryString = queryString;
                }
            }

            return pageIDs;
        },
    },
    watch: {
        online(newValue, oldValue) {
            if (newValue !== oldValue && oldValue !== undefined) {
                if (!newValue) this.statusMessage = new MediakiwiStatusMessage(`Your are offline`, 0, true);
                else this.statusMessage = new MediakiwiStatusMessage(`Your are back online`, 3000);
            }
        },
    },
    data() {
        return {
            content: undefined,
            statusMessage: "",
        };
    },
    methods: {
        //// Events
        updateOnlineStatus($event) {
            this.$store.dispatch("setOnlineState", navigator.onLine);
        },
        //// Watchers
        onTopNavChange(section, value) {
            if (section === "channel") {
                this.fetchContent();
                this.fetchList();
            }
        },
        //// APIS
        fetchContent(listID, itemID, queryString) {
            if (this.isLoggedIn) {
                // Fetch the mediakiwi content
                this.fetchMediakiwiAPI(listID, itemID, queryString)
                    .then((r) => (this.content = r.data))
                    .catch((err) => console.error(err));
            }
        },
        fetchAll() {
            if (!this.online) return;

            // Fetch the mediakiwi content
            this.fetchContent(this.pageIDs.listID, this.pageIDs.itemID, this.pageIDs.queryString);

            // Fetch the list
            this.$refs.list.fetchList(this.pageIDs);
        },
    },
    mounted() {
        this.$router.afterEach((to, from) => {
            // first remove existing 'custom' resources
            [].forEach.call(document.querySelectorAll("[mediakiwi-resource]"), (e) => {
                console.log("remove exsiting resource");
                e.parentNode.removeChild(e);
            });
            this.fetchAll();
        });

        this.fetchAll();

        window.addEventListener("online", this.updateOnlineStatus);
        window.addEventListener("offline", this.updateOnlineStatus);
    },
};
</script>
