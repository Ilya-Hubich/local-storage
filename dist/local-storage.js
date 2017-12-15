(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function canAccessTop() {
    try {
        return !!window.top.document;
    } catch (e) {
        return false;
    }
}

exports.default = canAccessTop() ? window.top : window;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stub = __webpack_require__(2);

var _stub2 = _interopRequireDefault(_stub);

var _tracking = __webpack_require__(3);

var _tracking2 = _interopRequireDefault(_tracking);

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ls = 'localStorage' in _global2.default && _global2.default.localStorage ? _global2.default.localStorage : _stub2.default;

function accessor(key, value) {
    if (arguments.length === 1) {
        return get(key);
    }
    return set(key, value);
}

function get(key) {
    return JSON.parse(ls.getItem(key));
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
accessor.on = _tracking2.default.on;
accessor.off = _tracking2.default.off;

exports.default = accessor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ms = {};

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
    return true;
}

function removeItem(key) {
    var found = key in ms;
    if (found) {
        return delete ms[key];
    }
    return false;
}

function clear() {
    ms = {};
    return true;
}

exports.default = {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = __webpack_require__(0);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listeners = {};
var listening = false;

function listen() {
    if (_global2.default.addEventListener) {
        _global2.default.addEventListener('storage', change, false);
    } else if (_global2.default.attachEvent) {
        _global2.default.attachEvent('onstorage', change);
    } else {
        _global2.default.onstorage = change;
    }
}

function change(e) {
    if (!e) {
        e = _global2.default.event;
    }
    var all = listeners[e.key];
    if (all) {
        all.forEach(fire);
    }

    function fire(listener) {
        listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
    }
}

function on(key, fn) {
    if (listeners[key]) {
        listeners[key].push(fn);
    } else {
        listeners[key] = [fn];
    }
    if (listening === false) {
        listen();
    }
}

function off(key, fn) {
    var ns = listeners[key];
    if (ns.length > 1) {
        ns.splice(ns.indexOf(fn), 1);
    } else {
        listeners[key] = [];
    }
}

exports.default = {
    on: on,
    off: off
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=local-storage.js.map