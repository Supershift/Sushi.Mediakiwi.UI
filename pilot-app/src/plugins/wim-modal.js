import wimModalComponent from './wim-modal.vue'
import store from './../store/store';

const registeredViews = {}

let Plugin = function (Vue, globalOptions = {}) {
    this.Vue = Vue
    this.mounted = false
    this.$root = {} // The root component
    this.registeredViews = {} // Custom components
    this.globalOptions = globalOptions;
}

Plugin.prototype.mountIfNotMounted = function () {
    if (this.mounted === true) {
        return
    }

    this.$root = (() => {
        let wimModalConstructor = this.Vue.extend(wimModalComponent)
        let node = document.createElement('div')
        document.querySelector('body').appendChild(node)

        let Vm = new wimModalConstructor()

        Vm.registeredViews = this.registeredComponents()

        return Vm.$mount(node)
    })()

    this.mounted = true
}

Plugin.prototype.registeredComponents = function () {
    return registeredViews
}

Plugin.prototype.registerComponent = function (name, definition) {
    if (this.mounted) {
        this.destroy()
    }

    // registeredViews[name] = this.Vue.extend(definition)
    registeredViews[name] = definition
}

Plugin.prototype.destroy = function () {
    if (this.mounted === true) {
        let elem = this.$root.$el;        
        elem.remove()
        this.mounted = false
    }
}


Plugin.prototype.open = function (localOptions = {}) {
    this.mountIfNotMounted()
    localOptions.id = 'dialog.' + Date.now()
    this.$root.commit(Object.assign(this.globalOptions, localOptions))
}

Plugin.install = function (Vue, options) {

    Vue.prototype.$store = store;

    Vue.wimModal = new Plugin(Vue, options);

    Object.defineProperties(Vue.prototype, {
        $wimModal: {
            get() {
                return Vue.wimModal;
            }
        }
    })
}

export default Plugin
