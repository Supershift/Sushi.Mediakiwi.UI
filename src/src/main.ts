import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
// Note we are using the Pro style here
import {
  fas,
} from '@fortawesome/pro-solid-svg-icons';
import {
  fal,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import App from './App.vue';

library.add(
  fas,
  fal,
);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(store)
  .mount('#app');
