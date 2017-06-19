const router = require("express").Router;
const route = router();
const User = require('../db/models').User;
const AuthToken = require('../db/models').AuthToken;
const passport = require('../auth/passport');
const eli = require("../auth/utils").eli;
const uid2 = require('uid2');

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

route.get('/logout',function (req,res) {
	req.user = null;
	req.logout();
	req.session.destroy(function () {
		res.redirect('/login.html');
    })
});

route.get('/profile',eli('/login.html'),function(req,res){
	res.send(req.user);
});

route.post('/token',passport.authenticate('local'),function(req,res){
	AuthToken.create({
		token:uid2(20),
		userId:req.user.id
	}).then(function(authtoken){
		res.send({
			token: authtoken.token
		})
	})
});

module.exports = route;