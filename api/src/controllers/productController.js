const Joi = require("joi");
const { ObjectId } = require("mongodb");

const Product = require("../models/product");
const Category = require("../models/category");
const Image = require("../helpers/image");
const { url } = require("../config/server");

const category = require("../models/category");
const Attribute = require("../models/Attribute");

/**********************************************************/
/*                   GET ALL PRODUCTS                     */
/**********************************************************/

const get = async (req, res) => {
    try {
        const catid = req.params.catid;

        const pipeline = [
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                id: "$_id",
                                title: 1,
                                attributes: 1,
                            },
                        },
                        {
                            $project: {
                                id: 1,
                                title: 1,
                                attributes: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$category",
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    title: 1,
                    price: 1,
                    discount: 1,
                    category: {
                        id: "$category.id",
                        title: "$category.title",
                    },
                    availability: 1,
                    images: {
                        $map: {
                            input: "$images",
                            in: {
                                $concat: [url, "/public/img/", "$$this"],
                            },
                        },
                    },
                },
            },
        ];

        if (catid) {
            const category = new ObjectId(catid);

            pipeline.splice(2, 0, {
                $match: {
                    "category.id": category,
                },
            });
        }

        const products = await Product.aggregate(pipeline);

        res.json(products);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                   CREATE PRODUCTS                      */
/**********************************************************/

const create = async (req, res) => {
    const createProductSchema = Joi.object({
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "Title is required",
            "string.empty": "Title must not be empty",
            "string.pattern.base": "Title must be 10 digits in size",
        }),
        category: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid category",
            "any.required": "Category is required",
            "string.empty": "Category must not be empty",
        }),

        price: Joi.number().integer().required().empty().min(0).messages({
            "number.base": "Please enter a valid price",
            "number.integer": "Price must be an integer",
            "any.required": "Price is required",
            "number.min": "Price must be greater than zero",
            "any.empty": "Price must not be empty",
        }),
        discount: Joi.number()
            .integer()
            .required()
            .empty()
            .min(0)
            .max(100)
            .messages({
                "number.base": "Please enter a valid discount",
                "number.integer": "Discount must be an integer",
                "any.required": "Discount is required",
                "number.min": "Discount must be greater than zero",
                "number.max": "Discount must be lower than hundred",
                "any.empty": "Discount must not be empty",
            }),
        availability: Joi.string()
            .required()
            .empty()
            .valid("true", "false")
            .messages({
                "number.base": "Please specify the avalability",
                "any.required": "Discount is required",
                "any.empty": "Discount must not be empty",
            }),
    }).unknown(true);

    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    let attributes;

    try {
        result = await Category.findOne({ _id: value.category });
        if (!result) res.status(400).json({ message: "Category not found" });

        const objectIds = result.attributes.map((id) => ObjectId(id));

        attributes = await Attribute.find(
            { _id: { $in: objectIds } },
            { _id: 0, id: "$_id", title: 1 }
        ).lean();
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
    }

    const category = new ObjectId(value.category);

    const { title, price, discount, availability } = value;

    let images = [];

    if (req.files && req.files.img) {
        if (typeof req.files.img == "array") {
            for (const img of req.files.img) {
                const result = await Image.upload(img);
                images.push(result);
            }
        } else {
            const result = await Image.upload(req.files.img);
            images.push(result);
        }
    }

    let newData = {
        title,
        price,
        availability,
        discount,
        images,
        category,
        attributes: {},
    };

    attributes.forEach((attribute) => {
        const attributeId = attribute.id.toString();

        if ((attributeValue = req.body["attr-" + attributeId])) {
            newData.attributes[attributeId] = attributeValue;
        } else {
            res.status(400).json({ message: attribute.title + " is required" });
            return;
        }
    });

    try {
        const newProduct = new Product(newData);

        await newProduct.save();

        res.status(200).json({
            message: "Product added successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                    UPDATE PRODUCT                      */
/**********************************************************/

const update = async (req, res) => {
    const updateProductSchema = Joi.object({
        id: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid Id",
            "any.required": "Id is required",
            "string.empty": "Id must not be empty",
            "string.pattern.base": "Id must be 10 digits in size",
        }),
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "Title is required",
            "string.empty": "Title must not be empty",
            "string.pattern.base": "Title must be 10 digits in size",
        }),
        category: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid category",
            "any.required": "Category is required",
            "string.empty": "Category must not be empty",
        }),

        price: Joi.number().integer().required().empty().min(0).messages({
            "number.base": "Please enter a valid price",
            "number.integer": "Price must be an integer",
            "any.required": "Price is required",
            "number.min": "Price must be greater than zero",
            "any.empty": "Price must not be empty",
        }),
        discount: Joi.number()
            .integer()
            .required()
            .empty()
            .min(0)
            .max(100)
            .messages({
                "number.base": "Please enter a valid discount",
                "number.integer": "Discount must be an integer",
                "any.required": "Discount is required",
                "number.min": "Discount must be greater than zero",
                "number.max": "Discount must be lower than hundred",
                "any.empty": "Discount must not be empty",
            }),
        availability: Joi.string()
            .required()
            .empty()
            .valid("true", "false")
            .messages({
                "number.base": "Please specify the avalability",
                "any.required": "Discount is required",
                "any.empty": "Discount must not be empty",
            }),
        img: Joi.string().required().empty().allow(null).messages(),
    }).unknown(true);

    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    let attributes;

    try {
        result = await Category.findOne({ _id: value.category });
        if (!result) res.status(400).json({ message: "Category not found" });

        const objectIds = result.attributes.map((id) => ObjectId(id));

        attributes = await Attribute.find(
            { _id: { $in: objectIds } },
            { _id: 0, id: "$_id", title: 1 }
        ).lean();
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
    }

    const category = new ObjectId(value.category);

    const { title, price, discount, availability } = value;

    let images = [];

    if (req.files && req.files.img) {
        if (typeof req.files.img == "array") {
            for (const img of req.files.img) {
                const result = await Image.upload(img);
                images.push(result);
            }
        } else {
            const result = await Image.upload(req.files.img);
            images.push(result);
        }
    }

    if (value.img) {
        if (typeof value.img == "array") {
            value.img.forEach((image) => {
                images.push(image.split("/").pop());
            });
        } else {
            images.push(value.img.split("/").pop());
        }
    }

    let newData = {
        title,
        price,
        availability,
        discount,
        images,
        category,
        attributes: {},
    };

    attributes.forEach((attribute) => {
        const attributeId = attribute.id.toString();

        if ((attributeValue = req.body["attr-" + attributeId])) {
            newData.attributes[attributeId] = attributeValue;
        } else {
            res.status(400).json({
                message: attribute.title + " is required",
            });
            return;
        }
    });

    try {
        const product = await Product.findOneAndUpdate(
            { _id: value.id },
            { $set: newData }
        );

        return res.status(200).json({ message: "Product updated succesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                     DELETE PRODUCT                     */
/**********************************************************/
const drop = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id });

        if (product) {
            const result = await Product.deleteOne({ _id: id });

            return res
                .status(200)
                .json({ message: "Product deleted successfully" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    get,
    create,
    update,
    drop,
};
