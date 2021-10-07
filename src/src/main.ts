import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
// Note we are using the Pro style here
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFingerprint,
  faUsers,
  faCog,
  faDonate,
  faCube,
  faTh,
  faSortDown,
  faSortUp,
  faExchangeAlt,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faReceipt,
  faExclamationTriangle,
  faCheckCircle,
  faHandPaper,
  faExclamationCircle,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import App from './App.vue';

library.add(
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFingerprint,
  faUsers,
  faReceipt,
  faCog,
  faCube,
  faDonate,
  faTh,
  faSortDown,
  faSortUp,
  faExchangeAlt,
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faHandPaper,
);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(store)
  .mount('#app');
