/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 * form status
 * @property {boolean} $dirty True if user has already interacted with the form.
 * @property {boolean} $invalid True if at least one containing control or form is invalid.
 * @property {Object} $error Is an object hash, containing references to controls or forms with failing validators.
 */
var Regular = require('regularjs');
var _ = require('./helper/util');
var dom = Regular.dom;
var checkRule = {
    '1': function (input, off) {
        var context = this;
        if (!!off) {
            this.$unwatch(input.$model, function (newValue, oldValue) {
                context.checkValidity(input.$name);
            });
        } else {
            this.$watch(input.$model, function (newValue, oldValue) {
                context.checkValidity(input.$name);
            });
        }
    },
    '2': function (input, off) {
        var context = this;
        if (!!off) {
            dom.off(input.$element, 'blur', function () {
                context.checkValidity(input.$name);
            });
        } else {
            dom.on(input.$element, 'blur', function () {
                context.checkValidity(input.$name);
            });
        }
    }
};
prototype = {
    computed: {
        // 整个表单的status
        '$dirty': function (data) {
            var mark = false,
                context = this,
                keys = _.keys(data.form);
            _.forEach(keys, function (key) {
                if (!mark)
                    mark = data.form[key].$dirty;
            });
            var children = this._children;
            _.forEach(children, function(it){
                if (!mark) {
                    mark = !!it.$get('$dirty');
                };
            });
            return mark;
        },
        '$invalid': function (data) {
            var mark = false,
                context = this,
                keys = _.keys(data.form);
            _.forEach(keys, function (key) {
                if (!mark)
                    mark = data.form[key].$invalid;
            });
            var children = this._children;
            _.forEach(children, function(it){
                if (!mark) {
                    mark = !!it.$get('$invalid');
                }
            });
            console.log(mark);
            return mark;
        }
    },
    config: function (data) {
        this.supr(data);
        data.form = {};
        data.rule = data.rule || 1; // 1:实时验证,2:失去焦点时验证
    },
    init: function (data) {
        this.supr(data);
        data.rule = data.rule || 1;
    },
    /**
     * 设置表单元素初始值
     * @param name      - 表单元素name
     * @param element   - 表单元素
     * @param model     - r-model
     */
    resetField: function (name, element, model) {
        var data = this.data;
        // 表单元素的status
        _.extend(true, data.form['$$' + name] = {}, {
            $origin: this.$get(model),
            $element: element,
            $name: name,
            $handler: [],
            $model: model,
            $dirty: false,
            $invalid: false,
            $error: {}
        });
        this.$update();
    },
    setInValidity: function (name, flag) {
        this.data.form['$$' + name].$invalid = flag;
        this.$update();
    },
    setDirty: function (name, flag) {
        this.data.form['$$' + name].$dirty = flag;
        this.$update();
    },
    setError: function (name, field, flag) {
        this.data.form['$$' + name].$error[field] = flag;
        this.$update();
    },
    addHandler: function (name, handler) {
        var handlers = this.data.form['$$' + name].$handler,
            data = this.data,
            input = data.form['$$' + name];
        handlers.push(handler);
        handlers.sort(function (handler0, handler1) {
            return handler0.priority - handler1.priority;
        });
        checkRule[data.rule].call(this, input);
    },
    removeHandler: function (name, directive) {
        var index = -1,
            data = this.data,
            input = data.form['$$' + name],
            handlers = input.$handler;
        _.forEach(handlers, function (item, i) {
            if (item.directive === directive) {
                index = i;
            }
        });
        (index !== -1) && handlers.splice(index, 1);
        checkRule[data.rule].call(this, input, true);
    },
    /**
     * check表单
     * @param name  - 表单元素的name(没有传name check整个表单)
     */
    checkValidity: function (name) {
        var context = this,
            data = this.data;
        if (_.isUndefined(name)) {
            var keys = _.keys(data.form);
            _.forEach(keys, function (key) {
                context.checkValidity(data.form[key].$name);
            });
        } else {
            var mark = true,
                checkItem = data.form['$$' + name],
                model = context.$get(checkItem.$model);
            _.forEach(checkItem.$handler, function (item) {
                if (mark) {
                    mark = item.handler.call(context, model);
                    !mark && _.log('directive' + item.directive + 'check error');
                    context.setError(checkItem.$name, _.dName(item.directive), !mark);
                } else {
                    // 验证过程中有出错的，将PRIORITY低的验证重置
                    context.setError(checkItem.$name, _.dName(item.directive), mark);
                }
            });
            // 表单元素全部都是string类型
            // 污染之后清空，值为'', 默认为undefined
            context.setDirty(checkItem.$name, !!model != !!checkItem.$origin);
            context.setInValidity(checkItem.$name, !mark);
        }
        context.$update();
    }
};
module.exports = prototype;