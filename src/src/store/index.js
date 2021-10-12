import { createStore } from 'vuex';
// import Cookies from 'js-cookies';
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
    isLoggedIn: false,
    site: {
      title: 'Site title - Page Title',
    },
    drawer: {
      open: false,
    },
    profileData: {
      fullName: 'Luigi Arends',
      email: 'luigi.arends@supershift.nl',
      avatar: DummyAvatar,
      company: {
        title: 'Ananada',
        logo: DummyBrand,
      },
    },
    notification: {
      show: false,
      hasAction: true,
      alertText: 'Succesfully Transfered ( 3 assets - 20210811 - to VaultN',
      actionText: 'Take action',
      actionType: 'success',
    },
    dialog: {
      show: false,
      settings: false,
    },
    description: '',
    menuItems: [{
      id: 1,
      name: 'Home',
      icon: ['fal', 'fingerprint'],
      open: false,
    }, {
      id: 2,
      name: 'My Vault',
      icon: ['fal', 'th'],
      open: false,
    }, {
      id: 3,
      name: 'Finance',
      icon: ['fal', 'donate'],
      open: false,
    }, {
      id: 4,
      name: 'My Network',
      icon: ['fal', 'users'],
      open: false,
    }, {
      id: 5,
      name: 'Orders',
      icon: ['fal', 'receipt'],
      open: false,
    }, {
      id: 6,
      name: 'Settings',
      icon: ['fal', 'cog'],
      open: false,
    }, {
      id: 7,
      name: 'Cube',
      icon: ['fas', 'cube'],
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
    content: {
      login: {
        loginCreateAccountText: 'Create an account',
        loginForgotPasswordText: 'Forgot Password?',
        loginPasswordPlaceholder: 'Email',
        loginEmailPlaceholder: 'Password',
        loginButtonText: 'Login',
        loginHeadlineText: 'Sign in with your email',
      },
    },
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer.open = !state.drawer.open;
    },
    toggleDialog(state) {
      state.dialog.show = !state.dialog.show;
    },
  },
  actions: {
    toggleDrawer(context) {
      context.commit('toggleDrawer');
    },
    toggleDialog(context) {
      context.commit('toggleDialog');
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
    dialog: (state) => state.dialog,
    contentLogin: (state) => state.content.login,
    isLoggedIn: (state) => state.isLoggedIn, // !!state.isLoggedIn && !!Cookies.get('access-token'),
  },
});
