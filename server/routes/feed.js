const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const feedCrtl = require('../controllers/feed');


router.post('/', auth, feedCrtl.createFeed);
router.get('/', auth, feedCrtl.getAllFeed);

module.exports = router;