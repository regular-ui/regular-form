(function(){
    var tpl = '<form action="">\
            <input type="text" r_input="{value}" r-model={value}/>\
        </form>';
    var Form = RegularForm.extend({
        template: tpl,
        name: 'wgt-form',
        config: function(data){
            data.action = 'xxx';
            data.value = 12;
        }
    });
    new Form({

    }).$inject('#form-box');
}());