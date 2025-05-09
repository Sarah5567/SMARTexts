const Document = require('../models/document');
const User = require('../models/user')
const {spawn} = require('child_process')
const { CohereClient } = require('cohere-ai');
const deepl = require('deepl-node');
require('dotenv').config()
const axios = require('axios');


async function getDocument(userId, docId){
    const user = await User.findById(userId).populate('documents').exec()
    return user.documents.find(doc => doc._id.toString() === docId)
}

async function createDocument(userId, title, content){
        // Create a new document with provided title and content
        const document = new Document({ title, content });
        await document.save()
        await User.findByIdAndUpdate(userId, {$push: {documents: document._id}})

        return document;
}

async function searchDocuments(userId, query){
    // Find the user by ID and populate only the 'title' field of the related documents
    const documents = (await User.findById(userId)
        .populate({ path: 'documents', select: 'title' })
        .exec())
        .documents

    // Extract the titles from the user's documents
    const titles = documents.map(doc => doc.title)

    // Spawn a Python process to run the semantic search script
    const semanticSearch = spawn('python', ['./scripts/semanticSearch.py'])

    // Send the titles and the query to the Python script via stdin as JSON
    semanticSearch.stdin.write(JSON.stringify({
        texts: titles,
        query: query
    }))
    // Close the input stream
    semanticSearch.stdin.end()

    // Buffers to collect the script's standard output and error output
    let stdout = ''
    let stderr = ''

    // Listen for data from the script's stdout (normal output)
    semanticSearch.stdout.on('data', function (data){
        stdout += data.toString()
    })

    // Listen for data from the script's stderr (errors)
    semanticSearch.stderr.on('data', (data) => {
        stderr += data.toString()
    });

    // Handle the close event when the script finishes execution
    semanticSearch.on('close', (code)=>{

        // If there was any error output, return a 500 Internal Server Error
        if(stderr)
            throw new Error('Invalid JSON from semantic search script')
        else
            // Attempt to parse the script's output as JSON and return it
            return JSON.parse(stdout)
    })
}

async function deepSearch(documents, query){

    const cohere = new CohereClient({token: process.env.COHERE_API_KEY});

    const rerank = await cohere.v2.rerank({
        documents: documents,
        query: query,
        topN: 3,
        model: 'rerank-v3.5',
    });
    return rerank.results
        .filter(r=>r.relevanceScore > 0.5)
        .map(r=>documents[r.index])
}

async function translate(text, language){

    const authKey = process.env.DEEPL_API_KEY
    const translator = new deepl.Translator(authKey);
    return await translator.translateText(text, null, language)
}


async function getInsightsFromText(text) {
    const prompt = `Given the following passage, provide 2 very short key insights or conclusions:\n\n${text}`;

    try {
        const response = await axios.post('https://api.cohere.ai/v1/generate', {
            model: 'command-r-plus',
            prompt: prompt,
            max_tokens: 200
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.COHERE_API_KEY_DASSI}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.generations[0].text;
    } catch (error) {
        console.error("Error from Cohere API:", error.response?.data || error.message);
        throw new Error('Failed to fetch insights from Cohere');
    }
}


module.exports = {
    getInsightsFromText,
    getDocument,
    createDocument,
    searchDocuments,
    deepSearch,
    translate
}