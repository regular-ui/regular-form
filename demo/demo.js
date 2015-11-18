(function () {
    var tpl = '<form action="" novalidate>\
            <input name="id" type="text" r-required="required" r-type="number" r-model={value} r-max="33" r-extend={extend}/>\
            <input name="id2" type="text" r-required="required" r-type="number" r-model={value1} r-max="33" r-extend={extend}/>\
            {form.$$id.$error.required}\
            {form.$$id.$error.type}\
            {form.$$id.$invalid}\
            {form.$$id.$dirty}\
            {form.$$id2.$invalid}\
            {form.$$id2.$dirty}\
            {$dirty}\
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