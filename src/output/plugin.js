// Components
import wimButton from './../components/form/fields/wimButton.vue';
import wimChoiceCheckbox from './../components/form/fields/wimChoiceCheckbox.vue';
import wimChoiceDropdown from './../components/form/fields/wimChoiceDropdown.vue';
import wimChoiceRadio from './../components/form/fields/wimChoiceRadio.vue';
import wimDateTime from './../components/form/fields/wimDateTime.vue';
import wimDate from './../components/form/fields/wimDate.vue';
import wimNameValue from './../components/form/fields/wimNameValue.vue';
import wimNameValueCollection from './../components/form/fields/wimNameValueCollection.vue';
import wimPlus from './../components/form/fields/wimPlus.vue';
import wimRichText from './../components/form/fields/wimRichText.vue';
import wimSection from './../components/form/fields/wimSection.vue';
import wimTagVue from './../components/form/fields/wimTagVue.vue';
import wimText from './../components/form/fields/wimText.vue';
import wimTextline from './../components/form/fields/wimTextline.vue';
import wimTextArea from './../components/form/fields/wimTextArea.vue';
import wimTime from './../components/form/fields/wimTime.vue';
import wimValue from './../components/form/fields/wimValue.vue';
import wimValueCollection from './../components/form/fields/wimValueCollection.vue';
import wimTreeselect from './../components/form/fields/wimTreeselect.vue';
import wimLink from './../components/form/fields/wimLink.vue';

// Views
import wimForm from './../components/form/wimForm.vue';

// Utils
import {
    // Mixins
    fieldMixin,
    formMixin,
    // Enums
    FieldType,
    EventType,
    ExpressionType,
    // Classes
    MediakiwiField,
    MediakiwiNotification,
    MediakiwiButton,
    MediakiwiTextValue,
    MediakiwiFormTableRow,
} from './../components/form/form';

module.exports = {
    // Mixins
    fieldMixin,
    formMixin,
    // Enums
    FieldType,
    EventType,
    ExpressionType,
    // Classes
    MediakiwiField,
    MediakiwiNotification,
    MediakiwiButton,
    MediakiwiTextValue,
    MediakiwiFormTableRow,
    // Components
    install: function (Vue, options) {
        Vue.component('wimButton', wimButton);
        Vue.component('wimChoiceCheckbox', wimChoiceCheckbox);
        Vue.component('wimChoiceDropdown', wimChoiceDropdown);
        Vue.component('wimChoiceRadio', wimChoiceRadio);
        Vue.component('wimDateTime', wimDateTime);
        Vue.component('wimDate', wimDate);
        Vue.component('wimNameValue', wimNameValue);
        Vue.component('wimNameValueCollection', wimNameValueCollection);
        Vue.component('wimPlus', wimPlus);
        Vue.component('wimRichText', wimRichText);
        Vue.component('wimSection', wimSection);
        Vue.component('wimTagVue', wimTagVue);
        Vue.component('wimText', wimText);
        Vue.component('wimTextline', wimTextline);
        Vue.component('wimTextArea', wimTextArea);
        Vue.component('wimTime', wimTime);
        Vue.component('wimForm', wimForm);
        Vue.component('wimValue', wimValue);
        Vue.component('wimValueCollection', wimValueCollection);
        Vue.component('wimTreeselect', wimTreeselect);
        Vue.component('wimLink', wimLink);
    }
};