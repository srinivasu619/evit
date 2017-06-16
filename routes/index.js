const router = require("express").Router;
const route = router();
const User = require('../db/models').User;
const passport = require('../auth/passport');
const eli = require("../auth/utils").eli;

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

route.get('/profile',eli('/login.html'),function(req,res){
	res.send(req.user);
})

route.get('/logout',function (req,res) {
	req.user=null;
	req.logout();
	req.session.destroy(function () {
		res.redirect('/login.html');
    })
})
module.exports = route;