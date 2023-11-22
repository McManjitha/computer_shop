import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../components/ui";
import PasswordModal from "./PasswordModal";
import DetailModal from "./DetailModal";

const Settings = () => {
    const [passwordModalState, setPasswordModalState] = useState(false);
    const [detailModalState, setDetailModalState] = useState(false);
    const user = useSelector((state) => state.user.data);

    const handleCloseModal = () => {
        setPasswordModalState(false);
        setDetailModalState(false);
    };

    return (
        <section className="w-full">
            {passwordModalState && (
                <PasswordModal handleClose={handleCloseModal} />
            )}
            {detailModalState && <DetailModal handleClose={handleCloseModal} />}

            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                        <div className="col-span-4 relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <img
                                    className="rounded-full h-44 w-44"
                                    src={user.avatar}
                                />
                            </div>
                        </div>
                        <div className="col-span-8 space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <Button
                                text={"Edit profile"}
                                handleClick={() => {
                                    setDetailModalState(true);
                                }}
                            />
                            <Button
                                text={"Change password"}
                                handleClick={() => {
                                    setPasswordModalState(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">
                            {user.name}
                        </h1>
                        <p className="font-light text-gray-600 mt-3">
                            {user.email}
                        </p>
                        <p className="mt-8 text-gray-500">
                            Solution Manager - Creative Tim Officer
                        </p>
                        <p className="mt-2 text-gray-500">
                            Faculty of Engineering, University of Ruhuna
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Settings;
