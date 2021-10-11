import moment from "moment-timezone";

export const portalName = "webcontent";

export function formatDate(date, fallback) {
    if (!date) { return fallback; }

    // parse the date
    let momentDate = parseDate(date);

    if (!momentDate) { return fallback; }

    return momentDate.format("DD-MM-YYYY HH:mm");
}

export function parseDate(date) {
    if (!date) { return null; }

    // parse the date
    let momentDate = new moment.utc(date);
    if (!momentDate) { return null; }

    // get the timezone from the browser API
    let zone = moment.tz.guess();

    // if the timezone is available convert to it
    if (zone) { return moment(momentDate).tz(zone); }
    else {
        return moment(momentDate);
    }
}

export function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

export function removeQueryStringParameter(uri, key) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    if (uri.match(re)) {
        return uri.replace(re, "");
    }
    else {
        return uri;
    }
}

const dialogOptions = {
    okText: "Yes",
    cancelText: "Cancel",
    animation: "zoom", // Available: "zoom", "bounce", "fade"
};

export const formFieldInputType = {
    FTICheckbox: {
        id: 0,
        name: "FTICheckbox"
    },
    FTIDatePicker: {
        id: 1,
        name: "FTIDatePicker"
    },
    FTIDropdown: {
        id: 2,
        name: "FTIDropdown"
    },
    FTIMultiselect: {
        id: 3,
        name: "FTIMultiselect"
    },
    FTIPhonenumber: {
        id: 4,
        name: "FTIPhonenumber"
    },
    FTIRadio: {
        id: 5,
        name: "FTIRadio"
    },
    FTITextArea: {
        id: 6,
        name: "FTITextArea"
    },
    FTITextfield: {
        id: 7,
        name: "FTITextfield"
    },
    FTINote: {
        id: 8,
        name: "FTINote"
    },
    FTIPassword: {
        id: 9,
        name: "FTIPassword"
    },
};

const defaultIntRadix = 10;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
export function parseIntWithBase(value, radix) {
    if (!value) {
        return;
    }

    if (!radix) {
        radix = defaultIntRadix;
    }

    return parseInt(value, radix);
}
