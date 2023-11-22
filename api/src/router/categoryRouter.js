const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", categoryController.get);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.drop);
router.patch("/", categoryController.update);

module.exports = router;
