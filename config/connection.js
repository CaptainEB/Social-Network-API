const { connect, connection } = require('mongoose');

// connect('mongodb://localhost:27017/social-network-api');

async function connectToDatabase() {
	try {
		await connect('mongodb://127.0.0.1:27017/social-network-api');
		console.log('Connected to the database');
	} catch (error) {
		console.error('Error connecting to the database:', error);
		throw error;
	}
}

connectToDatabase();

module.exports = connection;
