/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/17
 * @update
 * -------------------------------------------------------
 */

var constant = require('./helper/const');
var _ = require('./helper/util');
// true 表示通过验证
var validator = {
    checkRequired: function (model, linkValue) {
        if (linkValue === 'false' || linkValue === false) {
            return true;
        }
        // checkbox
        if (_.isBoolean(model)) {
            return model === true;
        }
        return model !== undefined && model !== '';
    },
    checkType: function (model, type) {
        if (!constant[type.toUpperCase() + '_REGEXP']) {
            return true;
        }
        return constant[type.toUpperCase() + '_REGEXP'].test(model);
    },
    checkMin: function (model, min) {
        // min可能是输入项，会被转化成string
        min = parseFloat(min);
        if (!_.isNumber(min)) {
            return true;
        }
        return +model >= min;
    },
    checkMax: function (model, max) {
        max = parseFloat(max);
        if (!_.isNumber(max)) {
            return true;
        }
        return +model <= max;
    },
    checkStep: function (model, step) {
        step = parseFloat(step);
        if (!_.isNumber(step)) {
            return true;
        }
        return +model % step === 0;
    },
    checkPattern: function (model, pattern) {
        if (!_.isRegExp(pattern)) {
            pattern = new RegExp(pattern);
        }
        return pattern.test(+model);
    },
    checkExtend: function (model, extend) {
        if (!_.isFunction(extend)) {
            return true;
        }
        return extend.call(this, model);
    }
};

module.exports = validator;