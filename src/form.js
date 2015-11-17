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
    computed: function () {

    },
    config: function (data) {
        data.form = {};
    },
    resetField: function (model) {
        var data = this.data;
        data.form['$$' + model] = {
            $dirty: false,
            $invalid: false,
            $error: {}
        };
    },
    setValidity: function (model) {

    },
    setDirty: function (model) {

    },
    setSubmitted: _.noop,
    setError: function () {

    },
    validate: function(model){

    }
};
module.exports = prototype;