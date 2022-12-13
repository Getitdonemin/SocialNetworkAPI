// Express Router is required
const router = require('express').Router();

// setting our user and thoughts routes
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// adding /users to the route being created
router.use('/users', usersRoutes);

// adding /thoughts to the route being created
router.use('/thoughts', thoughtsRoutes);

// Exporting module router
module.exports = router;