import React, { useEffect, useState } from "react";
import Joi from "joi";
import { createCategory, updateCategory } from "../../../../http/category";
import { getAttributes } from "../../../../http/attribute";
import { Input, TagSelect, Image, Button } from "../../../../components/ui";
import { toast } from "react-toastify";

const CategoryModal = ({ handleClose, selectedCategory }) => {
    const inputDataStructure = {
        title: {
            key: "title",
            label: "Title",
            data: "",
            type: "text",
            isValid: true,
            error: "",
            validation: Joi.string()
                .required()
                .empty()
                .min(3)
                .max(20)
                .messages({
                    "string.base": "Please enter a valid title",
                    "any.required": "Title is required",
                    "string.empty": "Title must not be empty",
                    "string.min": "Title must be at least 3 characters long",
                    "string.max": "Title must be at most 20 characters long",
                }),
        },

        img: {
            key: "img",
            label: "Image",
            data: [],
            isValid: true,
            error: "",
            validation: Joi.array().messages({
                "any.required": "Image is required",
            }),
        },

        attributes: {
            key: "attributes",
            label: "Applicable attributes",
            data: [],
            optList: [],
            error: null,
            validation: Joi.array().messages({
                "any.required": "attributes is required",
            }),
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

    useEffect(() => {
        const buildForm = async () => {
            let input_list = { ...inputs };
            if (selectedCategory) {
                input_list.title.data = selectedCategory.title;
                input_list.img.data.push({
                    key: 0,
                    data: selectedCategory.img,
                });
                input_list.attributes.data = selectedCategory.attributes.map(
                    (attribute) => {
                        return attribute.id;
                    }
                );
            }
            try {
                const result = await getAttributes();

                const attributes = result.map((attribute) => {
                    return {
                        id: attribute.id,
                        title: attribute.title,
                        options: attribute.options,
                    };
                });

                input_list.attributes.optList = attributes;
            } catch (e) {
                console.log(e);
            }
            setInputs(input_list);
            console.log(input_list);
        };

        buildForm();
    }, []);

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

        const formData = new FormData();

        if (inputs.img.data.length == 0) {
            toast.error("Image is required!");
            return;
        }

        if (!validate(["title"])) {
            toast.error("Title is required!");
            return;
        }

        formData.append("title", inputs.title.data);
        formData.append("attributes", JSON.stringify(inputs.attributes.data));

        formData.append("img", inputs.img.data[0].data);

        try {
            if (selectedCategory) {
                formData.append("id", selectedCategory.id);

                const result = await updateCategory(formData);
                toast.success("Category updated successfully!");
            } else {
                const result = await createCategory(formData);
                toast.success("Category created successfully!");
            }

            handleClose();
        } catch (e) {
            toast.error(e);
        }
    };

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg font-medium leading-6 text-gray-900"
                                    id="modal-title"
                                >
                                    {!selectedCategory && "Create new "}
                                    {selectedCategory && "Edit "}Category
                                </h3>
                                <div className="mt-2">
                                    <Input
                                        input={inputs.title}
                                        handleChange={handleChange}
                                    />

                                    <Image
                                        input={inputs.img}
                                        handleChange={handleChange}
                                    />

                                    <TagSelect
                                        input={inputs.attributes}
                                        handleChange={handleChange}
                                    />

                                    <Button
                                        handleClick={handleSubmit}
                                        className="mt-6"
                                        text={
                                            selectedCategory ? "Edit" : "Create"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
