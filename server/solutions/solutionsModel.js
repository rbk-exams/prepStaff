var mongoose = require('mongoose');

var solutionsSchema = new mongoose.Schema({
	questionText : String,
	solution : String,
	slide : String,
	lecture : String,
	number : Number
})

module.exports=mongoose.model('answers',solutionsSchema);