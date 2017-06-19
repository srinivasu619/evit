const router = require("express").Router;
const passport = require('../../auth/passport');
const route = router();

route.use(passport.authenticate('bearer'));
route.use('/events',require('./events'));
route.use('/users',require('./users'));

module.exports = route;