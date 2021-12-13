export const fieldMixin = {
    methods: {
        fieldClass(field) {
            let _class = "";//this.isHalfField(field.expression);
            if (field.className) { _class += ` ${field.className}`; }
            _class += this.errorClass(field);
            return _class;
        },
        errorClass(field) {
            if (field.error) { return " error"; }
            return "";
        },
        eventHandler(field, methodName) {
            if (field.href && field.href.indexOf("openinframe=") === -1) { return; }

            let events = {};
            events[field.event] = methodName; // nameof the method
            let e = Object.entries(events).reduce((acc, [eventName, methodName]) => {
                acc[eventName] = this[methodName];
                return acc;
            }, {});
            return e;
        },
        suffix(field) {
            return (typeof (field.suffix) !== "undefined" && field.suffix) ? field.suffix : undefined;
        },
        prefix(field) {
            return (typeof (field.prefix) !== "undefined" && field.prefix) ? field.prefix : undefined;
        },
    }
};

export const formMixin = {
    methods: {
        getFormRequest(target, fields) {
            let request = {
                Referrer: target,
                FormFields: {}
            };

            for (let field of fields) {
                if (field && field.propertyName) {
                    request.FormFields[field.propertyName] = field.value;
                }
            }

            return request;
        }
    }
};

export const FieldType = {
    wimButton: "wimButton",
    wimChoiceCheckbox: "wimChoiceCheckbox",
    wimChoiceDropdown: "wimChoiceDropdown",
    wimChoiceRadio: "wimChoiceRadio",
    wimDateTime: "wimDateTime",
    wimDate: "wimDate",
    wimNameValueCollection: "wimNameValueCollection",
    wimNameValue: "wimNameValue",
    wimPlus: "wimPlus",
    wimRichText: "wimRichText",
    wimSection: "wimSection",
    wimTagVue: "wimTagVue",
    wimText: "wimText",
    wimTextline: "wimTextline",
    wimTextArea: "wimTextArea",
    wimTime: "wimTime",
    wimValueCollection: "wimValueCollection",
    wimValue: "wimValue",
    wimLink: "wimLink",
};

export const EventType = {
    none: "none",
    change: "change",
    click: "click",
    blur: "blur",
    keyup: "keyup",
};

export const ExpressionType = {
    full: 0,
    left: 1,
    right: 2,
    alternating: 3,
};

export class MediakiwiField {
    constructor(type, title, propertyName) {
        // Core
        this.propertyName = propertyName;
        this.title = title;
        this.vueType = type;
        // MK
        this.propertyType = undefined;
        this.expression = 0;
        this.value = null;
        this.options = undefined;
        this.className = undefined;
        this.event = "none";
        this.inputPost = undefined;
        this.section = 0;
        this.hidden = false;
        this.groupName = undefined;
        this.suffix = undefined;
        this.prefix = undefined;
        this.formSection = undefined;
        this.canToggleSection = false;
        this.canDeleteSection = false;
        this.toggleDefaultClosed = false;
        this.readOnly = false;
        this.mandatory = false;
    }
}

export class MediakiwiNotification {
    constructor(message, isError) {
        this.message = message;
        this.isError = isError;
    }
}


export class MediakiwiButton {
    constructor(title, propertyName) {
        // Core
        this.title = title;
        this.propertyName = propertyName;
        // MK
        this.className = undefined;
        this.event = "none";
        this.section = 0;
        this.hidden = false;
        this.readOnly = false;
        //
        this.isPrimary = false;
    }
}

export class MediakiwiTextValue {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}
export class MediakiwiValue {
    constructor(value) {
        this.value = value;
    }
}

export class MediakiwiFormTableRow {
    constructor() {
        this.isButtonRow = false;
        this.fields = [];
    }
}
