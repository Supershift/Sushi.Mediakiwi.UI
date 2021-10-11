<template>
  <section
    class="custom-app-container"
    v-html="innerHtml"
  />
</template>
<script>
    import { mediakiwiResources } from "./../../utils/shared";    

    export default {
        mixins: [mediakiwiResources],
        props: ["resources"],
        data() {
            return {
                innerHtml: undefined,
                log: false,
            };
        },
        watch: {
            resources(newValue, oldValue) {
                if (newValue !== oldValue)
                    {this.init();}
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            addHtml(resource) {
                return new Promise((resolve) => {
                    if (this.log) {
                        console.log("add html");
                        console.log(resource.sourceCode);
                    }

                    this.innerHtml = resource.sourceCode;

                    // Wait the the painting is done! before we continue
                    this.$nextTick(() => {
                        if (this.log) {
                            console.log("html added");
                            console.log(document.querySelector(".custom-app-container").innerHTML);                            
                        }
                        resolve();
                    });
                });
            },
            async addFormResources(resources) {
                for (let resource of resources.filter((r) => { return r.waitForResourceToComplete; })) {
                    // set this!!
                    if (this.log) {
                        console.log("Load waitForResourceToComplete Resources");
                        console.log(resource);
                    }
                    switch (resource.type) {
                        case 1:
                            await this.renderScript(resource);
                            break;
                    }
                }

                if (this.log) {
                    console.log("Load Other Resources");
                }

                return new Promise((resolve) => {
                    if (resources && resources.length) {
                        // After that add the scripts can be lazy loaded
                        let promises = [];

                        for (let resource of resources.filter((r) => { return !r.waitForResourceToComplete; })) {
                            // set this!!
                            if (this.log) {
                                console.log("add resource");
                                console.log(resource);
                            }
                            switch (resource.type) {
                                case 1:
                                    promises.push(this.renderScript(resource));
                                    break;
                                case 2:
                                    this.renderStyle(resource);
                                    break;
                                case 3:
                                    this.addHtml(resource);
                                    break;
                            }
                        }

                        if (this.log) {
                            console.log("Promises:");
                            console.log(promises);
                        }
                        Promise.all(promises).then(() => {
                            if (this.log) {
                                console.log("All Promises are completed");
                            }
                            resolve();
                        });
                    }
                });
            },
            clearApp() {
                if (this.log) {
                    console.log("clear resources");
                }

                this.innerHTML = undefined;
                document.querySelector(".custom-app-container").innerHTML = undefined;
            },
            renderApp() {
                if (this.log) {
                    console.log("render app");
                }

                this.addFormResources(this.resources).then(() => {
                    if (this.log) {
                        console.log("Added all resources");
                    }

                    // Check for broken angular apps
                    // this is done in a timeout because if not this is done ALL the time
                    setTimeout(() => {
                        if (document.querySelectorAll("[ng-app]:not(.ng-scope)").length) {
                            for (let angularApp of document.querySelectorAll("[ng-app]:not(.ng-scope)")) {
                                if (angularApp) {
                                    if (this.log) {
                                        console.log("oh no, fix angular!");
                                    }
                                    angular.element(function () {
                                        angular.bootstrap(document, [angularApp.getAttribute("ng-app")]);
                                    });
                                }
                            }
                        }
                    });
                });
            },
            init() {
                this.clearApp();

                this.renderApp();
            }
        }
    };
</script>
