
<template>
  <section
    class="custom-app-container"
    v-html="innerHTML" />
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  ref,
} from "vue";
import {IResource} from "../../models/Mediakiwi/Interfaces";
import {store} from "@/store";
import {ResourceTypesEnum, ResourcePositionTypeEnum} from "../../models/Mediakiwi/Enums";

export default defineComponent({
  setup() {
    // Data
    const innerHTML = ref<string>();

    // Computed
    const resources = computed<IResource[]>(
      () => store.getters["Content/resources"]
    );

    // Functions
    /** Adds a script resource to the page */
    function addScript(resource: IResource) {
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
        if (resource.type !== ResourceTypesEnum.script) {
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
            resolve(resource);
          };
        }

        // Add the resource to the desired location
        if (
          resource.position ===
          ResourcePositionTypeEnum.body
        ) {
          document.body.appendChild(script);
        } else {
          document.head.appendChild(script);
        }

        // We can resolve the promise if we don't need to wait it
        if (script.innerHTML) {
          resolve(resource);
        }
      });
    }

    /** Adds a stylesheet to the page */
    function addStyle(resource: IResource) {
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

        if (resource.type === ResourceTypesEnum.style) {
          link.innerHTML = resource.sourceCode
            ? resource.sourceCode
            : "";
        } else {
          link.href = resource.path;
        }

        // Add the resource to the desired location
        if (
          resource.position ===
          ResourcePositionTypeEnum.body
        ) {
          document.body.appendChild(link);
        } else {
          document.head.appendChild(link);
        }
        resolve(resource);
      });
    }

    /** Adds html to the page */
    function addHtml(resource: IResource) {
      return new Promise((resolve) => {
        if (resource && resource.sourceCode) {
          // set the innerHTML value to the sourceCode of the resource
          innerHTML.value += resource.sourceCode;
        }

        // Wait the the painting is done! before we continue
        nextTick(() => {
          resolve(resource);
        });
      });
    }

    /** Add a single resource to the page */
    function addResource(
      resource: IResource
    ): Promise<unknown> {
      switch (resource.type) {
        case ResourceTypesEnum.script:
          return addScript(resource);
        case ResourceTypesEnum.style:
          return addStyle(resource);
        case ResourceTypesEnum.html:
          return addHtml(resource);
        default:
          return new Promise((resolve) => {
            resolve(true);
          });
      }
    }

    /** Add the resources to the page */
    async function addResources(
      resources: IResource[]
    ) {
      for (let resource of resources.filter(
        (r) => {
          return r.isSync;
        }
      )) {
        // add the resources sync
        await addResource(resource);
      }
      return new Promise((resolve) => {
        // After that add the scripts can be lazy loaded
        let promises: Promise<unknown>[] = [];

        resources
          .filter((r) => !r.isSync)
          .forEach((resource) => {
            promises.push(addResource(resource));
          });

        Promise.all(promises).then(() => {
          resolve(true);
        });
      });
    }

    /**Removes all resources and custom html */
    function clearApp() {
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

      if (
        resources.value &&
        resources.value.length
      ) {
        addResources(resources.value).then(() => {
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
