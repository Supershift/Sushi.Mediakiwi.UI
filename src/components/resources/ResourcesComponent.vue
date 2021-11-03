
<template>
  <section
    class="custom-app-container"
    v-html="innerHTML" />
</template>

<!-- Enable logging -->
<!-- eslint-disable no-console -->
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
} from "vue";
import ResourceModel from "@/models/Mediakiwi/ResourceModel";
import {store} from "@/store";
import {ResourceType} from "@/models/Mediakiwi/ResourceType";
import {ResourcePositionType} from "@/models/Mediakiwi/ResourcePositionType";

export default defineComponent({
  setup() {
    // Data
    const innerHTML = ref<string>();
    const log = ref<boolean>();
    log.value = true;

    // Computed
    const resources = computed<ResourceModel[]>(
      () => store.getters.resources
    );

    // Functions
    /** Adds a script resource to the page */
    function addScript(resource: ResourceModel) {
      // Create a promis to wait for
      return new Promise((resolve, reject) => {
        if (!resource) {
          reject();
        }
        // Create the script tag and fill the fields
        let script =
          document.createElement("script");
        script.setAttribute(
          "mediakiwi-resource",
          ""
        );
        script.type = "text/javascript";
        if (resource.isInline) {
          script.innerHTML = resource.sourceCode
            ? resource.sourceCode
            : "";
        } else {
          script.src = resource.path;
        }

        // Add an event to resolve the promise
        // Only if the src is set
        if (script.src) {
          script.onload = () => {
            if (log.value) {
              console.log(
                `finished loading ${resource.path}`
              );
            }
            resolve(resource);
          };
        }

        // Add the resource to the desired location
        if (
          resource.position ===
          ResourcePositionType.body
        ) {
          document.body.appendChild(script);
        } else {
          document.head.appendChild(script);
        }

        // We can resolve the promise if we don't need to wait it
        if (script.innerHTML) {
          if (log.value) {
            console.log(
              "finished loading inline resource"
            );
          }
          resolve(resource);
        }
      });
    }

    /** Adds a stylesheet to the page */
    function addStyle(resource: ResourceModel) {
      return new Promise((resolve) => {
        if (!resource) {
          return;
        }

        // Create the link tag and fill the fields
        let link = document.createElement("link");
        link.setAttribute(
          "mediakiwi-resource",
          ""
        );
        link.rel = "stylesheet";
        link.type = "text/css";

        if (resource.isInline) {
          link.innerHTML = resource.sourceCode
            ? resource.sourceCode
            : "";
        } else {
          link.href = resource.path;
        }

        // Add the resource to the desired location
        if (
          resource.position ===
          ResourcePositionType.body
        ) {
          document.body.appendChild(link);
        } else {
          document.head.appendChild(link);
        }
        resolve(resource);
      });
    }

    /** Adds html to the page */
    function addHtml(resource: ResourceModel) {
      return new Promise((resolve) => {
        if (log.value) {
          console.log("add html");
          console.log(resource.sourceCode);
        }

        // set the innerHTML value to the sourceCode of the resource
        innerHTML.value = resource.sourceCode;

        // Wait the the painting is done! before we continue
        nextTick(() => {
          if (log.value) {
            const innerHTML =
              document.querySelector(
                ".custom-app-container"
              )?.innerHTML;

            console.log("html added");

            console.log(innerHTML);
            resolve(resource);
          }
        });
      });
    }

    /** Add a single resource to the page */
    function addResource(
      resource: ResourceModel
    ): Promise<unknown> {
      // set this!!
      if (log.value) {
        console.log("add resource");

        console.log(resource);
      }
      switch (resource.type) {
        case ResourceType.script:
          return addScript(resource);
        case ResourceType.style:
          return addStyle(resource);
        case ResourceType.html:
          return addHtml(resource);
        default:
          return new Promise((resolve) => {
            resolve(true);
          });
      }
    }

    /** Add the resources to the page */
    async function addResources(
      resources: ResourceModel[]
    ) {
      for (let resource of resources.filter(
        (r) => {
          return r.isSync;
        }
      )) {
        // add the resources sync
        console.log("add sync item");
        const result = await addResource(
          resource
        );
        console.log("sync item added", result);
      }
      return new Promise((resolve) => {
        if (log.value) {
          console.log("Load Other Resources");
        }

        // After that add the scripts can be lazy loaded
        let promises: Promise<unknown>[] = [];

        resources
          .filter((r) => !r.isSync)
          .forEach((resource) => {
            promises.push(addResource(resource));
          });

        if (log.value) {
          console.log("Promises:");

          console.log(promises);
        }

        Promise.all(promises).then(() => {
          if (log.value) {
            console.log(
              "All Promises are completed"
            );
          }
          resolve(true);
        });
      });
    }

    /**Removes all resources and custom html */
    function clearApp() {
      if (log.value) {
        console.log("clear resources");
      }

      // first remove existing 'custom' resources
      document
        .querySelectorAll("[mediakiwi-resource]")
        .forEach((e: Element) => {
          e.parentNode?.removeChild(e);
        });

      // Clear the custom HTML
      innerHTML.value = "";
      const customAppContainer =
        document.querySelector(
          ".custom-app-container"
        );
      if (customAppContainer) {
        customAppContainer.innerHTML = "";
      }
    }

    /** Loops through the resources and adds them one by one */
    function initApp() {
      clearApp();

      if (log.value) {
        console.log("render app");
      }

      if (
        resources.value &&
        resources.value.length
      ) {
        addResources(resources.value).then(() => {
          if (log.value) {
            console.log("Added all resources");
          }
          window.document.dispatchEvent(
            new Event("DOMContentLoaded", {
              bubbles: true,
              cancelable: true,
            })
          );
        });
      }
    }

    return {
      innerHTML,
      log,
      addScript,
      addStyle,
      addHtml,
      addResource,
      addResources,
      clearApp,
      initApp,
    };
  },
  watch: {
    resources(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.initApp();
      }
    },
  },
  mounted() {
    this.initApp();
  },
});
</script>
