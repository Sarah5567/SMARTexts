const DocumentService = require('../services/document')
const DocumentModel = require('../models/document')
const User = require("../models/user");
const path = require('path');
const PDFDocument = require('pdfkit'); // אם תבחרי PDF
const { Document, Packer, Paragraph } = require('docx'); // אם תבחרי DOCX
const stream = require('stream');


async function getDocument(req, res) {
    const userId = req.userId
    const docId = req.query.id
    try {
        const document = await DocumentService.getDocument(userId, docId)
        if (!document)
            return res.status(404).json({message: `document ${docId} not found`})
        res.status(200).json(document)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function createDocument(req, res) {
    const userId = req.userId
    const {title, content} = req.body;
    try {
        // Create a new document with provided title and content
        const document = await DocumentService.createDocument(userId, title, content)
        return res.status(200).json(document);
    }
        // if occurred an error, returns the error message
    catch (error) {
        res.status(500).json({massage: error.massage})
    }

}

async function searchDocuments(req, res) {
    console.log("working on it...")
    // Get the search query from the request query parameters
    const query = req.query.query

    const userId = req.userId

    try {
        const results = await DocumentService.searchDocuments(userId, query)
        return res.status(200).json(results)

    } catch (err) {
        // Handle unexpected errors
        return res.status(500).json({message: err.message})
    }
}

async function deepSearch(req, res) {
    // Get the search query from the request query parameters
    const query = req.body.query
    const userId = req.userId

    try {
        // Get the results from the services layer
        const results = await DocumentService.deepSearch(userId, query)
        return res.status(200).json({results: results})
    } catch (err) {
        // Handle unexpected errors
        return res.status(500).json({message: err.message})
    }
}

const updateDocument = async (req, res) => {
    try {
        const { id, title, content } = req.body;

        const user = await User.findById(req.userId).populate('documents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const document = user.documents.find(doc => doc._id.toString() === id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        document.title = title;
        document.content = content;
        document.summary = await DocumentService.cohereChat("Summarize the following text very shortly:", content)
        await document.save();

        res.status(200).json(document);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.userId).populate('documents');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const document = user.documents.find(doc => doc._id.toString() === id);
        console.log("Found document:", document);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        user.documents.pull(id);

        await user.save();

        await DocumentModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

const translate = async (req, res) =>{
    const {text, language} = req.body
    if(!text || !language)
        return res.status(400).json({"message": "required arguments not provided."})
    const VALID_LANGUAGES = [
        "BG", "CS", "DA", "DE", "EL", "EN-GB", "EN-US",
        "ES", "ET", "FI", "FR", "HU", "ID", "IT", "JA",
        "KO", "LT", "LV", "NB", "NL", "PL", "PT-BR",
        "PT-PT", "RO", "RU", "SK", "SL", "SV", "TR",
        "UK", "ZH"
    ];
    let upperLanguage = language.toUpperCase()
    if (!VALID_LANGUAGES.includes(upperLanguage))
        return res.status(400).json({"message": "language not valid"})
    try {
        const result = await DocumentService.translate(text, upperLanguage)
        return res.status(200).json({"text": result})
    }
    catch(err){
        res.status(500).json({"error": err.toString()})
        console.error(err)
    }
}

const summarize = async (req, res) => {
    const userId = req.userId
    const docId = req.body.id
    try {
        const summary = await DocumentService.summarize(userId, docId)
        res.status(200).json(summary)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const question = async (req, res) =>{
    const userId = req.userId
    const {docId, question} = req.body
    try {
        const answer = await DocumentService.QA(userId, docId, question)
        res.status(200).json(answer)
    } catch (error) {
        if(error.message === "document not found")
            res.status(404).json({message: error.message})
        res.status(500).json({message: error.message})
    }
}
const generateInsights = async (req, res) => {
    const { documentId } = req.body;

    try {
        const document = await DocumentModel.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const insights = await DocumentService.getInsightsFromText(document.content);

        // עדכון המסמך עם התובנות אם רוצים
        document.summarize = insights;
        await document.save();

        res.status(200).json({ insights });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    deleteDocument,
    updateDocument,
    getDocument,
    createDocument,
    searchDocuments,
    deepSearch,
    translate,
    summarize,
    question,
    generateInsights
}