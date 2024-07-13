const express = require('express');
const router = express.Router();
const postWalker  = require('../controller/walker');

router.post("/walker", postWalker);

module.exports = router;
