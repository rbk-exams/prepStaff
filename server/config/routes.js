var usersController=require('../users/usersController.js');
var questionsController= require('../questions/questionsController.js');
var lecturesController=require('../lectures/lecturesController.js');
var solutionsController = require('../solutions/solutionsController.js');
const path = require('path');

module.exports=function (app, express){

	////////////////////////////////////////////////////////
	//													///
	//				Users Routes						///	
	//													///
	///////////////////////////////////////////////////////

	app.post('/api/users/signin',usersController.signin);
	app.post('/api/users/signup',usersController.signup);

	////////////////////////////////////////////////////////
	//													///
	//				Questions Routes					///	
	//													///
	///////////////////////////////////////////////////////
	
	app.get('/api/questions/getQuestion/:id', questionsController.getQuestion);
	app.get('/api/questions/getAllLectureQuestions/:lectureID', questionsController.getAllLectureQuestions);
	app.post('/api/questions/addQuestion', questionsController.addQuestion);
	app.put('/api/questions/editQuestion', questionsController.editQuestion);
	app.delete('/api/questions/removeQuestion/:id', questionsController.removeQuestion);

	////////////////////////////////////////////////////////
	//													///
	//				Lectures Routes						///	
	//													///
	///////////////////////////////////////////////////////
	
	app.get('/api/lectures/getAllLectures',lecturesController.getAllLectures);
	app.get('/api/lectures/getLecture/:id',lecturesController.getLecture);
	app.get('/api/lectures/getLectureQuestions/:id',lecturesController.getLectureQuestions);
	app.get('/api/lectures/getLectureByWeek/:week',lecturesController.getLectureByWeek);
	app.get('/api/lectures/getLectureByTitle/:title', lecturesController.getLectureByTitle);
	app.post('/api/lectures/addLecture', lecturesController.addLecture);
	app.post('/api/lectures/addQuestiontoLecture', lecturesController.addQuestiontoLecture);
	app.put('/api/lectures/editLecture',lecturesController.editLecture);
	app.delete('/api/lectures/removeLecture/:id', lecturesController.removeLecture)

	////////////////////////////////////////////////////////
	//													///
	//				Solutions Routes					///	
	//													///
	///////////////////////////////////////////////////////

	app.post('/api/solutions/addSolution', solutionsController.addSolution);
	app.get('/api/solutions/getAllLectureSolutions/:lecture' , solutionsController.getAllLectureSolutions);
	app.get('/api/solutions/getAllSolutionLectures', solutionsController.getAllSolutionLectures);
	
	//script for handling any request that comes from the client that are asked when the client refresh the page that requires # before it.
	app.all('*', (req, res) => {
	console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
		res.status(200).sendFile(path.join(__dirname, '../../client', 'index.html'));
	});
}