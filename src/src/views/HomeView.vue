<template>
    <Drawer :toggler="openDrawer">
        <template #drawer>
            <!-- You cam place something here to display below the list, inside the drawer -->
        </template>
        <template #content>
            <NavigationBar />
            <Main />
        </template>
    </Drawer>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import Main from "../components/Main.vue";

const Drawer = defineAsyncComponent(() => import("./../components/drawer/Drawer.vue"));
const NavigationBar = defineAsyncComponent(() => import("./../components/navigation/NavigationBar.vue"));

export default defineComponent({
    name: "HomeView",
    components: {
        Main,
        Drawer,
        NavigationBar,
    },
});
</script>
