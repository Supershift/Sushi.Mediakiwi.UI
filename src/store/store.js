import Vue from "Vue";
import Vuex from "vuex";
import axios from "axios";
import { origin } from "../utils/shared";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: {},
        channel: localStorage.getItem("channel") || "",
        mediakiwiLoading: false,
        listLoading: false,
        listLoadingMore: false,
        online: true,
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, token, user) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        },
        channel(state, channel) {
            state.channel = channel;
        },
        mediakiwiLoading(state, mediakiwiLoading) {
            state.mediakiwiLoading = mediakiwiLoading;
        },
        listLoading(state, listLoading) {
            state.listLoading = listLoading;
        },
        listLoadingMore(state, listLoadingMore) {
            state.listLoadingMore = listLoadingMore;
        },
        online(state, online) {
            state.online = online;
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({ url: `${origin()}/api/auth/login`, data: user, method: "POST" })
                    .then((resp) => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem("token", token);
                        axios.defaults.headers.common["Authorization"] = token;
                        commit("auth_success", token, user);
                        resolve(resp);
                    })
                    .catch((err) => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
        setChannel({ commit }, channel) {
            localStorage.setItem("channel", channel);
            commit("channel", channel);            
        },
        setMediakiwiLoading({ commit }, isLoading) {
            commit("mediakiwiLoading", isLoading);
        },
        setListLoading({ commit }, isLoading) {
            commit("listLoading", isLoading);
        },
        setListLoadingMore({ commit }, isLoading) {
            commit("listLoadingMore", isLoading);
        },
        setOnlineState({ commit }, isOnline) {
            commit("online", isOnline);
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        authStatus: (state) => state.status,
        channel: (state) => state.channel,
        mediakiwiLoading: (state) => state.mediakiwiLoading,
        listLoading: (state) => state.listLoading,
        listLoadingMore: (state) => state.listLoadingMore,
        online: (state) => state.online,        
    }
});
