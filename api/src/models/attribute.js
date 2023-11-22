const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        type: { type: String, required: true },
        value: { type: Number },
        options: { type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Attribute", attributeSchema);
