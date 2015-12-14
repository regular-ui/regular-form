(function () {
    var tpl = document.getElementById('template').innerText;
    var Form = RegularForm.extend({
        template: tpl,
        name: 'wgt-form',
        config: function (data) {
            data.extend = function (model) {
                return model > 500;
            };
            data.extend2 = function (model) {
                return model === 'hello@163.com';
            };
            data.max = 1024;
            data.pattern = /^\d{3}$/;
            this.supr(data);
        },
        init: function (data) {
            this.supr(data);
        }
    });
    new Form({}).$inject('#form-box');
}());