const express = require('express');
const router = express.Router();
const { postWalker, getWalker } = require('../controller/walker');

router.post("/", postWalker);
router.get("/user/:id", getWalker);

module.exports = router;
