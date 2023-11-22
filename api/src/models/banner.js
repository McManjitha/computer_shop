const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        user: { type: Object, required: true },
        products: { type: Array, required: true },
        total: { type: Number, required: true },
        status: { type: String, default: "created" },
        paymentMethod: { type: String },
        pickupMethod: { type: String },
        name: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
