const {
    setReport,
    getReport,
    checkVideo
} = require("../controllers/proctor.js");

// const verifyToken = require("../middleware/auth.js");
const express = require("express")
const router = express.Router();

// Read
router.get("/setReport", setReport);
router.get("/getReport", getReport);
router.get("/checkVideo", checkVideo);

module.exports = router;