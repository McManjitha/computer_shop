import React, { useEffect, useState } from "react";
//import { updateProfile } from "../../../../http/user";
import { Input, Image, Button } from "../../../../components/ui";
import { toast } from "react-toastify";

const DetailModal = ({ handleClose, selectedUser }) => {
    const inputDataStructure = {
        name: {
            key: "name",
            label: "Name",
            data: "",
            type: "text",
            isValid: true,
            error: "",
        },
        email: {
            key: "email",
            label: "Email",
            data: "",
            type: "email",
            isValid: true,
            readOnly: true,
            error: "",
        },

        avatar: {
            key: "avatar",
            label: "Avatar",
            data: [],
            type: "password",
            isValid: true,
            error: "",
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleChange = (data, input) => {
        input.data = data;

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    useEffect(() => {
        if (selectedUser) {
            let input_list = { ...inputs };
            input_list.name.data = selectedUser.name;

            input_list.avatar.data.push({
                key: 0,
                data: selectedUser.avatar,
            });
            input_list.email.data = selectedUser.email;
            setInputs(input_list);
        }
    }, []);

    const handleSubmit = async () => {
        const event = window.event;
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", inputs.name.data);

        formData.append("avatar", inputs.avatar.data[0].data);

        try {
            formData.append("id", selectedUser.id);

            //const result = await updateProfile(formData);
            toast.success("Profile updated successfully!");

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
                                    Update profile
                                </h3>
                                <div className="mt-2">
                                    <Input
                                        input={inputs.name}
                                        handleChange={handleChange}
                                    />
                                    <Input
                                        input={inputs.email}
                                        handleChange={handleChange}
                                    />
                                    <Image
                                        input={inputs.avatar}
                                        handleChange={handleChange}
                                        multiple
                                    />

                                    <Button
                                        handleClick={handleSubmit}
                                        className="mt-6"
                                        text={"Update"}
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

export default DetailModal;
