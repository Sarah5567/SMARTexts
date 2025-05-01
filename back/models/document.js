const mongoose = require('mongoose')

const DocumentSchema   = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        // Store as HTML for text formatting (e.g., <b> for bold, <i> for italics)
        content: {
            type: String,
            required: true
        },

        summary: {
            type: String,
            required: true
        }
    },
    {
        // Enable timestamps for createdAt and updatedAt fields
        timestamps: true,
    })

module.exports = mongoose.model('Document', DocumentSchema)