const express = require('express');
const { addComment } = require('../controllers/commentsController');
const router = express.Router();


router.post('/', addComment);

module.exports = router;
