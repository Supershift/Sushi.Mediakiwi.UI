<template>
    <div class="breadcrumbs">
        <a v-if="home" :href="home" class="button-white" v-html="home"></a>
        <menu class="trail">
            <li v-for="breadcrumb in crumbs" :key="breadcrumb">
                <a :href="linkConcat(home, breadcrumb)" v-html="breadcrumb"></a>
            </li>
        </menu>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import router from "../../router/index";
import { store } from "../../store";

export default defineComponent({
    name: "BreadcrumbsComponent",
    setup(){
        const crumbs = router.currentRoute.value.fullPath.split("/");
        const home = store.getters["Navigation/homeURL"];
        function linkConcat(base: string, path: string): string {
            return base+"/"+path
        }
        return {
            crumbs,
            home,
            linkConcat
        }
    }
})
</script>

<style lang="scss">
.breadcrumbs {
    a {
        width: auto;
    }

    .trail {
        padding: 10px 0 0 10px;
        display: inline;
        margin: 0;

        li {
            list-style: none;
            display: inline-block;
            color: $color-main;

            &:not(:last-child) {
                font-weight: bold;

                &:after {
                    content: '/';
                    padding: 0 5px;
                    color: inherit;
                }
            }

            a {
                color: inherit;
            }
        }
    }

    + .list-details {
        margin-top: $grid-s-gutter;
    }
}
</style>