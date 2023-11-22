import React, { useEffect, useState } from "react";
import Joi from "joi";
import { createAttribute, updateAttribute } from "../../../../http/attribute";
import { Input, Select, TagInput, Button } from "../../../../components/ui";
import { toast } from "react-toastify";

const AttributeModal = ({ handleClose, selectedAttribute }) => {
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

        type: {
            key: "type",
            label: "Attribute Type",
            data: "value",
            optList: [
                { id: "value", title: "Value" },
                { id: "option", title: "Option" },
            ],
            error: null,
            validation: Joi.string().valid("value", "option").messages({
                "any.required": "Type is required",
            }),
        },
        options: {
            key: "options",
            label: "Attribute Options",
            data: [],
            error: null,
            validation: Joi.array().min(1).messages({
                "array.min": "At least one option is required",
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
        if (selectedAttribute) {
            let input_list = { ...inputs };
            input_list.title.data = selectedAttribute.title;
            input_list.type.data = selectedAttribute.type;

            if (selectedAttribute.type == "option") {
                input_list.options.data = selectedAttribute.options;
            }

            setInputs(input_list);
        }
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

        console.log(inputs.options.data);

        if (!validate(["title", "type"])) {
            toast.error("Please complete required details!");
            return;
        }

        const formData = new FormData();

        if (inputs.type.data == "option") {
            if (!validate(["options"])) {
                toast.error("Please complete required details!");
                return;
            }
            formData.append("options", JSON.stringify(inputs.options.data));
        }

        formData.append("title", inputs.title.data);
        formData.append("type", inputs.type.data);

        try {
            if (selectedAttribute) {
                formData.append("id", selectedAttribute.id);

                const result = await updateAttribute(formData);
                toast.success("Attribute updated successfully!");
            } else {
                const result = await createAttribute(formData);
                toast.success("Attribute created successfully!");
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
                                    {!selectedAttribute && "Create new "}
                                    {selectedAttribute && "Edit "}Attribute
                                </h3>
                                <div className="mt-2">
                                    <Input
                                        input={inputs.title}
                                        handleChange={handleChange}
                                    />

                                    <Select
                                        input={inputs.type}
                                        handleChange={handleChange}
                                    />

                                    {inputs.type.data == "option" && (
                                        <TagInput
                                            input={inputs.options}
                                            handleChange={handleChange}
                                        />
                                    )}

                                    <Button
                                        handleClick={handleSubmit}
                                        className="mt-6"
                                        text={
                                            selectedAttribute
                                                ? "Edit"
                                                : "Create"
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

export default AttributeModal;
