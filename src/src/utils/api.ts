import store from "../store/index";

export const api = {
    methods: {
      fetchMediakiwiAPI(listID: string, itemID: string, queryString: string) {
        let request = {
          queryString: queryString,
          channel: store.getters.channel,
          listID: listID,
          itemID: itemID,
        };
        return store.dispatch("getMediaKiwiAPI", request);
      },
    },
  };
  