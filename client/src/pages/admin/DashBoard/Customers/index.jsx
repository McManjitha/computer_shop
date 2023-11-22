import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getUsers, deleteUser } from "../../../../http/user";
import UserModal from "./UserModal";

import { Input, Select, Button, Confirm } from "../../../../components/ui";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [dataModalState, setDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const handleEdit = (User) => {
        setSelectedUser(User);
        setDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedUser);
        try {
            await deleteUser(selectedUser.id);
            setConfirmModalState(false);
            refreshUsers();
            toast.success("User deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshUsers();
        setDataModalState(false);
        setConfirmModalState(false);
        setSelectedUser(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshUsers = () => {
        try {
            getUsers(users).then((data) => {
                setUsers(data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshUsers();
        const intervalId = setInterval(refreshUsers, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const stock_status = (count) => {
        let classes =
            "inline-flex items-center justify-center px-2  py-1 mr-2 text-xs font-bold leading-none text-red-100 rounded-full";
        classes += count ? " bg-green-500" : " bg-red-500";

        return (
            <div>
                <span className={classes}>{count}</span>
            </div>
        );
    };

    const actionBtns = (user) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedUser(user);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="Edit"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => handleEdit(user)}
                />
            </div>
        );
    };
    const img = (avatar) => {
        return (
            <div className="flex">
                <img
                    className="w-11 h-11 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={avatar}
                />
            </div>
        );
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "",
            key: "avatar",
            render: (arg) => img(arg.avatar),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
            width: "40%",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            align: "center",
            width: "10%",
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: "Team",
            dataIndex: "team",
            key: "team",
            align: "center",
            width: "40%",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
                <UserModal
                    handleClose={handleCloseModal}
                    selectedUser={selectedUser}
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
            <Table columns={columns} dataSource={users} />
        </section>
    );
};

export default UserList;
