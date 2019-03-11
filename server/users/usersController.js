var User=require('./usersModel.js');
var jwt=require('jwt-simple');

module.exports={
	signup:function(req,res,next){
		var userName= req.body.userName;
		var password= req.body.password;

		User.findOne({userName: userName},function(err,results){
			if(results){
				next(new Error('User already exist!'));
			}else{
				User.create({
					userName: userName,
					password: password
				},function(err,user){
					if(err){
						next(new Error(err));
					}else{
						var token=jwt.encode(user, 'secret');
						res.json({ token: token });
					}
				});
			};
		});
	},
	signin:function(req,res){
		var userName= req.body.userName;
		var password= req.body.password;
 
		User.findOne({userName: userName},function(err,user){
			if(user){
				return user.comparePasswords(password)
		            .then(function (foundUser) {
		              if (foundUser) {
		                var token = jwt.encode(user, 'secret');
		                res.json({token: token});
		              } else {
		                return next(new Error('No user'));
		              }
            	});
			}else{
				res.status(500).send("User Does Not Exist")
			}	
		});
	}
}