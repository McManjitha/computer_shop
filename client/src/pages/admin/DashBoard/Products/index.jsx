import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getProducts, deleteProduct } from "../../../../http/product";

import ProductModal from "./ProductModal";

import { Input, Select, Button, Confirm } from "../../../../components/ui";

const ProductList = () => {
    const [Products, setProducts] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const inputDataStructure = {
        query: {
            key: "query",
            label: "",
            placeholder: "Search",
            value: "",
            type: "text",
            isValid: true,
            error: "",
        },
        team: {
            key: "team",
            label: "",
            value: "",
            optList: [
                { id: "all", title: "All teams" },
                { id: "eb", title: "Execetive Board" },
                { id: "tvc", title: "Thrust Vector Controlling" },
                { id: "tc", title: "Thrust Controlling" },
                { id: "body", title: "Body & Assembling" },
                { id: "safety", title: "Recovery & Safety" },
                { id: "launch", title: "Launching & Navigation" },
            ],
            isValid: true,
            error: "",
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleEdit = (Product) => {
        setSelectedProduct(Product);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedProduct);
        try {
            await deleteProduct(selectedProduct.id);
            setConfirmModalState(false);
            refreshProducts();
            toast.success("Product deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshProducts();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedProduct(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshProducts = () => {
        try {
            getProducts(Products).then((data) => {
                setProducts(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshProducts();
        const intervalId = setInterval(refreshProducts, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const availability = (product) => {
        let classes =
            "inline-flex items-center justify-center px-2  py-1 mr-2 text-xs font-bold leading-none text-red-100 rounded-full";
        classes += product.availability ? " bg-green-500" : " bg-red-500";

        return (
            <div>
                <span className={classes}>
                    {product.availability ? "In stock" : "Out of stock"}
                </span>
            </div>
        );
    };

    const actionBtns = (Product) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedProduct(Product);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(Product)}
                />
            </div>
        );
    };
    const img = (images) => {
        return (
            <div className="flex">
                {images.map((img) => {
                    return (
                        <img
                            className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={img}
                        />
                    );
                })}
            </div>
        );
    };

    const columns = [
        {
            title: "img",
            dataIndex: "",
            key: "avatar",
            width: "10%",
            render: (arg) => img(arg.images),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "40%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            align: "center",
            width: "40%",
            render: (arg) => {
                return arg ? arg.title : "No category";
            },
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            align: "center",
            width: "10%",
            sorter: (a, b) => a.price.localeCompare(b.price),
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            align: "center",
            width: "20%",
            sorter: (a, b) => a.discount.localeCompare(b.discount),
        },

        {
            title: "Availablity",
            dataIndex: "",
            key: "availability",
            align: "center",
            width: "30%",
            render: (arg) => availability(arg),
        },
        {
            title: "Operations",
            dataIndex: "",
            key: "operations",
            align: "center",
            width: "20%",
            render: (arg) => actionBtns(arg),
        },
    ];

    return (
        <section className="w-full">
            {dataModalState && (
                <ProductModal
                    handleClose={handleCloseModal}
                    selectedProduct={selectedProduct}
                />
            )}
            {confirmModalState && (
                <Confirm
                    cancelHandler={handleCloseModal}
                    confirmHandler={handleDelete}
                />
            )}
            <div className="grid grid-cols-3 gap-3 bg-white px-2 py-2 mb-3 rounded-md">
                <div>
                    <Select input={inputs.team} handleChange={handleChange} />
                </div>
                <div>
                    <Input input={inputs.query} handleChange={handleChange} />
                </div>
                <div>
                    <Button
                        text={"Add new"}
                        handleClick={() => setDataModalState(true)}
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={Products} />
        </section>
    );
};

export default ProductList;
