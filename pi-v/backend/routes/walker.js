const express = require('express');
const router = express.Router();
const { postWalker, getWalker, atualizaWalker } = require('../controller/walker');

router.post("/", postWalker);
router.post("/updateWalker", atualizaWalker);
router.get("/user/:id", getWalker);

module.exports = router;
