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

var _ = require('./helper/util');
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