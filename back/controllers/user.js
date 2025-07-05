const User = require('../models/user')
const UserServices = require('services/user')

async function getUserDocuments(req, res) {
    try {
        const res = await UserServices.getUserDocuments(req.userId)
        res.status(200).json(res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getUserDocuments
}