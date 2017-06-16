const router = require("express").Router;

const route = router();
const Event = require('../../db/models').Event;

route.get('/',function(req,res){
	//res.send("GETTING YOU ALL THE EVENTS");
	Event.findAll()
	.then(function(events){
		res.send(events);
	})
	.catch(function(err){
		console.log(err);
		res.send("ERROR IN RETRIEVING");
	})
});

route.post('/new',function(req,res){
	if (!req.body.title) {
	   return res.status(403).send('Event cannot created without title')
    }
	Event.create({
		title:req.body.title,
		venue:req.body.venue,
		imgUrl:req.body.imgUrl,
		startTime:new Date(req.body.startTime),
		endTime:new Date(req.body.endTime),
		message:req.body.message
	}).then(function(event){
		res.send(event);
	}).catch(function(err){
		console.log('err');
		res.send('There was an error');
	})
});

module.exports = route;