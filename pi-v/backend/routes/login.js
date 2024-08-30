const express = require('express');
const router = express.Router();
const { postLogin, getSession } = require('../controller/login');

router.post("/auth", postLogin);
router.get("/session", getSession);

module.exports = router;
