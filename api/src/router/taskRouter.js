const express = require("express");
const taskController = require("../controllers/taskController");
const verify = require("../middleware/auth");

const router = express.Router();

router.post("/", taskController.create);

router.get("/", taskController.get);

router.patch("/", taskController.update);

router.delete("/:id", taskController.drop);

module.exports = router;
