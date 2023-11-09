const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email'],
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Thought',
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const friendCount = UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

UserSchema.pre('remove', async function (next) {
	const parent = this;
	await Thought.deleteMany({ username: parent.username });
	next();
});

const User = model('User', UserSchema);

module.exports = User;
