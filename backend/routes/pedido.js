const express = require('express');
const router = express.Router();
const { postPedido, getPedido }  = require('../controller/pedido');

router.post("/", postPedido);
router.get("/:id", getPedido);

module.exports = router;
