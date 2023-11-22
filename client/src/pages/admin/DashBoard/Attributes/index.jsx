import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getAttributes, deleteAttribute } from "../../../../http/attribute";
import AttributeModal from "./AttributeModal";

import { Input, Button, Confirm } from "../../../../components/ui";

const AttributeList = () => {
    const [attributes, setAttributes] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedAttribute, setSelectedAttribute] = useState(null);

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

    const handleEdit = (Attribute) => {
        setSelectedAttribute(Attribute);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedAttribute);
        try {
            await deleteAttribute(selectedAttribute.id);
            setConfirmModalState(false);
            refreshattributes();
            setSelectedAttribute(null);
            toast.success("Attribute deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshattributes();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedAttribute(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshattributes = () => {
        try {
            getAttributes().then((data) => {
                setAttributes(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshattributes();
        const intervalId = setInterval(refreshattributes, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const actionBtns = (Attribute) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedAttribute(Attribute);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(Attribute)}
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
            title: "Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "30%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Attribute Type",
            align: "center",
            width: "30%",
            render: (arg) => {
                return <span className="capitalize">{arg.type}</span>;
            },
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Attribute Options",
            align: "center",
            width: "30%",
            render: (arg) => {
                if (arg.type == "option") {
                    return arg.options.map((option) => {
                        return (
                            <span className="bg-primary p-2 rounded-2xl text-white mr-2">
                                {option}
                            </span>
                        );
                    });
                } else {
                    return "NA";
                }
            },
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
                <AttributeModal
                    handleClose={handleCloseModal}
                    selectedAttribute={selectedAttribute}
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
                dataSource={attributes}
                style={{ width: "100%" }}
            />
        </section>
    );
};

export default AttributeList;
