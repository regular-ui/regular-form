/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 */
var rule = require('./rule');
var Regular = require('regularjs');
var _ = require('./helper/util');
var validator = require('./validator');

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