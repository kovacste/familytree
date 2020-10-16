export function queryString(params) {
    if(params === null || typeof params === 'undefined') return '';
    return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
}