const User = require("../models/user");

async function getUserDocuments(userId) {
        const user = await User.findById(userId).populate('documents');
        return user.documents
}

module.exports = {
    getUserDocuments
}