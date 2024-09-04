const express = require('express');
const router = express.Router();
const postPedido  = require('../controller/pedido');

router.post("/", postPedido);

module.exports = router;
