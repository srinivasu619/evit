const express = require("express");
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api',require('./routes/api'));

app.get('/',function(req,res){
	res.send("SUCCESSFUL REQUEST MADE");
});

app.listen(2345,function(){
	console.log("Server Up and Running");
})