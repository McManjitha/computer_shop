const Joi = require("joi");
const { ObjectId } = require("mongodb");

const Category = require("../models/category");
const Attribute = require("../models/Attribute");
const Image = require("../helpers/image");
const String = require("../helpers/string");
const { url } = require("../config/server");

/**********************************************************/
/*                     Get Categories                     */
/**********************************************************/
const get = async (req, res) => {
    try {
        const category = await Category.aggregate([
            {
                $addFields: {
                    id: "$_id",
                    img: {
                        $concat: [url, "/public/img/", "$img"],
                    },
                },
            },
            {
                $lookup: {
                    from: "attributes",
                    localField: "attributes",
                    foreignField: "_id",
                    as: "attributes",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                id: "$_id",
                                title: 1,
                                type: 1,
                                options: 1,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    title: 1,
                    slug: 1,
                    img: 1,
                    attributes: 1,
                },
            },
        ]);
        res.json(category);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                  Get Category By ID                    */
/**********************************************************/
const getById = async (req, res) => {
    const categoryId = new ObjectId(req.params.id);

    try {
        const category = await Category.aggregate([
            {
                $match: {
                    _id: categoryId,
                },
            },
            {
                $addFields: {
                    id: "$_id",
                    img: {
                        $concat: [url, "/public/img/", "$img"],
                    },
                },
            },
            {
                $lookup: {
                    from: "attributes",
                    localField: "attributes",
                    foreignField: "_id",
                    as: "attributes",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                id: "$_id",
                                title: 1,
                                type: 1,
                                options: 1,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    title: 1,
                    slug: 1,
                    img: 1,
                    attributes: 1,
                },
            },
        ]);

        res.json(category[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

/**********************************************************/
/*                   Create Category                      */
/**********************************************************/

const create = async (req, res) => {
    const updateCategorySchema = Joi.object({
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
        attributes: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
    });

    const { error, value } = updateCategorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    if (!req.files || !req.files.img) {
        return res.status(400).json({ message: "Image not provided" });
    }

    let attributes = [];

    try {
        const attributeList = JSON.parse(value.attributes);
        attributes = attributeList.map((id) => new ObjectId(id));
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // JSON parse error
    }

    const img = await Image.upload(req.files.img);
    const slug = await String.clean(value.title);

    try {
        const newCategory = new Category({
            title: value.title,
            slug: slug,
            img: img,
            attributes: attributes,
        });

        await newCategory.save();

        res.status(200).json({
            message: "Category added successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Update Category                      */
/**********************************************************/

const update = async (req, res) => {
    const updateCategorySchema = Joi.object({
        id: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid id",
            "any.required": "id is required",
            "string.empty": "id must not be empty",
        }),
        title: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
        img: Joi.string().allow(null).messages({
            "any.required": "Image is required",
        }),
        attributes: Joi.string().required().empty().messages({
            "string.base": "Please enter a valid title",
            "any.required": "title is required",
            "string.empty": "title must not be empty",
        }),
    });

    const { error, value } = updateCategorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    if ((!req.files || !req.files.img) && !req.body.img) {
        return res.status(400).json({ message: "Image not provided" });
    }

    const slug = await String.clean(value.title);

    let newData = { title: value.title, slug: slug };

    const id = value.id;

    if (req.files && req.files.img) {
        newData.img = await Image.upload(req.files.img);
    } else {
        newData.img = req.body.img.split("/").pop();
    }

    let attributes = [];

    try {
        const attributeList = JSON.parse(value.attributes);
        attributes = attributeList.map((id) => new ObjectId(id));
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server error" });
        // JSON parse error
    }

    newData.attributes = attributes;

    try {
        const result = await Category.findOneAndUpdate(
            { _id: id },
            { $set: newData }
        );

        return res
            .status(200)
            .json({ message: "Category updated succesfully" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
        // database error
    }
};

/**********************************************************/
/*                   Delete Category                      */
/**********************************************************/

const drop = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({ _id: id });

        if (category) {
            const result = await Category.deleteOne({ _id: id });

            return res
                .status(200)
                .json({ message: "Category deleted successfully" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    get,
    getById,
    create,
    update,
    drop,
};
