import stub from './stub';
import tracking from './tracking';
import global from './global';

var ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub;

function accessor(key, value) {
    if (arguments.length === 1) {
        return get(key);
    }
    return set(key, value);
}

function get(key) {
    try {
        return JSON.parse(ls.getItem(key));
    } catch (e) {
        // for backward capability
        return ls.getItem(key);
    }
}

function set(key, value) {
    try {
        ls.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        return false;
    }
}

function remove(key) {
    return ls.removeItem(key);
}

function clear() {
    return ls.clear();
}

accessor.set = set;
accessor.get = get;
accessor.remove = remove;
accessor.clear = clear;
accessor.on = tracking.on;
accessor.off = tracking.off;

export default accessor;
