/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 */
var Regular = require('regularjs');
var _ = require('./helper/util');
var validator = require('./validator');
var constant = require('./helper/const');

var extractValue = function (value) {
    if (!!value && !!value.type && value.type.toLowerCase() === 'expression') {
        value = this.$get(value);
    }
    return value;
};

var addControl = function (element, directiveValue, directiveName, attrs) {
    var rModel,
        context = this,
        name = element.name,
        key = _.dName(directiveName);
    if (!name || name === '') {
        _.log('you need specified a value for name', true);
    }
    var watch = function (model) {
        var dvalue = extractValue.call(context, directiveValue);
        return validator[_.camelCase('check-' + key)].call(context, model, dvalue, name);
    };

    _.some(attrs, function (item) {
        if (item.name === 'r-model') {
            rModel = item.value;
            return true;
        }
    });
    // r-model指令在执行之后，regular会将其删除
    // 比如在某个条件下生效r-required的时候，r-required link函数取不到第一次compile时候的attrs，也取不到r-model
    //if (!rModel || rModel === '') {
    //    _.log('you need specified a value for [r-model]', true);
    //}
    context.data.form = context.data.form || {};
    if (!context.data.form['$$' + name]) {
        context.resetField(name, element, rModel);
    }
    context.addHandler(name, {
        // priority决定验证顺序，regular的指令是按书写顺序执行的
        priority: constant.PRIORITY[key],
        directive: directiveName,
        handler: watch
    });
    context.checkValidity(name);
    return function () {
        context.removeHandler.call(context, name, directiveName);
        // destory的时候验证的handler已经移除，需要手动setError
        context.setError(name, _.dName(directiveName), false);
        context.checkValidity(name);
    }
};


// 提取出Regular中的directive， 需要覆盖
var r_Model = Regular.directive("r-model");

var input = {
    // r-model在不需要验证的元素上也会用到，表单name不是必须的
    'r-model': {
        priority: 100,
        link: function (element, value, dname, attrs) {
            // name是必填的
            var name = element.name;
            // 需要验证的元素，name是必须的，r-model是必须的
            if (name !== '' && !this.data.form['$$' + name]) {
                this.resetField(name, element, value);
            }
            var destroy = r_Model.link.apply(this, arguments);
            return function () {
                destroy();
            }
        }
    },
    'r-required': {
        priority: 110,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-type': {
        priority: 120,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-length':{
        priority: 121,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-min': {
        priority: 130,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-max': {
        priority: 140,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-step': {
        priority: 150,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-pattern': {
        priority: 150,
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    },
    'r-extend': {
        link: function (element, value, dname, attrs) {
            return addControl.apply(this, arguments);
        }
    }
};
module.exports = input;