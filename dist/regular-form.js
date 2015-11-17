/**
@author	amibug
@version	0.1.0
@homepage	
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Regular"));
	else if(typeof define === 'function' && define.amd)
		define(["Regular"], factory);
	else if(typeof exports === 'object')
		exports["RegularForm"] = factory(require("Regular"));
	else
		root["RegularForm"] = factory(root["Regular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * -------------------------------------------------------
	 *
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/12
	 * @update
	 * -------------------------------------------------------
	 */



	var Regular = __webpack_require__(1),
		_ = __webpack_require__(2),
		prototype = __webpack_require__(3),
		directive = __webpack_require__(4);
	var RegularForm = Regular.extend(prototype)
		.directive(directive);

	module.exports = RegularForm;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * -------------------------------------------------------
	 *
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/12
	 * @update
	 * -------------------------------------------------------
	 */
	var _ = module.exports;

	var toString = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var class2type = ['Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];

	_.noop = function() {};

	_.trim = function(str) {
	    if (!!str.trim) return str.trim();
	    return str.replace(/(^\s*)|(\s*$)/g, '');
	};

	_.isArray = Array.isArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	};

	// Function Date RegExp Error Array 和 new 创建的对象
	_.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};

	// var str = 'hello';
	// typeof str;      "string"
	// Object.prototype.toString.call(str)  "[object String]"
	// =====================================================
	// var str = new String('hello');
	// typeof str; "object"
	// Object.prototype.toString.call(str)  "[object String]"
	for (var i = 0, l = class2type.length; i < l; i++) {
	    var name = class2type[i];
	    _['is' + name] = function(obj) {
	        return toString.call(obj) === '[object ' + name + ']';
	    };
	}

	if (true) {
	    _.isFunction = function(obj) {
	        return typeof obj == 'function' || false;
	    };
	}

	_.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	};

	_.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	};

	_.isNull = function(obj) {
	    return obj === null;
	};

	_.isUndefined = function(obj) {
	    return obj === void 0;
	};

	// 测试对象是否是通过 "{}" 或者 "new Object" 创建的
	_.isPlainObject = function(obj) {
	    if (!obj || !_.isObject(obj) || obj.nodeType) {
	        return false
	    }
	    try {
	        if (obj.constructor && !hasOwnProperty.call(obj, "constructor") && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
	            return false
	        }
	    } catch (e) {
	        return false
	    }
	    var key;
	    for (key in obj) {}
	    return key === undefined || hasOwnProperty.call(obj, key)
	};

	/**
	 * Merge the contents of two or more objects together into the first object.
	 *
	 * @param {Boolean} [deep]
	 * @param {Object}  target
	 * @param {Object}  object1
	 * @param {Object}  [objectN]
	 * @return {Object}
	 */
	_.extend = function() {
	    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false
	    if (_.isBoolean(target)) {
	        deep = target;
	        target = arguments[1] || {};
	        i = 2;
	    }
	    if (!_.isObject(target) && !_.isFunction(target)) {
	        target = {}
	    }
	    if (length === i) {
	        target = this;
	        --i;
	    }
	    for (i; i < length; i++) {
	        if ((options = arguments[i]) != null) {
	            for (name in options) {
	                src = target[name];
	                copy = options[name];
	                if (target === copy) {
	                    continue
	                }
	                if (deep && copy && (_.isPlainObject(copy) || (copyIsArray = _.isArray(copy)))) {
	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && _.isArray(src) ? src : []
	                    } else {
	                        clone = src && _.isPlainObject(src) ? src : {};
	                    }
	                    // WARNING: RECURSION
	                    target[name] = _.extend(deep, clone, copy);
	                } else if (copy !== undefined) {
	                    target[name] = copy;
	                }
	            }
	        }
	    }
	    return target;
	};

	// xx-oo return xxOo
	_.camelCase = function(str) {
	    return ("" + str).replace(/-\D/g, function(match) {
	        return match.charAt(1).toUpperCase();
	    });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * -------------------------------------------------------
	 *
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/12
	 * @update
	 * -------------------------------------------------------
	 * form status
	 * @property {boolean} $pristine True if user has not interacted with the form yet.
	 * @property {boolean} $dirty True if user has already interacted with the form.
	 * @property {boolean} $valid True if all of the containing forms and controls are valid.
	 * @property {boolean} $invalid True if at least one containing control or form is invalid.
	 * @property {boolean} $submitted True if user has submitted the form even if its invalid.
	 * @property {Object} $error Is an object hash, containing references to controls or forms with failing validators.
	 */

	var _ = __webpack_require__(2);
	var prototype = {
		config: function(data){
			_.extend(data, {
				form: {
					
				}
			});
		},
		$setValidity: null,
		$setDirty: null,
		$setPristine: null,
		$setSubmitted: null,
		$setError: null
	};
	module.exports = prototype;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	 * -------------------------------------------------------
	 *
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/12
	 * @update
	 * -------------------------------------------------------
	 */


	var input = {
		'name': function(element, value, name, attrs) {
			
		}
	};
	module.exports = input;

/***/ }
/******/ ])
});
;