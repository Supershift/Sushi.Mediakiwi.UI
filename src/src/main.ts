import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFingerprint,
  faUsers,
  faReceipt,
  faCog,
  faDonate,
  faCube,
  faTh,
  faSortDown,
  faSortUp,
  faExchangeAlt,
  faExclamationCircle,
  faExclamationTriangle,
  faCheckCircle,
  faHandPaper,
} from '@fortawesome/free-solid-svg-icons';
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
