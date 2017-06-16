const router = require("express").Router;
const route = router();
const User = require('../db/models').User;
const passport = require('../auth/passport');

route.post('/login',passport.authenticate('local',{
	successRedirect:'/profile',
	failureRedirect:'login.html'
}));

route.post('/signup',function(req,res){
	User.create({
		username:req.body.username,
		email:req.body.email,
		password:req.body.password
	})
	.then(function(user){
		res.redirect('/login.html');
	})
});

route.get('/profile',function(req,res){
	res.send(req.user);
})
module.exports = route;