var Lecture=require('./lecturesModel.js')

module.exports={
	//add new lecture
	addLecture : function ( req , res , next ) {
		var slide = req.body.slide;
		var title = req.body.title;
		var subTitle = req.body.subTitle;
		var week = req.body.week;
		var day = req.body.day;
		var part = req.body.part;

		Lecture.findOne({ slide: slide },function(err,results){
			if(results){
				next(new Error('Lecture already exist'));
			}else{
				Lecture.create({
					slide : slide ,
					title: title ,
					subTitle: subTitle ,
					week: week ,
					day: day ,
					part: part
				},function(err,lecture){
					if(lecture){
						res.json({ lecture: lecture });
					}else{
						next(err);
					}
				})
			}
		})

	},
	//add question to a certain lecture
	addQuestiontoLecture : function ( req, res , next ){
		var lectureID = req.body.lectureID;
		var question = req.body.question;
		
		Lecture.update({'_id': lectureID}, {$push :{'questions': question}},
		function(err,question){
			if(err){
				next(new Error("There was an error adding"));
			}else{
				res.send({question: question});
			}
		});
	},
	//get a certain lecture based on its id
	getLecture : function ( req , res ,next){
		var lectureID = req.params.id;

		Lecture.findOne({ '_id' : lectureID },
		function(err,lecture){
			if(err){
				next(new Error('Lecture was not found'));
			}else{
				res.send({ Lecture : lecture});
			}
		});
	},
	//returns all existing lectures 
	getAllLectures : function ( req , res ,next){
		Lecture.find({},
		function(err,lectures){
			if(err){
				next(new Error('Error finding lectures'))
			}else{
				res.send({ lectures : lectures });
			}
		})
	},
	//get questions to a certain lecture based on its id
	getLectureQuestions : function ( req , res ,next){
		var lectureID = req.params.id;

		Lecture.findOne({ '_id': lectureID }, 'questions',
		function(err, lectureQuestions ){
			if(err){
				next(new Error('Error finding lecture questions'));
			}else{
				res.send({ lectureQuestions : lectureQuestions });
			}
		});
	},
	//get all lectures for a certain week
	getLectureByWeek: function ( req, res, next) {
		var week=Number(req.params.week);

		Lecture.find({ 'week' : week },function(err,results){
			if(err){
				next(new Error('No lecture Found'));
			}else{
				res.send({ results : results });
			}
		})

	},
	//get a lecture by the title
	getLectureByTitle : function( req , res , next){
		var title = req.params.title;

		Lecture.findOne({ title : title },function( err, lecture ){
			if(err){
				next(new Error('Error fitching lecture'));
			}else{
				res.send({ lecture : lecture });
			}
		})
	},
	//edit lecture information
	editLecture : function ( req, res , next ) {
		var data = req.body;
		var lectureID = req.body.id;

		Lecture.update({ '_id' : lectureID }, { '$set' : data},
		function(err, lecture ){
			if(err){
				next(new Error('Error editing the lecture'));
			}else{
				res.send({ lecture : lecture });
			}
		}) 
	},
	//remove lecture based on its id
	removeLecture : function ( req, res ,next ) {
		var lectureID = req.params.id;

		Lecture.findOne({ '_id' : lectureID },
		function( err , lecture ){
			if(err){
				next(new Error('Lecture was not found'));
			}else{
				if( lecture !== null){
					lecture.remove(function(err,removedLecture){
						if(err){
							next(new Error('Error removing lecture'));
						}else{
							res.send({ removedLecture : removedLecture })
						}
					})
				}else{
					res.json('Lecture have been already removed');
				}
			}
		})
	}
}