const Document = require('../models/document');
const User = require('../models/user')
const {spawn} = require('child_process')
const { CohereClient, CohereClientV2} = require('cohere-ai');
const deepl = require('deepl-node');
const {Error} = require("mongoose");
require('dotenv').config()

async function getDocument(userId, docId){
    const user = await User.findById(userId).populate('documents').exec()
    return user.documents.find(doc => doc._id.toString() === docId)
}

async function createDocument(userId, title, content){
    //summarize the text to improve search speed in the future
    const summary = await cohereChat("Summarize the following text very shortly:", content)
    // Create a new document with provided title and content
    const document = new Document({ title, content, summary });
    await document.save()
    await User.findByIdAndUpdate(userId, {$push: {documents: document._id}})

    return document;
}

async function searchDocuments(userId, query) {
    const user = await User.findById(userId)
        .populate({ path: 'documents' })
        .exec();

    const documents = user.documents;

    if (!query)
        return documents
    console.log("after getting documents: " + documents);

    const titles = documents.map(doc => doc.title);
    const semanticSearch = spawn('python', ['./scripts/semanticSearch.py']);
    console.log("after calling to semanticSearch");

    semanticSearch.stdin.write(JSON.stringify({
        texts: titles,
        query: query
    }));
    semanticSearch.stdin.end();
    console.log("after closing python input stream");

    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';

        semanticSearch.stdout.on('data', data => {
            stdout += data.toString();
        });

        semanticSearch.stderr.on('data', data => {
            stderr += data.toString();
        });

        semanticSearch.on('close', code => {
            console.log("on closing python's output stream");

            if (stderr) {
                console.error(stderr)
                return reject(new Error('Invalid JSON from semantic search script:\n' + stderr));
            }

            try {
                const parsed = JSON.parse(stdout);
                const topDocuments = parsed.map(d => documents[d.index]);
                console.log("documents:\n", topDocuments);
                resolve(topDocuments);
            } catch (err) {
                console.error("error:\n" + err)
                reject(new Error('Failed to parse JSON:\n' + err.message));
            }
        });
    });
}


async function deepSearch(userId, query){
    console.log("start service/deepSearch")
    const allDocuments = (await User.findById(userId)
        .populate({path: 'documents'})
        .exec())
        .documents
    const user = await User.findById(userId).populate('documents')
    const documents = user.documents.map(d => `${d.title}: ${d.summary}`);
    if (!query){
        return allDocuments
    }
    const cohere = new CohereClient({token: process.env.COHERE_API_KEY});

    const rerank = await cohere.v2.rerank({
        documents: documents,
        query: query,
        topN: 3,
        model: 'rerank-v3.5',
    });
    return rerank.results
        .filter(r=>r.relevanceScore > 0.5)
        .map(r=>allDocuments[r.index])
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

async function QA(userId, docId, question){
    document = await getDocument(userId, docId)
    if (!document)
        throw new Error("document not found")
    return cohereChat(question, document.content )
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
    cohereChat,
    QA
}