const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('./auth/passport');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('keep it secret'));
app.use(expressSession({
	secret: 'keep it secret',
	resave: false,
	saveUnintialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/index'));
app.use('/', express.static(__dirname + "/public_static"));


// app.get('/',function(req,res){
// 	res.send("SUCCESSFUL REQUEST MADE");
// });

app.listen(2345,function(){
	console.log("Server Up and Running");
})