const express = require('express');
const router = express.Router();
const postContato  = require('../controller/contato');

router.post("/contato", postContato);

module.exports = router;
