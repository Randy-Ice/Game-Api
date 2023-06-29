const express = require('express');
const router = express.Router();
const {getGames} = require('../Controllers/gameController');

router.get('/', getGames)

module.exports = router