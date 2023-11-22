const express = require("express");
const userController = require("../controllers/quoteController");
const verify = require("../middleware/auth");

const router = express.Router();

module.exports = router;
