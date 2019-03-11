var Solutions = require('./solutionsModel.js')

module.exports={
	addSolution : function(req, res, next) {
		var solution = req.body.solution;
		var questionText =req.body.questionText;
		var	slide =req.body.slide;
		var lecture = req.body.lecture;
		var number = req.body.number;

		Solutions.findOne({questionText : questionText},function(err,results){
			if(results){
				next(new Error('Question Already exist'));
			}else{
				Solutions.create({
					solution : solution,
					questionText : questionText,
					slide : slide,
					lecture : lecture,
					number : number
				},function(err,answer){
					if(err){
						next(new Error('Error adding new solution'))
					}else{
						res.send({ answer: answer });
					}
				})
			}
		})
	},
	getAllLectureSolutions : function ( req, res, next) {
		var lecture = req.params.lecture;

		Solutions.find({lecture : lecture},function(err,results){
			if(results){
				res.send({ answers : results });
			}else{
				next(new Error('No lecture solution was found !'))
			}
		})
	},
	getAllSolutionLectures : function (req, res, next) {
		Solutions.find({},function(err,results){
			var solutionLecture = [];
			if(results){
				for(var i =0 ; i < results.length ; i++){
					if(solutionLecture.indexOf(results[i]['lecture']) === -1){
						solutionLecture.push(results[i]['lecture']);
					}
				}
				res.send({ solutions : solutionLecture })
			}else{
				next(new Error('No solution lecture was found !'));
			}
		})
	}
}