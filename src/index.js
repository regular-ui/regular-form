/*
 * -------------------------------------------------------
 *
 * @version  1.0
 * @author   amibug(hzxs1990225@163.com)
 * @date     2015/11/12
 * @update
 * -------------------------------------------------------
 */



var Regular = require('regularjs'),
	_ = require('./helper/util'),
	prototype = require('./form'),
	input = require('./directive/input');
var directive = _.extend({}, input);
var RegularForm = Regular.extend(prototype)
	.directive(directive);

RegularForm.mixIn = function() {

};

module.exports = RegularForm;