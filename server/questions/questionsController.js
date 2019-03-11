var Question = require('./questionsModel.js');
var Lecture = require('../lectures/lecturesModel.js');

module.exports={
	//add new question and update its corresponding lecture questions.
	addQuestion : function ( req, res, next ) {
		var questionText = req.body.questionText;
		var example = req.body.example;
		var type = req.body.type;
		var image = req.body.image;
		var lectureID = req.body.lectureID;
		var numb = req.body.number;
		var postQuestion = req.body.postQuestion;
		
		//check if the question exists, if not create new one and add it.
		Question.findOne({ questionText : questionText },function(err,results){
			if(results){
				next(new Error('Question already Exist'));
			}else{
				Question.create({
					questionText : questionText ,
					type : type ,
					example : example ,
					image : image ,
					lectureID : lectureID,
					postQuestion : postQuestion ,
					number : numb
				},function(err,question){
					if(err){
						next(new Error('There was error adding'));
					}else{
						//after adding new question, update the lecture and add the new generated question Id to the related lecture
						Lecture.update({'_id': lectureID}, {$push :{'questions': question._id}},
						function(err,questionLecture){
							if(err){
								next(new Error("There was an error adding"));
							}else{
								res.send({ lectureModifeied: questionLecture , question : question });								
							}
						});
					}
				})
			}
		})
	},
	//edit question information based on its ID.
	editQuestion : function ( req, res, next ) {
		var data = req.body;
		var questionID= req.body.id;

		//update any question details.
		Question.update({'_id': questionID},{ '$set' : data },
		function(err, modifiedQues){
			if(err){
				next(new Error("Error while updating"));
			}else{
				res.send({ modifiedQues : modifiedQues });
			}
		})
	},
	//get one question by its ID
	getQuestion : function ( req, res ,next ) {
		var questionID = req.params.id;

		//find the requested questions and send it back
		Question.findOne({ '_id' : questionID },
		function(err,questionFound){
			if(err){
				next(new Error('Question was not found'));
			}else{
				res.send({ question : questionFound });
			}
		})
	},
	//get all questions that are related to certain lecture
	getAllLectureQuestions : function ( req, res, next) {
		var lectureID= req.params.lectureID;

		//search for all the questions that have the same lecture ID.
		Question.find({lectureID : lectureID},
		function(err,questions){
			if(err){
				next(new Error("There was an error"));
			}else{
				res.send({questions: questions});
			}
		})
	},
	//remove question based on its ID
	removeQuestion : function ( req, res, next ) {
		var questionID= req.params.id;

		//find a question and then remove it.
		Question.findOne({ '_id':questionID },
		function(err, question){
			if(err){
				next(new Error('There was error finding the question'));
			}else{
				if(question !== null){
					question.remove(function(err,removedQues){
						if(err){
							next(new Error('There was error deleting'));
						}else{
							res.send({ removedQuestion : removedQues })
						}
					});
				}else{
					res.json("Question have been already removed");
				}
			};
		})
	}
}