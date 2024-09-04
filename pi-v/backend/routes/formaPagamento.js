const express = require('express');
const router = express.Router();
const postFormaPagamento  = require('../controller/formaPagamento');

router.post("/", postFormaPagamento);

module.exports = router;
