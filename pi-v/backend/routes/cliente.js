const express = require('express');
const router = express.Router();
const { postCliente, getCliente } = require('../controller/cliente');

router.get("/", getCliente);
router.post("/cliente", postCliente);

module.exports = router;
