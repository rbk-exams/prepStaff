var mongoose = require('mongoose');
var questions = require('../questions/questionsModel.js');

var LecturesSchema=new mongoose.Schema({
	slide : String,
	title: String,
	subTitle: String,
	week : Number,
	day: Number,
	part: Number,
	status: Boolean,
	questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'questions'}]
});

module.exports=mongoose.model('lectures',LecturesSchema);