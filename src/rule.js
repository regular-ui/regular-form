/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 */
var constant = require('./helper/const');
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