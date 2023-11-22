const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: Object },
        discount: { type: Number, default: 0 },
        availability: { type: String, default: true },
        images: { type: Array },
        attributes: { type: Object },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
