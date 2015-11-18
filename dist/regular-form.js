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

	_.noop = function () {
	};

	_.trim = function (str) {
	    if (!!str.trim) return str.trim();
	    return str.replace(/(^\s*)|(\s*$)/g, '');
	};

	_.toArray = Array.form || function (arrayLike) {
	        return Array.prototype.slice.call(arrayLike);
	    };

	_.isArray = Array.isArray || function (obj) {
	        return toString.call(obj) === '[object Array]';
	    };

	// Function Date RegExp Error Array 和 new 创建的对象
	_.isObject = function (obj) {
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
	    _['is' + name] = function (obj) {
	        return toString.call(obj) === '[object ' + name + ']';
	    };
	}

	if (true) {
	    _.isFunction = function (obj) {
	        return typeof obj == 'function' || false;
	    };
	}

	_.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	};

	_.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	};

	_.isNull = function (obj) {
	    return obj === null;
	};

	_.isUndefined = function (obj) {
	    return obj === void 0;
	};

	// 测试对象是否是通过 "{}" 或者 "new Object" 创建的
	_.isPlainObject = function (obj) {
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
	    for (key in obj) {
	    }
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
	_.extend = function () {
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

	_.forEach = function (obj, iteratee, context) {
	    if (!_.isArray(obj)) return obj;
	    var i, length = obj.length;
	    if (!!obj.forEach) {
	        obj.forEach(iteratee, context);
	        return obj;
	    }
	    for (i = 0; i < length; i++) {
	        iteratee.call(context, obj[i], i, obj);
	    }
	    return obj;
	};

	// 测试数组的所有元素是否都通过了指定函数的测试
	_.every = function (obj, predicate, context) {
	    if (!_.isArray(obj)) return obj;
	    var i, value, length = obj.length;
	    if (!!obj.every) {
	        return obj.every(predicate, context);
	    }
	    for (i = 0; i < length; i++) {
	        value = iteratee.call(context, obj[i], i, obj);
	        if (value === false) {
	            return value;
	        }
	    }
	    return value;
	};

	// xx-oo return xxOo
	_.camelCase = function (str) {
	    return ("" + str).replace(/-\D/g, function (match) {
	        return match.charAt(1).toUpperCase();
	    });
	};

	_.noop = function () {
	};

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
	    computed: {
	        '$dirty': function (data) {
	            var mark = false;
	            for (var i in data.form) {
	                if (data.form.hasOwnProperty(i)) {
	                    if (!mark)
	                        mark = data.form[i].$dirty;
	                }
	            }
	            return mark;
	        },
	        '$invalid': function (data) {
	            var mark = false;
	            for (var i in data.form) {
	                if (data.form.hasOwnProperty(i)) {
	                    if (!mark)
	                        mark = data.form[i].$invalid;
	                }
	            }
	            return mark;
	        }
	    },
	    config: function (data) {
	        data.form = {};
	    },
	    init: function (data) {
	        var context = this;
	        for (var i in data.form) {
	            if (data.form.hasOwnProperty(i)) {
	                var obj = data.form[i];
	                (function (obj) {
	                    context.$watch(obj.$model, function (newValue, oldValue) {
	                        var mark = true;
	                        _.forEach(obj.$handler, function (item, index) {
	                            if (mark) {
	                                mark = item.handler.call(context, newValue, oldValue);
	                                !mark && console.log('directive' + item.directive + 'check error');
	                                context.setError(obj.$name, item.directive.split('-')[1], !mark);
	                            }
	                        });
	                        context.setDirty(obj.$name, newValue !== obj.$origin);
	                        context.setInValidity(obj.$name, !mark);
	                    });
	                }(obj));
	            }
	        }
	    },
	    resetField: function (name, model) {
	        var data = this.data;
	        _.extend(true, data.form['$$' + name] = {}, {
	            $origin: this.$get(model) || '',
	            $name: name,
	            $handler: [],
	            $model: model,
	            $dirty: false,
	            $invalid: false,
	            $error: {}
	        });
	    },
	    setInValidity: function (name, flag) {
	        this.data.form['$$' + name].$invalid = flag;
	    },
	    setDirty: function (name, flag) {
	        this.data.form['$$' + name].$dirty = flag;
	    },
	    setSubmitted: _.noop,
	    setError: function (name, field, flag) {
	        this.data.form['$$' + name].$error[field] = flag;
	    },
	    addHandler: function (name, handler) {
	        this.data.form['$$' + name].$handler.push(handler);
	    },
	    removeHandler: function (name, directive) {

	    }
	};
	module.exports = prototype;

/***/ },
/* 4 */
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
	var rule = __webpack_require__(5);
	var Regular = __webpack_require__(1);
	var _ = __webpack_require__(2);
	var validator = __webpack_require__(6);

	var checkAttr = function (value, fieldName) {
	    if (!value || value === '') {
	        throw 'you need specified a value for [' + fieldName + ']';
	    }
	};

	var control = function (links, watch) {
	    var directiveValue = links[1],
	        directiveName = links[2],
	        attrs = links[3],
	        rModel,
	        name;

	    checkAttr.call(this, directiveValue, directiveName);
	    _.forEach(attrs, function (item, index) {
	        if (item.name === 'r-model') {
	            rModel = item.value;
	        }
	        if (item.name === 'name') {
	            name = item.value;
	        }
	    });
	    checkAttr.call(this, rModel, 'r-model');
	    if (!this.data.form['$$' + name]) {
	        this.resetField(name, rModel);
	    }

	    this.addHandler(name, {
	        directive: directiveName,
	        handler: watch
	    });
	};

	var input = {
	    'r-required': {
	        link: function (element, value, name, attrs) {
	            if (!!value.type && value.type === 'Expression') {
	                value = this.$get(value);
	            }
	            var watch = function (newValue, oldValue) {
	                if (value === 'false' || value === false) {
	                    return true;
	                }
	                return validator.checkRequired(newValue);
	            };
	            control.call(this, _.toArray(arguments), watch);
	        }
	    },
	    'r-type': {
	        link: function (element, value, name, attrs) {
	            if (!!value.type && value.type === 'Expression') {
	                value = this.$get(value);
	            }
	            var watch = function (newValue, oldValue) {
	                return validator.checkType(value, newValue);
	            };
	            control.call(this, _.toArray(arguments), watch);
	        }
	    },
	    'r-min': {
	        link: function (element, value, name, attrs) {
	        }
	    },
	    'r-max': {
	        link: function (element, value, name, attrs) {
	        }
	    },
	    'r-step': {
	        link: function (element, value, name, attrs) {
	        }
	    },
	    'r-pattern': {
	        link: function (element, value, name, attrs) {
	        }
	    },
	    'r-extend': {
	        link: function (element, value, name, attrs) {
	        }
	    }
	};
	module.exports = input;

