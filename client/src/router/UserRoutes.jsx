import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Quote, Home } from "../pages/user";

const UserRoutes = () => {
    const user = useSelector((state) => state.user);

    console.log(user);

    const PrivateRouter = () => {
        if (user.authenticated && user.data.role == "customer") {
            return <Outlet />;
        } else {
            return <Navigate to="/login" />;
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<Quote />} />
        </Routes>
    );
};

export default UserRoutes;
