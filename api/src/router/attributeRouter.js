const express = require("express");
const attributeController = require("../controllers/attributeController");
const verify = require("../middleware/auth");

const router = express.Router();

router.get("/", attributeController.get);
router.post("/", attributeController.create);
router.patch("/", attributeController.update);
router.delete("/:id", attributeController.drop);

module.exports = router;
