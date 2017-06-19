const router = require("express").Router;

const route = router();
const Event = require('../../db/models').Event
const Invitee = require('../../db/models').Invitee;
const EventInvitee = require('../../db/models').EventInvitee;
route.get('/',function(req,res){
	//res.send("GETTING YOU ALL THE EVENTS");
	Event.findAll({
		// where:{
		// 	hostId:req.user.id
		// }
	})
	.then(function(events){
		res.send(events);
	})
	.catch(function(err){
		//console.log(err);
		res.send("ERROR IN RETRIEVING");
	})
});

route.get('/:id',function(req,res){
	Event.findOne({
		where:{
			id: req.params.id,
		//	hostId:req.user.id
		}
	})
	.then(function(event){
		if(!event){
			res.send("THERE IS NO SUCH EVENT");
		}
		res.send(event);
	})
	.catch(function(err){
		res.send(err);
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
		message:req.body.message,
		hostId:req.user.id
	}).then(function(event){
		if(req.body.invitees)
		{
			let invitees = req.body.invitees.split(';');
			invitees =invitees.map(function(item){
				return {email: item.trim()};
			});
			Invitee.bulkCreate(invitees,{
				ignoreDuplicates: true
			})
			.then(function(invitees){
				let eventInvitees = invitees.map(function(item){
					return {
						eventId: event.id,
						inviteeId: item.id 
					}
				});
				EventInvitee.bulkCreate(eventInvitees,{
					ignoreDuplicates: true
				}).then(function(){
					res.send(event)
				})
			})
		}
		else
		{
			res.send(event);
		}
	}).catch(function(err){
		//console.log('err');
		res.send('There was an error');
	})
});

route.put('/:id',function(req,res){
	// console.log("\n\n\n\n"+req.body.title);
	// console.log("\n"+req.body.message);
	// console.log("\n"+req.body.startTime);
	// console.log("\n"+req.body.endTime);
	// console.log("\n"+req.body.venue);
	Event.update({
            title: req.body.title,
            message: req.body.message,
            startTime: req.body.startTime ? new Date(req.body.startTime) : undefined,
            endTime: req.body.endTime ? new Date(req.body.endTime) : undefined,
            imgUrl: req.body.imgUrl,
            venue: req.body.venue,
        },
        {
            where: {
                id: req.params.id,
                hostId: req.user.id
            }
        })
		.then((updatedEvent) => {
            if (updatedEvent[0] == 0) {
                return res.status(403).send('Event does not exist, or you cannot edit it')
            } else {
                res.status(200).send('Event successfully edited')
            }
        })
});

route.get('/:id/invitees',function(req,res){
	// console.log('\n\n\n\n\n\n\n\n'+req.params.id);
	// console.log('\n\n\n\n\n\n\n\n'+req.user.id);
	 EventInvitee.findAll({
        where: {
            eventId: req.params.id,
        	'$event.hostId$': req.user.id
        },
        include: [{
            model: Invitee,
            as: 'invitee',
            attributes: ['id', 'email']
        }, {
            model: Event,
            as: 'event',
            attributes: ['id', 'hostId']
        }]
    }).then(function(info){
		res.send(info);
	})
});

module.exports = route;