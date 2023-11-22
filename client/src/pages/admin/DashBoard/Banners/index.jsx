import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getCategories, deleteCategory } from "../../../../http/category";
import CategoryModal from "./CategoryModal";

import { Input, Select, Button, Confirm } from "../../../../components/ui";

const CategoryList = () => {
    const [Categories, setCategories] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleEdit = (Category) => {
        setSelectedCategory(Category);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedCategory);
        try {
            await deleteCategory(selectedCategory.id);
            setConfirmModalState(false);
            refreshCategories();
            setSelectedCategory(null);
            toast.success("Category deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshCategories();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedCategory(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshCategories = () => {
        try {
            getCategories(Categories).then((data) => {
                setCategories(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshCategories();
        const intervalId = setInterval(refreshCategories, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const actionBtns = (Category) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedCategory(Category);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(Category)}
                />
            </div>
        );
    };
    const img = (img) => {
        return (
            <div className="flex justify-center">
                <img
                    className="w-11 h-11 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={img}
                />
            </div>
        );
    };

    const columns = [
        {
            title: "#",
            width: "10%",
            render: (arg) => {
                return <p className="text-center">7</p>;
            },
        },
        {
            title: "img",
            width: "20%",
            render: (arg) => img(arg.img),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "30%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
            align: "center",
            width: "30%",
            sorter: (a, b) => a.slug.localeCompare(b.slug),
        },
        {
            title: "Operations",
            dataIndex: "",
            key: "operations",
            align: "center",
            width: "30%",
            render: (arg) => actionBtns(arg),
        },
    ];

    return (
        <section className="w-full">
            {dataModalState && (
                <CategoryModal
                    handleClose={handleCloseModal}
                    selectedCategory={selectedCategory}
                />
            )}
            {confirmModalState && (
                <Confirm
                    cancelHandler={handleCloseModal}
                    confirmHandler={handleDelete}
                />
            )}
            <div className="grid grid-cols-3 gap-3 bg-white px-2 py-2 mb-3 rounded-md">
                <div className="col-span-2">
                    <Input input={inputs.query} handleChange={handleChange} />
                </div>
                <div>
                    <Button
                        text={"Add new"}
                        handleClick={() => setDataModalState(true)}
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={Categories}
                style={{ width: "100%" }}
            />
        </section>
    );
};

export default CategoryList;
