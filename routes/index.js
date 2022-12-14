// express router is reuired
const router = require('express').Router();

// importing all the api routes
const apiRoutes = require('./api');

// add prefix of `/api` to all of the api routes
router.use('/api', apiRoutes);

// 404 Status error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error....</h1>');
  });

// exporting module routes
module.exports = router;