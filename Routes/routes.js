const express = require("express");
const router = express.Router();
const auth = require("../Controller/auth");
const verifyAuth = require("../Controller/auth-cont");

router.post("/user/signup", auth.signup);
router.post("/user/login", auth.login);

router.get("/user/check", verifyAuth, auth.checkauth);
router.get("/user/logout", verifyAuth, auth.logout);

module.exports = router;
