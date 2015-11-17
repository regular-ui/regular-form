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

if (typeof /./ !== 'function') {
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