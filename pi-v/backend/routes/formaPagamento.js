const express = require('express');
const router = express.Router();
const { postFormaPagamento, getFormasPagamento }  = require('../controller/formaPagamento');

router.post("/", postFormaPagamento);
router.get("/:id", getFormasPagamento);

module.exports = router;
