import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../../../http/product";
import { Input, Select, Image, Button } from "../../../../components/ui";
import { toast } from "react-toastify";
import { getCategories, getCategoryById } from "../../../../http/category";

const ProductModal = ({ handleClose, selectedProduct }) => {
    const inputDataStructure = {
        title: {
            key: "title",
            label: "Title",
            data: "",
            type: "text",
            error: null,
        },
        price: {
            key: "price",
            label: "price",
            data: "",
            type: "number",
            error: null,
        },
        availability: {
            key: "availability",
            label: "Stock Availability",
            data: "true",
            optList: [
                { id: "true", title: "In Stock" },
                { id: "false", title: "Out of Stock" },
            ],
            error: null,
        },
        discount: {
            key: "discount",
            label: "Discount",
            data: "0",
            type: "number",
            error: null,
        },
        img: {
            key: "img",
            label: "Images",
            data: [],
            multiple: true,
            maximum: 4,
            error: null,
        },
        category: {
            key: "category",
            label: "Category",
            data: null,
            optList: [],
            error: null,
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);
    const [valueAttributes, setValueAttributes] = useState([]);
    const [optionAttributes, setOptionAttributes] = useState([]);

    const handleChange = (data, input) => {
        input.data = data;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);

        if (input.key == "category") {
            handleAttributeList(data);
        }
    };

    const handleAttributeList = async (id) => {
        const category = await getCategoryById(id);
        const attributes = category.attributes;

        let valueAttributeList = [];
        let optAttributeList = [];

        attributes.forEach((attribute) => {
            if (attribute.type == "value") {
                const obj = {
                    key: attribute.id,
                    label: attribute.title,
                    value: null,
                    type: "number",
                    error: null,
                };
                valueAttributeList.push(obj);
            } else if (attribute.type == "option") {
                const options = attribute.options;

                const optList = attribute.options.map((option) => {
                    return {
                        id: option,
                        title: option,
                    };
                });

                const obj = {
                    key: attribute.id,
                    label: attribute.title,
                    data: null,
                    optList: optList,
                };
                optAttributeList.push(obj);
            }
        });

        setValueAttributes(valueAttributeList);
        setOptionAttributes(optAttributeList);
    };

    useEffect(() => {
        const buildForm = async () => {
            let input_list = { ...inputs };
            try {
                const result = await getCategories();

                const categories = result.map((category) => {
                    return { id: category.id, title: category.title };
                });

                input_list.category.optList = categories;
                input_list.category.data = categories[0].id;
            } catch (e) {
                console.log(e);
            }

            if (selectedProduct) {
                input_list.title.data = selectedProduct.title;
                input_list.availability.data = selectedProduct.availability;
                input_list.price.data = selectedProduct.price;
                input_list.discount.data = selectedProduct.discount;
                input_list.category.data = selectedProduct.category.id;

                selectedProduct.images.forEach((img) => {
                    input_list.img.data.push({
                        key: 0,
                        data: img,
                    });
                });

                setInputs(input_list);
            }
        };

        buildForm();
    }, []);

    const handleSubmit = async () => {
        const event = window.event;
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", inputs.title.data);
        formData.append("price", inputs.price.data);
        formData.append("discount", inputs.discount.data);
        formData.append("availability", inputs.availability.data);
        formData.append("category", inputs.category.data);

        inputs.img.data.forEach((item) => {
            formData.append("img", item.data);
        });

        valueAttributes.forEach((attribute) => {
            formData.append("attr-" + attribute.key, attribute.data);
        });
        optionAttributes.forEach((attribute) => {
            formData.append("attr-" + attribute.key, attribute.data);
        });

        try {
            if (selectedProduct) {
                formData.append("id", selectedProduct.id);

                const result = await updateProduct(formData);
                toast.success("Product updated successfully!");
            } else {
                const result = await createProduct(formData);
                toast.success("Product created successfully!");
            }

            handleClose();
        } catch (e) {
            toast.error(e);
            console.log(e);
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
                                    {!selectedProduct && "Create new "}
                                    {selectedProduct && "Edit "}Product
                                </h3>
                                <div className="mt-2">
                                    <Input
                                        input={inputs.title}
                                        handleChange={handleChange}
                                    />
                                    <Input
                                        input={inputs.price}
                                        handleChange={handleChange}
                                    />
                                    <Input
                                        input={inputs.discount}
                                        handleChange={handleChange}
                                    />
                                    <Select
                                        input={inputs.category}
                                        handleChange={handleChange}
                                    />
                                    <Select
                                        input={inputs.availability}
                                        handleChange={handleChange}
                                    />
                                    <Image
                                        input={inputs.img}
                                        handleChange={handleChange}
                                        multiple
                                    />
                                    {valueAttributes.map((attribute) => {
                                        return (
                                            <Input
                                                input={attribute}
                                                handleChange={handleChange}
                                            />
                                        );
                                    })}
                                    {optionAttributes.map((attribute) => {
                                        return (
                                            <Select
                                                input={attribute}
                                                handleChange={handleChange}
                                            />
                                        );
                                    })}

                                    <Button
                                        handleClick={handleSubmit}
                                        className="mt-6"
                                        text={
                                            selectedProduct ? "Edit" : "Create"
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

export default ProductModal;
