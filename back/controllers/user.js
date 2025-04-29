const User = require('../models/user')

async function getUserDocuments(req, res) {
    try {
        const user = await User.findById(req.userId).populate('documents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {getUserDocuments}