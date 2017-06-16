//C:\Program Files\MySQL\MySQL Server 5.7\bin

const Sequelize = require('sequelize');

const db= new Sequelize('eventman','eventadmin','eventpass',{
	host: 'localhost',
	dialect: 'mysql'
});
//Event Model
const Event = db.define('event',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true
	},
	title: Sequelize.STRING,
	venue: Sequelize.STRING,
	imgUrl: Sequelize.STRING,
	startTime: Sequelize.DATE,
	endTime: Sequelize.DATE,
	message: Sequelize.STRING
});
//created Event Model

//USER MODEL
const User = db.define('user',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true
	},
	username:{
		type:Sequelize.STRING,
		unique: true
	},
	email:Sequelize.STRING,
	password:Sequelize.STRING

});
//CREATED USER'S MODEL

//INVITEE MODEL:for the person who are invited
const Invitee = db.define('invitee',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true
	},
	email:{
		type:Sequelize.STRING,
		unique: true,
		index:true
	}
});

//CREATED INVITEE MODEL
//EVENT INVITEE (THROUGH MODEL)
const EventInvitee = db. define('eventinvitee',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true
	}
});
//CREATED EVENT INVITEE MODEL

//MAKING ASSOCIATIONS
Event.belongsTo(User,{
	foreignKey: 'hostId',
	as: 'host'
});
User.hasMany(Event,{
	foreignKey: 'hostId'
})

EventInvitee.belongsTo(Event);
Event.hasMany(EventInvitee);
EventInvitee.belongsTo(Invitee);
Invitee.hasMany(EventInvitee);
db.sync({force: false}).then(function(){
	console.log('Database is in sync');
})


module.exports ={
	Event,User,Invitee,EventInvitee
};