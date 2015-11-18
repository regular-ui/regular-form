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
var validator = {
    checkRequired: function (value) {
        return value !== '';
    },
    checkType: function (type, value) {
        return constant[type.toUpperCase() + '_REGEXP'].test(value);
    }
};
module.exports = validator;