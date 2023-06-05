const {
    login
} = require("../controllers/auth.js");

// const verifyToken = require("../middleware/auth.js");
const express = require("express")
const router = express.Router();

// Read
router.get("/login", login);
module.exports = router;