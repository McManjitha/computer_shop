const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        img: { type: String, required: true },
        attributes: { type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
