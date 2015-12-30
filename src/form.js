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
 * @property {boolean} $submitted True if user has submitted the form even if its invalid.
 * @property {Object} $error Is an object hash, containing references to controls or forms with failing validators.
 */
var Regular = __webpack_require__(1);
var _ = __webpack_require__(2);
var dom = Regular.dom;
var checkRule = function (input, off) {
    var context = this;
    dom.on(input.$element, 'blur', function () {
        context.setTouched(input.$name, true);
        context.setDirty2(input.$name);
        context.$update();
    });
    if (!!off) {
        this.$unwatch(input.$model, function (newValue, oldValue) {
            context.checkValidity(input.$name);
        });
    } else {
        this.$watch(input.$model, function (newValue, oldValue) {
            context.setDirty(input.$name, true);
            context.checkValidity(input.$name);
        });
    }
};
prototype = {
    computed: {
        // 整个表单的status
        // $dirty  true - 有改动 | false - 干净
        '$dirty': function (data) {
            var mark = false,
                keys = _.keys(data.form);
            mark = _.some(keys, function (key) {
                return !!data.form[key].$dirty;
            });
            var children = this._children;
            if (mark)
                return mark;
            mark = _.some(children, function (it) {
                return !!it.$get('$dirty');
            });
            return mark;
        },
        // $invalid  true - 验证不通过 | false - 验证通过
        '$invalid': function (data) {
            var mark = false,
                keys = _.keys(data.form);
            mark = _.some(keys, function (key) {
                return !!data.form[key].$invalid;
            });
            var children = this._children;
            if (mark)
                return mark;
            mark = _.some(children, function (it) {
                return !!it.$get('$invalid');
            });
            return mark;
        }
    },
    /**
     * @overwrite
     * @param data
     */
    config: function (data) {
        this.supr(data);
        data.form = {};
    },
    /**
     * @overwrite
     * @param data
     */
    init: function (data) {
        this.supr(data);
        var keys = _.keys(data.form);
        var context = this;
        _.forEach(keys, function (it, idx) {
            checkRule.call(context, data.form[it]);
        });
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
            $element: element,
            $name: name,
            $handler: [],
            $model: model,
            $dirty: false,
            $dirty2: false,
            $invalid: false,
            $touched: false,
            $error: {}
        });
    },
    setInValidity: function (name, flag) {
        this.data.form['$$' + name].$invalid = flag;
    },
    setDirty: function (name, flag) {
        this.data.form['$$' + name].$dirty = flag;
    },
    setDirty2: function (name, flag) {
        var model = this.data.form['$$' + name];
        var mark = !!model.$dirty || !!model.$touched || !!this.data.$submitted;
        this.data.form['$$' + name].$dirty2 = mark;
    },
    setTouched: function (name, flag) {
        this.data.form['$$' + name].$touched = flag;
    },
    setError: function (name, field, flag) {
        this.data.form['$$' + name].$error[field] = flag;
    },
    addHandler: function (name, handler) {
        var handlers = this.data.form['$$' + name].$handler,
            data = this.data;
        handlers.push(handler);
        handlers.sort(function (handler0, handler1) {
            return handler0.priority - handler1.priority;
        });

    },
    removeHandler: function (name, directive) {
        var index = -1,
            data = this.data,
            handlers = data.form['$$' + name].$handler;
        _.some(handlers, function (item, i) {
            if (item.directive === directive) {
                index = i;
                return true;
            }
        });
        (index !== -1) && handlers.splice(index, 1);
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
                    context.setError(checkItem.$name, _.dName(item.directive), !mark);
                } else {
                    // 验证过程中有出错的，将PRIORITY低的验证重置
                    context.setError(checkItem.$name, _.dName(item.directive), mark);
                }
            });
            context.setInValidity(checkItem.$name, !mark);
            context.setDirty2(checkItem.$name);
        }
    }
};
module.exports = prototype;