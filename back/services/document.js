const Document = require('../models/document');
const User = require('../models/user')
const {spawn} = require('child_process')
const { CohereClient, CohereClientV2} = require('cohere-ai');
const deepl = require('deepl-node');
require('dotenv').config()

async function getDocument(userId, docId){
    const user = await User.findById(userId).populate('documents').exec()
    return user.documents.find(doc => doc._id.toString() === docId)
}

async function createDocument(userId, title, content){
    //summarize the text to improve search speed in the future
    const summary = cohereChat("Summarize the following text very shortly:", content)
    // Create a new document with provided title and content
    const document = new Document({ title, content, summary });
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

async function summarize(userId, docId){
    document = await getDocument(userId, docId)
    return cohereChat("Summarize the following text very shortly:", document.content )
}
async function cohereChat(message, document){
    const cohere = new CohereClientV2({
        token: process.env.COHERE_API_KEY
    });
    const response = await cohere.chat({
        model: 'command-a-03-2025',
        messages: [
            { role: 'user', content: message }
        ],
        documents: [document]
    });
    return response.message.content[0].text
}

module.exports = {
    getDocument,
    createDocument,
    searchDocuments,
    deepSearch,
    translate,
    summarize,
    cohereChat
}