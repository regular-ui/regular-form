(function () {
    var tpl = '<form action="" novalidate>\
            <input type="text" name="id" r-model={value} required={required}/>\
        </form>';
    var Form = RegularForm.extend({
        template: tpl,
        name: 'wgt-form',
        config: function (data) {
            data.action = 'xxx';
            data.value = 12;
            data.required = 'required';
        },
        init: function(data){
            console.log(this);
        }
    });
    new Form({}).$inject('#form-box');
}());