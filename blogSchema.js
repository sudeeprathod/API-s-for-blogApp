var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title 		                 : {type:String,default:'',required:true, unique:true},
	subTitle               : {type:String,default:''},
	blogBody            : {type:String,default:''},
	tags		                 : [],
	created		             : {type:Date},
	lastModified       : {type:Date},
	authorInfo          :  {},

});


mongoose.model('blogModelX',blogSchema);