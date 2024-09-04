const express = require('express');
const router = express.Router();
const postPagamento  = require('../controller/pagamento');

router.post("/", postPagamento);

module.exports = router;
