const express = require('express');
const router = express.Router();
const postNovidades  = require('../controller/blog');

router.post("/", postNovidades);

module.exports = router;
