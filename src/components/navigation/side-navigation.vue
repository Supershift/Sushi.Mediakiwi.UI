<template>
    <section class="sideNav">
        <menu v-if="content">
            <ul>
                <li v-for="navItem in content.navigationItems" :key="navItem.id" v-bind:class="className(navItem)">
                    <a :href="navItem.link.href" v-html="navItem.link.text"></a>

                    <ul class="sub" v-if="navItem.subItems">
                        <li v-for="navSubItem in navItem.subItems" :key="navSubItem.id" v-bind:class="className(navSubItem)">
                            <a :href="navSubItem.link.href" v-html="navSubItem.link.text"></a>
                        </li>
                    </ul>
                </li>

            </ul>
        </menu>
    </section>
</template>
<script>
    export default {
        name: 'side-navigation',
        props: ['content'],
        methods: {
            className(navItem) {
                let className = "";

                if (!navItem)
                    return className;

                if (navItem.className)
                    className = navItem.className

                if (navItem.isActive) {
                    className += " active";
                }

                return className;
            }
        }
    }
</script>