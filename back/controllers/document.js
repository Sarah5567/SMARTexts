const DocumentService = require('../services/document')
const Document = require('../models/document')
const User = require("../models/user");
const { getInsightsFromText } = require('../services/document');


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
    console.log('userId: '+ userId)
    const {title, content} = req.body;
    console.log('title: ' + title)
    console.log('content: '+content)
    try {
        console.log(userId, title, content)
        const document = await DocumentService.createDocument(userId, title, content)
        return res.status(200).json(document);
    }
        // if occurred an error, returns the error message
    catch (error) {
        res.status(500).json({massage: error.massage})
    }

}

async function searchDocuments(req, res) {

    // Get the search query from the request query parameters
    const query = req.query.query
    // If no query is provided, return a 400 Bad Request error
    if (!query)
        return res.status(400).json({message: 'No query provided'})

    const userId = req.userId

    try {
        const results = await DocumentService.searchDocuments(userId, query)
        return res.status(200).json(JSON.parse(results))

    } catch (err) {
        // Handle unexpected errors
        return res.status(500).json({message: err.message})
    }
}

async function deepSearch(req, res) {
    // Get the documents to search from the request body
    const documents = req.body.documents
    // If no documents are provided, return a 400 Bad Request error
    if (!documents)
        return res.status(400).json({message: 'Documents is required'})

    // Get the search query from the request query parameters
    const query = req.query.query
    // If no query is provided, return a 400 Bad Request error
    if (!query)
        return res.status(400).json({message: 'Query is required'})

    try {
        const results = await DocumentService.deepSearch(documents, query)
        return res.status(200).json({results: results})
    } catch (err) {
        // Handle unexpected errors
        return res.status(500).json({message: err.message})
    }
}

const updateDocument = async (req, res) => {
    try {
        const { id, title, content } = req.body;  // מקבלים את הנתונים החדשים מה-body

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
        await document.save();

        res.status(200).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.body;

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

        await Document.findByIdAndDelete(id);
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

const generateInsights = async (req, res) => {
    const { documentId } = req.body;

    try {
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const insights = await getInsightsFromText(document.content);

        // עדכון המסמך עם התובנות אם רוצים
        document.summarize = insights;
        await document.save();

        res.status(200).json({ insights });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    generateInsights,
    deleteDocument,
    updateDocument,
    getDocument,
    createDocument,
    searchDocuments,
    deepSearch,
    translate
}