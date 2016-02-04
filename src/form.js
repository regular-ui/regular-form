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
    // for input[type!=radio|checkbox] textarea
    dom.on(input.$element, 'blur', function () {
        var model = context.$get(input.$model);
        input.$status = 'blur';
        context.$update(input.$model, (''+model).trim());
    });
    dom.on(input.$element, 'focus', function () {
        input.$status = 'focus';
        input.$submit = false;
        context.$update();
    });
    dom.on(input.$element, 'keyup', function () {
        input.$status = 'keyup';
        context.setDirty(input.$name, true);
        context.$update();
    });
    // for select input[type==radio|checkbox]
    // TODO
    if (!!off) {
        this.$unwatch(input.$model, function (newValue, oldValue) {
            context.checkValidity(input.$name);
        });
    } else {
        this.$watch(input.$model, function (newValue, oldValue) {
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
        // 表单验证结果
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
        },
        // 必填项是否填满
        // $full  true - 填满 | false - 未填满
        '$full': function(data){
            var mark = true,
                keys = _.keys(data.form);
            _.some(keys, function (key) {
                if(!!data.form[key].$error.required){
                    mark = false;
                    return true;
                }
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
            $status: '',
            $element: element,
            $name: name,
            $handler: [],
            $model: model,
            $dirty: false,
            $invalid: false,
            $submit: false,
            $error: {}
        });
    },
    setInValidity: function (name, flag) {
        this.data.form['$$' + name].$invalid = flag;
    },
    setDirty: function (name, flag) {
        this.data.form['$$' + name].$dirty = flag;
    },
    setError: function (name, field, flag) {
        this.data.form['$$' + name].$error[field] = flag;
    },
    addHandler: function (name, handler) {
        var handlers = this.data.form['$$' + name].$handler,
            data = this.data,
            input = data.form['$$' + name];
        if(!handlers.length){
            checkRule.call(this, input);
        }
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
        }
    },
    $$check: function(){
        var data = this.data;
        var keys = _.keys(data.form);
        _.forEach(keys, function (key) {
            return data.form[key].$submit = true;
        });
        this.$update();
        return this.$get('$invalid');
    }
};
module.exports = prototype;