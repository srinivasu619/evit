/**
 * Created by USER on 16-Jun-17.
 */
const route = require('express').Router();
const User = require('../../db/models').User;
route.get('/',function (req,res) {
    User.findAll().then(function (users) {
        res.send(users);
    }).catch(function (err) {
        res.send("ERROR WHILE RETRIEVING ");
    });
});
route.get('/:id',function (req,res) {
    if (isNaN(parseInt(req.params.id)))
    {
        return res.send("Not a Valid User Id");
    }
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then(function (user) {
        if(!user)
        {
            return res.send('User doesnot exist');
        }
        res.send(user);
    }).catch(function (err) {
        res.send("ERROR WHILE RETRIEVING ");
    })
});

module.exports = route;