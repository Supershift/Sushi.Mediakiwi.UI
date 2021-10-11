import Cookies from 'js-cookies';
import decode from 'jwt-decode';

const Tokenkey = 'vue_admin_identityu_token';
const StateKey = 'vue_admin_identityu_state';
const TenantApplicationIdKey = 'tenant_application_id';

export function getSolutionId(){
    return;
}
export function getUsername(){
    return Cookies.get('vue-username');
}
export function getLanguageCode(){
    return Cookies.get('language');
}
export function getUserId(){
    return Cookies.get('vue-userid');
}