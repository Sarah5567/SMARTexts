const express = require('express')
const router = express.Router();
const DocumentController = require('../controllers/document')
const {verifyJWT}= require('../middlewares/verifyJWT')

router.get('/getDocument', verifyJWT, DocumentController.getDocument)
router.get('/searchDocuments', verifyJWT, DocumentController.searchDocuments)
router.post('/updateDocument', verifyJWT, DocumentController.updateDocument)
router.delete('/deleteDocument', verifyJWT, DocumentController.deleteDocument)

router.post('/createDocument', verifyJWT, DocumentController.createDocument)
router.post('/deepSearch', verifyJWT, DocumentController.deepSearch)
router.post('/translate', verifyJWT, DocumentController.translate )
router.post('generateInsights',verifyJWT,DocumentController.generateInsights)

module.exports = router