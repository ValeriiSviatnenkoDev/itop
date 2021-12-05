/*

Utils for using localeStorage

*/

/* localeStorage, method: setItem(key, value) */
export const setLocaleStorage = (key, value) => {
    if(!key || !value) {
        return console.error('Key or values is undefined.');
    }

    return localStorage.setItem(key, value);
} 

/* localeStorage, method: getItem(key) */
export const getLocaleStorage = (key, parse) => {
    if(!key) {
        return console.error(`I can't find this key for get from storage: ${key}!`);
    }

    if(parse) {
        return JSON.parse(localStorage.getItem(key));
    } else {
        return localStorage.getItem(key);
    }

} 

/* localeStorage, method: removeItem(key) */
export const clearLocaleStorage = (key) => {
    if(!key) {
        return console.error(`I can't find this key for remove from storage: ${key}!`);
    }

    return localStorage.removeItem(key);
}
