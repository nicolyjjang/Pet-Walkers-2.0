const express = require('express');
const router = express.Router();
const postContato  = require('../controller/contato');

router.post("/", postContato);

module.exports = router;
