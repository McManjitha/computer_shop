const Joi = require("joi");
const Attribute = require("../models/Attribute");
const Image = require("../helpers/image");
const String = require("../helpers/string");
const { url } = require("../config/server");

/**********************************************************/
/*                     Get Attributes                     */
/**********************************************************/
const get = async (req, res) => {
    try {
        const attributes = await Attribute.find(
            {},
            {
                _id: 0,
                id: "$_id",
                title: 1,
                type: 1,
                options: 1,
            }
        );

        res.json(attributes);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                   Create Attribute                      */
/**********************************************************/

const create = async (req, res) => {
    const createAttributeSchema = Joi.object({
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
        type: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid type",
            "any.required": "Type is required",
            "string.empty": "Type must not be empty",
        }),

        options: Joi.string().allow(null),
    });

    const { error, value } = createAttributeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    let data = ({ title, type, options } = value);

    if (type == "option") {
        if (!options) {
            return res.status(400).json({ message: "Options are required" });
        }

        try {
            options = JSON.parse(options);
            if (options.length == 0) {
                return res
                    .status(400)
                    .json({ message: "Atleast one option is required" });
            }

            data.options = options;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "server error" });
            // JSON parse error
        }
    }

    try {
        const newAttribute = new Attribute(data);

        await newAttribute.save();

        res.status(200).json({
            message: "Attribute added successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Update Attribute                      */
/**********************************************************/

const update = async (req, res) => {
    const updateAttributeSchema = Joi.object({
        id: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid id",
            "any.required": "Id is required",
            "string.empty": "Id must not be empty",
        }),
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
        type: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid type",
            "any.required": "Type is required",
            "string.empty": "Type must not be empty",
        }),

        options: Joi.string().allow(null),
    });

    const { error, value } = updateAttributeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    let data = ({ id, title, type, options } = value);

    if (type == "option") {
        if (!options) {
            return res.status(400).json({ message: "Options are required" });
        }

        try {
            options = JSON.parse(options);
            if (options.length == 0) {
                return res
                    .status(400)
                    .json({ message: "Atleast one option is required" });
            }

            data.options = options;
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "server error" });
            // JSON parse error
        }
    }

    try {
        const result = await Attribute.findOneAndUpdate(
            { _id: id },
            { $set: data }
        );

        return res
            .status(200)
            .json({ message: "Attribute updated succesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Delete Attribute                      */
/**********************************************************/

const drop = async (req, res) => {
    const id = req.params.id;
    try {
        const attribute = await Attribute.findOne({ _id: id });

        if (attribute) {
            const result = await Attribute.deleteOne({ _id: id });

            return res
                .status(200)
                .json({ message: "Attribute deleted successfully" });
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
