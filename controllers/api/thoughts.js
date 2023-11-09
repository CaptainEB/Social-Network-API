const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

// /api/thoughts
router.get('/', async (req, res) => {
	try {
		const thoughtData = await Thought.find();
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const thoughtData = await Thought.findById(id);
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	const { thoughtText, username, userId } = req.body;
	try {
		const thoughtData = await Thought.create({ thoughtText, username });
		const user = await User.findById(userId);
		user.thoughts.push(thoughtData._id);
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const { thoughtText, username } = req.body;
	try {
		const thought = await Thought.findById(id);
		if (!thought) return res.status(404).json({ message: 'No thought with this id!' });
		if (thoughtText) thought.thoughtText = thoughtText;
		if (username) thought.username = username;
		const thoughtData = await thought.save();
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const thoughtData = await Thought.findByIdAndDelete(id);
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/:thoughtId/reactions', async (req, res) => {
	const id = req.params.thoughtId;
	const { reactionBody, username } = req.body;
	try {
		const thought = await Thought.findById(id);
		if (!thought) return res.status(404).json({ message: 'No thought with this id!' });
		thought.reactions.push({ reactionBody, username });
		const thoughtData = await thought.save();
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
	const thoughtId = req.params.thoughtId;
	const reactionId = req.params.reactionId;
	try {
		const thought = await Thought.findById(thoughtId);
		if (!thought) return res.status(404).json({ message: 'No thought with this id!' });
		const reaction = thought.reactions.id(reactionId);
		if (!reaction) return res.status(404).json({ message: 'No reaction with this id!' });
		reaction.remove();
		const thoughtData = await thought.save();
		res.status(200).json(thoughtData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
