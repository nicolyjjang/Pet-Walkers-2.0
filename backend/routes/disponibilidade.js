const express = require('express');
const router = express.Router();
const { postDisponibilidade, getDisponibilidade }  = require('../controller/disponibilidade');

router.post("/", postDisponibilidade);
router.get("/:id", getDisponibilidade);

module.exports = router;
