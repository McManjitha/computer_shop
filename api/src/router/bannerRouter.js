const express = require("express");
const taskController = require("../controllers/bannerController");
const verify = require("../middleware/auth");

const router = express.Router();

module.exports = router;
