<template>
    <header class="header">
        <menu v-if="content">
            <section class="logo" v-if="content.logo">
                <a :href="content.logo.href">
                    <picture v-if="content.logo.url" v-addwebp="{url: content.logo.url, title:content.logo.text}"></picture>
                </a>
            </section>
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <ul class="menu">
                <li v-for="navItem in content.navigationItems" :key="navItem.id">
                    <a v-bind:class="className(navItem)" :href="navItem.link.href" v-html="navItem.link.text"></a>
                    <ul class="sub" v-if="navItem.subItems">
                        <li v-for="navSubItem in navItem.subItems" v-bind:class="{'active' : navSubItem.isActive }" :key="navSubItem.id">
                            <a :href="navSubItem.link.href" v-html="navSubItem.link.text"></a>
                        </li>
                    </ul>
                </li>

                <li class="right">
                    <template v-if="profile">
                        <a @click="showProfile = true" v-bind:class="{ 'active' : showProfile }" class="fas fa-user">
                            <transition name="fade">
                                <profile v-if="showProfile || isMobile" v-click-outside="closeProfile" :content="profile"></profile>
                            </transition>
                        </a>
                    </template>
                    <template v-if="channel">
                        <a @click="showChannel = true" v-bind:class="{ 'active' : showChannel }" class="fas fa-globe">
                            <transition name="fade">
                                <channel-selection @onchange="channelChange" v-if="showChannel || isMobile" v-click-outside="closeChannel" :content="channel"></channel-selection>
                            </transition>
                        </a>
                    </template>
                </li>
                <li v-if="isMobile && sideNavigationContent">
                    <side-navigation :content="sideNavigationContent"></side-navigation>
                </li>
            </ul>
        </menu>
    </header>
</template>
<script>
    import sideNavigation from './side-navigation.vue';

    import profile from './../system/profile.vue';
    import channelSelection from './../system/channel-selection.vue';

    export default {
        name: 'top-navigation',
        props: ['content', 'isMobile', 'sideNavigationContent', 'profile', 'channel'],
        components: {
            profile,
            sideNavigation,
            channelSelection
        },
        data() {
            return {
                showProfile: false,
                showChannel: false,
            }
        },
        methods: {
            channelChange(channel) {
                this.$emit('onchange', "channel", channel);
            },
            closeProfile() {
                this.showProfile = false;
            },
            closeChannel() {
                this.showChannel = false;
            },
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
        },
        mounted() {
            this.$on('closeProfile', this.closeProfile);
            this.$on('closeChannel', this.closeChannel);
        },        
        destroyed() {
            this.$off('closeProfile', this.closeProfile);
            this.$off('closeChannel', this.closeChannel);
        }
    }
</script>