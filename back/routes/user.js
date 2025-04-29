const express = require('express')
const router = express.Router();
const UserController = require('../controllers/user')
const {verifyJWT} = require('../middlewares/verifyJWT')
router.get('/getUserDocuments', verifyJWT, UserController.getUserDocuments)

module.exports = router