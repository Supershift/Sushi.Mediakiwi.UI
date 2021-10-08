export default {
    bind (el, binding, vnode) {
        var _el = el;
        vnode.context.event = (event) => {
            if (!childOf(event.target, _el) && !isExcludedInputElement(event.target, el)) {
                vnode.context.$emit(binding.expression, event);
            }
        };

        function childOf(node, ancestor) {
            let child = node;
            while (child !== null) {
                if (child === ancestor) {return true;}
                child = child.parentNode;
            }
            return false;
        }

        function isExcludedInputElement(node, ancestor) {
            let child = node;
            if (child.className.indexOf("select2") > -1) {
                return true;
            }
        }

        el.addEventListener("mouseup", vnode.context.stopProp);
        document.body.addEventListener("mouseup", vnode.context.event);
    },
    unbind (el, binding, vnode) {
        el.removeEventListener("mouseup", vnode.context.stopProp);
        document.body.removeEventListener("mouseup", vnode.context.event);
    },
    stopProp(event) { event.stopPropagation(); },

};
