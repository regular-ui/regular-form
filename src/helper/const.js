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
    TIME_REGEXP: /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,


    PRIORITY: {
        required: 1,
        type: 2,
        min: 3,
        max: 4,
        step: 5,
        pattern: 6,
        extend: 7
    }
};


module.exports = constant;

