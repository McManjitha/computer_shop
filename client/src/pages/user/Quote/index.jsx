import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi";

import DetailSection from "./DetailsSection";
import SummerySection from "./SummerySection";
import NavBar from "../../../components/NavBar";

import { createOrder } from "../../../http/order";

import { emptyCart } from "../../../redux/actions/cartActions";

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const productCount = cart.length;

    console.log(user);

    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    };

    const inputDataStructure = {
        name: {
            key: "name",
            label: "Name",
            data: user.data.name,
            type: "text",
            error: null,
            validation: Joi.string().min(3).max(30).required(),
        },
        phoneNumber: {
            key: "phoneNumber",
            label: "Phone number",
            data: user.data.phoneNumber,
            type: "text",
            error: null,
            validation: Joi.string()
                .required()
                .empty()
                .pattern(/^[0-9]{10}$/)
                .messages({
                    "string.base": "Please enter a valid phone number",
                    "any.required": "Phone number is required",
                    "string.empty": "Phone number must not be empty",
                    "string.pattern.base":
                        "Phone number must be 10 digits in length",
                }),
        },
        address: {
            key: "address",
            label: "Delivery address",
            data: "",
            type: "text",
            rows: 5,
            error: null,
            validation: Joi.string()
                .required()
                .empty()
                .min(5)
                .max(100)
                .messages({
                    "string.base": "Please enter a valid address",
                    "any.required": "Address is required",
                    "string.empty": "Address must not be empty",
                    "string.min": "Address must be at least 5 characters long",
                    "string.max": "Address must be at most 100 characters long",
                }),
        },
        pickupMethod: {
            key: "pickupMethod",
            label: "Pickup Method",
            data: "",
            optList: [
                { id: "pickup", title: "Pick from shop", selected: false },
                { id: "delivery", title: "Deliver it", selected: false },
            ],
            type: "card",
            error: null,
            validation: Joi.string().valid("pickup", "delivery").required(),
        },
        paymentMethod: {
            key: "paymentMethod",
            label: "Payment Method",
            data: "",
            optList: [
                { id: "cod", title: "Cash On Delivery", selected: false },
                { id: "ipg", title: "Pay by Card", selected: false },
            ],
            type: "card",
            error: null,
            validation: Joi.string().valid("cod", "ipg").required(),
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleChange = (data, input) => {
        input.data = data;

        const { error } = input.validation.validate(data);
        input.error = error ? error.details[0].message : null;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const validate = (keys) => {
        let input_list = { ...inputs };

        let valid = true;

        keys.forEach((key) => {
            let input = input_list[key];

            const { error } = input.validation.validate(input.data);

            if (error) {
                input.error = error.details[0].message;
                valid = false;
            } else {
                input.error = null;
            }
        });

        setInputs(input_list);
        return valid;
    };

    const handleSubmit = async () => {
        const event = window.event;
        event.preventDefault();

        if (cart.length == 0) {
            toast.error("cart is empty!");
            return;
        }

        const formData = new FormData();

        if (inputs.pickupMethod.data == "delivery") {
            if (!validate(["address", "phoneNumber", "name"])) {
                toast.error("Please complete delivery details!");
                return;
            } else {
                formData.append("name", inputs.name.data);
                formData.append("phoneNumber", inputs.phoneNumber.data);
                formData.append("address", inputs.address.data);
            }
        }

        if (!validate(["pickupMethod", "paymentMethod"])) {
            toast.error("Please complete the form!");
            return;
        }

        const cartData = cart.map((item) => {
            return { id: item.id, count: item.count };
        });

        formData.append("pickupMethod", inputs.pickupMethod.data);
        formData.append("paymentMethod", inputs.paymentMethod.data);
        formData.append("cartData", JSON.stringify(cartData));
        formData.append("userId", user.data.id);

        try {
            const result = await createOrder(formData);
            toast.success("Order placed successfully!");

            handleEmptyCart();
        } catch (e) {
            toast.error(e);
        }
    };

    return (
        <div>
            <NavBar />
            <section
                className="container mx-auto mt-[100px] grid 
                            grid-cols-1 lg:grid-cols-9"
            >
                <DetailSection inputs={inputs} handleChange={handleChange} />
                <SummerySection handleSubmit={handleSubmit} />
            </section>
        </div>
    );
};

export default Checkout;
