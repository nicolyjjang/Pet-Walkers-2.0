const express = require('express');
const router = express.Router();
const { postCliente, getCliente, atualizaCliente } = require('../controller/cliente');

router.get("/user/:id", getCliente);
router.post("/", postCliente);
router.post("/updateCliente", atualizaCliente);


module.exports = router;
