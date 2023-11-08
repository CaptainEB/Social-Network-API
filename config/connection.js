const {connect , connection} = require('mongoose');

connect('mongodb://localhost:27017/social-network-api');

module.exports = connection;