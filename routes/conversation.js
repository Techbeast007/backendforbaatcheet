const express = require('express');
const conversationController = require('../controllers/conversation');
const getConvo = require('../controllers/getConversation')

const router = express.Router();

router.post('/api/generate-text', conversationController.generateText);
router.get('/api/getConvo', getConvo.getConvo);


module.exports = router;