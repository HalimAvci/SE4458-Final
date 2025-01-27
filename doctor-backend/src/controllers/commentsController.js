const Comment = require('../models/Comment');


exports.addComment = async (req, res) => {
    const { doctorId, comment } = req.body;

    if (!doctorId || !comment) {
        return res.status(400).json({ error: 'Doctor ID and comment are required.' });
    }

    try {
        const newComment = new Comment({ doctorId, comment });
        await newComment.save();
        res.status(201).json({ message: 'Comment saved successfully.' });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ error: 'Failed to save comment.' });
    }
};
