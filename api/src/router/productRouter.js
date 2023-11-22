const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.create);

router.get("/", productController.get);

router.get("/category/:catid", productController.get);

router.delete("/:id", productController.drop);

router.patch("/", productController.update);

module.exports = router;
