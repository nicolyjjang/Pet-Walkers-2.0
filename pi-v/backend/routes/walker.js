const express = require('express');
const router = express.Router();
const postWalker  = require('../controller/walker');
const getWalkerId  = require('../controller/walker');

router.post("/walker", postWalker);

router.get("/walker/:id", getWalkerId);

module.exports = router;
