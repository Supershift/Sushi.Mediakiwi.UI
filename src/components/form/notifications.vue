<template>
    <article class="notifications">
        <article class="note" v-show="notificationList.length">
            <div class="content">
                <div v-for="notification in notificationList" v-html="notification.message"></div>
            </div>
        </article>
        <article class="error" v-show="errorList.length">
            <div class="content">
                <div v-for="error in errorList" v-html="error.message"></div>
            </div>
        </article>
    </article>
</template>
<script>
    import { MediakiwiNotification } from './../form/form';

    export default {
        props: ['notifications'],
        computed: {
            notificationList() {
                if (this.notifications && this.notifications.length) {
                    let notifications = this.notifications.filter(notification => !notification.isError);
                    if (notifications) {
                        return notifications.map(r => {
                            return new MediakiwiNotification(r.message, r.isError)
                        });
                    }
                }
                return []; 
            },
            errorList() {
                if (this.notifications && this.notifications.length) {
                    let errors = this.notifications.filter(notification => notification.isError);
                    if (errors) {
                        return errors.map(r => {
                            return new MediakiwiNotification(r.message, r.isError)
                        });
                    }
                }
                    
                return [];
            },
        }
    }
</script>