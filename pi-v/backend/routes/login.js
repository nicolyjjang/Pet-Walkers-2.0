const express = require('express');
const router = express.Router();
const { postLogin, getSession, postLogout } = require('../controller/login');

router.post("/auth", postLogin);
router.get("/session", getSession);
router.post("/logout", postLogout);

module.exports = router;
