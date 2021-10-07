import { createStore } from 'vuex';
// import * as profile from './modules/profile';
// import * as menu from './modules/menu';
// import * as navigation from './modules/navigation';
import DummyAvatar from '@/assets/dummy-images/avatar-dummy.jpg';
import DummyBrand from '@/assets/images/vaultN-logo.svg';

export default createStore({
  modules: {
    // profile,
    // navigation,
    // menu,
  },
  state: {
    site: {
      title: 'Site title - Page Title',
    },
    drawer: {
      open: false,
    },
    profileData: {
      name: 'Luigi Arends',
      email: 'luigi.arends@supershift.nl',
      avatar: DummyAvatar,
      company: {
        title: 'Ananada',
        logo: DummyBrand,
      },
    },
    notification: {
      show: true,
      hasAction: true,
      alertText: 'Succesfully Transfered ( 3 assets - 20210811 - to VaultN',
      actionText: 'Take action',
      actionType: 'info',
    },
    description: '',
    menuItems: [{
      id: 1,
      name: 'Home',
      icon: 'fingerprint',
      open: false,
    }, {
      id: 2,
      name: 'My Vault',
      icon: 'th',
      open: false,
    }, {
      id: 3,
      name: 'Finance',
      icon: 'donate',
      open: false,
    }, {
      id: 4,
      name: 'My Network',
      icon: 'users',
      open: false,
    }, {
      id: 5,
      name: 'Orders',
      icon: 'receipt',
      open: false,
    }, {
      id: 6,
      name: 'Settings',
      icon: 'cog',
      open: false,
    }, {
      id: 7,
      name: 'Cube',
      icon: 'cube',
      open: false,
    },
    ],
    navigationItems: [{
      id: 8,
      name: 'Assets',
    }, {
      id: 9,
      name: 'Product',
    }, {
      id: 10,
      name: 'Rights',
    }, {
      id: 11,
      name: 'Inbox',
    }, {
      id: 12,
      name: 'Transations',
    }, {
      id: 13,
      name: 'Promises',
    },
    ],
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer.open = !state.drawer.open;
    },
  },
  actions: {
    toggleDrawer(context) {
      context.commit('toggleDrawer');
    },
  },
  getters: {
    menuItems: (state) => state.menuItems,
    navigationItems: (state) => state.navigationItems,
    siteTitle: (state) => state.site.title,
    openDrawer: (state) => state.drawer.open,
    profileData: (state) => state.profileData,
    brandData: (state) => state.profileData.company,
    notification: (state) => state.notification,
  },
});
