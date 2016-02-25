/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 */


var prototype = require('./form'),
    directive = require('./directive');
var RegularForm = function(Component){
    Component.implement(prototype)           // implement method
        .directive(directive);       // define directive
};
module.exports = RegularForm;