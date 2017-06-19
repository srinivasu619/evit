//Authentication module which defines
//authentication techniques
//passport module authentication api just like devise
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../db/models').User;
const AuthToken = require('../db/models').AuthToken;

passport.serializeUser(function(user,done){
	console.log('serializing User:' + user.id);
	done(null,user.id);
});

passport.deserializeUser(function(userKey,done){
	console.log('serializing User:' + userKey);
	User.findByPrimary(userKey)
	.then(function(user){
		done(null,user);
	})
	.catch(function(user){
		done(err);
	})
});

passport.use(new LocalStrategy(
	function(username,password,done){
		User.findOne({
			where:{
				username: username,
				password: password
			}
		}).then(function(user){
			if(!user)
			{
				return done(null,false,{message:"Username or Password wrong"});
			}
			return done(null,user);
		})
		.catch(function(err){
			done(err);
		})
	}
));

passport.use(new BearerStrategy(function(token,done){
	AuthToken.findOne({
		where:{
			token:token
		},
		include: [User]
	}).then(function(token){
		if(!token){
			return done(null,false,{message:"INVALID TOKEN"});
		}
		return done(null,token);
	})
	.catch(function(err){
		done(err)
	});
}));

module.exports = passport;