/***/ },
/* 5 */
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

	var rule = {
	    validateField: {
	        'text': ['required', 'pattern', 'extend'],
	        'password': ['required', 'pattern', 'extend'],
	        'search': ['required', 'pattern', 'extend'],
	        'url': ['required', 'pattern', 'extend'],
	        'number': ['required', 'min', 'max', 'step', 'pattern', 'extend'],
	        'tel': ['required', 'min', 'max', 'step', 'pattern', 'extend'],
	        'email': ['required', 'pattern', 'extend'],
	        'date': ['required', 'pattern', 'extend'],
	        'month': ['required', 'pattern', 'extend'],
	        'week': ['required', 'pattern', 'extend'],
	        'time': ['required', 'pattern', 'extend'],
	        'datetime': ['required', 'pattern', 'extend'],
	        'datetime-local': ['required', 'pattern', 'extend'],
	        'checkbox': ['required', 'extend'],
	        'radio': ['required', 'extend']
	    }
	};

	module.exports = rule;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * -------------------------------------------------------
	 *
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/17
	 * @update
	 * -------------------------------------------------------
	 */

	var constant = __webpack_require__(7);
	var validator = {
	    checkRequired: function (value) {
	        return value !== '';
	    },
	    checkType: function (type, value) {
	        return constant[type.toUpperCase() + '_REGEXP'].test(value);
	    }
	};
	module.exports = validator;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
	 * -------------------------------------------------------
	 * 常量
	 * @version  1.0
	 * @author   amibug(hzxs1990225@163.com)
	 * @date     2015/11/16
	 * @update
	 * -------------------------------------------------------
	 */
	var constant = {
	    // Regex code is obtained from SO: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime#answer-3143231
	    ISO_DATE_REGEXP: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
	    // See valid URLs in RFC3987 (http://tools.ietf.org/html/rfc3987)
	    URL_REGEXP: /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/,
	    EMAIL_REGEXP: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
	    NUMBER_REGEXP: /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,
	    DATE_REGEXP: /^(\d{4})-(\d{2})-(\d{2})$/,
	    DATETIMELOCAL_REGEXP: /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
	    WEEK_REGEXP: /^(\d{4})-W(\d\d)$/,
	    MONTH_REGEXP: /^(\d{4})-(\d\d)$/,
	    TIME_REGEXP: /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/
	};
	module.exports = constant;



/***/ }
/******/ ])
});
;