export const origin = function () {
    let origin = document.location.origin;
    if (origin.indexOf("localhost") > -1) {
        origin += document.location.pathname.replace("/index.html", "");
    }
    return origin;
};

export const shared = {
    data() {
        return {
            isMobile: false,
        };
    },
    mounted() {
        this.isMobile = window.mobilecheck();
        window.addEventListener("resize", () => { this.isMobile = window.mobilecheck(); });
    }
};

export const resourceType = {
    script: 1,
    style: 2,
    html: 3,
};

export const mediakiwiResources = {
    methods: {
        // Adds a script resource to the page
        renderScript(resource, log) {
            if (!resource)
                {return;}

            // Create the script tag and fill the fields
            let script = document.createElement("script");
            script.setAttribute("mediakiwi-resource", "");
            script.type = "text/javascript";
            if (resource.inline) {
                script.innerHTML = resource.sourceCode;
            }
            else {
                script.src = resource.path;
            } 

            // Create a promis to wait for            
            return new Promise((resolve) => {
                // Add an event to resolve the promise
                // Only if the src is set                
                if (script.src) {
                    script.onload = (e) => {
                        if (log)
                            {console.log(`finished loading ${resource.path}`);}
                        resolve();
                    };
                }

                // Add the resource to the desired location
                if (resource.position) {
                    document.body.appendChild(script);
                }
                else {
                    document.head.appendChild(script);
                }

                // We can resolve the promise if we don't need to wait it
                if (script.innerHTML) {
                    if (log)
                        {console.log("finished loading inline resource");}
                    resolve();
                }
            });
        },
        // Adds a stylesheet to the page
        renderStyle(resource) {
            if (!resource)
                {return;}

            // Create the link tag and fill the fields
            let link = document.createElement("link");
            link.setAttribute("mediakiwi-resource", "");
            link.rel = "stylesheet";
            link.type = "text/css";

            if (resource.inline) {
                link.innerHTML = resource.sourceCode;
            }
            else {
                link.href = resource.path;
            }

            // Add the resource to the desired location
            if (resource.position) {
                document.body.appendChild(link);
            }
            else {
                document.head.appendChild(link);
            }
        },
        async addPageResources(resources) {
            // first remove existing 'custom' resources
            [].forEach.call(document.querySelectorAll("[mediakiwi-resource]"), (e) => {
                e.parentNode.removeChild(e);
            });

            if (resources && resources.length) {
                // First add the prioritized resources
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

            }
            for (let resource of resources.filter((r) => { return !r.waitForResourceToComplete; })) {
                switch (resource.type) {
                    case 1:
                        this.renderScript(resource);
                        break;
                    case 2:
                        this.renderStyle(resource);
                        break;
                }
            }                
        }
    },
};

export class MediakiwiStatusMessage {
    constructor(message, timeout, isError) {
        this.message = message;
        this.timeout = timeout;
        this.isError = isError;
    }
}

export class MediakiwiQueryParam {
    constructor(listID, itemID, queryString) {
        this.listID = listID;
        this.itemID = itemID;
        this.queryString = queryString;
    }
}
