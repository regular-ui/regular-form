(function () {
    var tpl = '<form action="" novalidate>\
            id: <input name="id" type="text" r-required="required" r-type="number" r-model={value} r-max="33" r-extend={extend}/><br>\
            id2: <input name="id2" type="text" r-required="required" r-type="number" r-model={value1} r-max="33" r-extend={extend}/><br>\
            form.$$id.$error.required: {form.$$id.$error.required}<br>\
            form.$$id.$error.type: {form.$$id.$error.type}<br>\
            form.$$id.$invalid: {form.$$id.$invalid}<br>\
            form.$$id.$dirty: {form.$$id.$dirty}<br>\
            form.$$id2.$invalid: {form.$$id2.$invalid}<br>\
            form.$$id2.$dirty: {form.$$id2.$dirty}<br>\
            form.$dirty: {$dirty}<br>\
        </form>';
    var Form = RegularForm.extend({
        template: tpl,
        name: 'wgt-form',
        config: function (data) {
            data.action = 'xxx';
            data.value = 'xxx';
            data.extend = function () {

            };
            this.supr(data);
        },
        init: function (data) {
            data.required = true;
            this.supr(data);
        }
    });
    new Form({}).$inject('#form-box');
}());