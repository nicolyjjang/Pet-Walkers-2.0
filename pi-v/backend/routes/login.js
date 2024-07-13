const express = require('express');
const router = express.Router();
const postLogin = require('../controller/login');

router.post("/login", postLogin);

module.exports = router;
