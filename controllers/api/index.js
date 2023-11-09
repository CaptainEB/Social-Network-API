const router = require('express').Router();
const thoughtsRoute = require('./thoughts');
const usersRoute = require('./users');


router.use('/thoughts', thoughtsRoute);
router.use('/users', usersRoute);

module.exports = router;