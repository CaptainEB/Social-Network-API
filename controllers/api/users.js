const router = require('express').Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

// /api/users
router.get('/', async (req, res) => {
	try {
		const userData = await User.find();
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const userData = await User.findById(id);
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	const { username, email } = req.body;
	try {
		const userData = await User.create({ username, email });
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { username, email } = req.body;
	try {
		const user = User.findById(id);
		if (!user) return res.status(404).json({ message: 'No user with this id!' });
		if (username) user.username = username;
		if (email) user.email = email;
		const userData = await user.save();
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const userData = await User.findByIdAndDelete(id);
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:userId/friends/:friendId', async (req, res) => {
	const id = req.params.userId;
	const friendId = req.params.friendId;
	try {
		const user = await User.findById(id);
		const friend = await User.findById(friendId);
		if (!user || !friend) return res.status(404).json({ message: 'No user with this id!' });
		user.friends.push(friend);
		const userData = await user.save();
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
	const id = req.params.userId;
	const friendId = req.params.friendId;
	try {
		const user = await User.findById(id);
		const friend = await User.findById(friendId);
		if (!user || !friend) return res.status(404).json({ message: 'No user with this id!' });
		user.friends.filter((friend) => friend._id !== friendId);
		const userData = await user.save();
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
