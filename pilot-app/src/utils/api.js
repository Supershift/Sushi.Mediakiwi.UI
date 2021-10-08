import axios from 'axios'
import { origin, mediakiwiResources } from './../utils/shared'

export const api = {
    mixins: [mediakiwiResources],
    methods: {
        getChannel() {
            if (!this.$store.getters.channel)
                return undefined;
            return parseInt(this.$store.getters.channel);
        },
        fetchMediakiwiAPI(listID, itemID, queryString) {
            let request = {
                queryString: queryString,
                channel: this.getChannel(),
                listID: listID,
                itemID: itemID,
            };
            
            this.$store.dispatch('setMediakiwiLoading', true);
            return new Promise((resolve, reject) => {
                axios({ url: `${origin()}/api/mediakiwi`, data : request, method: 'POST' })
                    .then(resp => {
                        // always set channel!!
                        if (resp && resp.data && resp.data.channel && resp.data.channel.current) {
                            this.$store.dispatch('setChannel', resp.data.channel.current)
                        }

                        if (resp && resp.data && resp.data.resources)
                            this.addPageResources(resp.data.resources);

                        this.$store.dispatch('setMediakiwiLoading', false);

                        resolve(resp);
                    })
                    .catch(err => {
                        this.$store.dispatch('setMediakiwiLoading', false);
                        alert("Something went wrong while fetching the page")
                        reject(err);
                    });
            });
        },
        fetchMediakiwiListAPI(request) {            
            request.channel = this.getChannel();

            if (request.searchAfter) 
                this.$store.dispatch('setListLoadingMore', true);            
            else
                this.$store.dispatch('setListLoading', true);

            return new Promise((resolve, reject) => {
                axios({ url: `${origin()}/api/mediakiwi/list`, data: request, method: 'POST' })
                    .then(resp => {
                        this.$store.dispatch('setListLoading', false);
                        this.$store.dispatch('setListLoadingMore', false);
                        resolve(resp);
                    })
                    .catch(err => {
                        this.$store.dispatch('setListLoading', false);
                        this.$store.dispatch('setListLoadingMore', false);
                        reject(err);
                    });
            });
        },
    }
}