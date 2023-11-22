import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { Logout, Login, Dashboard } from "../pages/admin";

const AdminRoutes = () => {
    const PrivateRouter = () => {
        const user = useSelector((state) => state.user);

        if (user.authenticated && user.data.role == "admin") {
            return <Outlet />;
        } else {
            return <Navigate to="/admin/login" />;
        }
    };

    return (
        <Routes>
            <Route path="/admin/login" element={<Login />} />

            <Route element={<PrivateRouter user_type={"admin"} />}>
                <Route path="/admin" element={<Dashboard section={"home"} />} />
                <Route
                    path="/admin/customers"
                    element={<Dashboard section={"customers"} />}
                />
                <Route
                    path="/admin/banners"
                    element={<Dashboard section={"banners"} />}
                />
                <Route
                    path="/admin/products"
                    element={<Dashboard section={"products"} />}
                />
                <Route
                    path="/admin/categories"
                    element={<Dashboard section={"categories"} />}
                />
                <Route
                    path="/admin/quotes"
                    element={<Dashboard section={"quotes"} />}
                />
                <Route
                    path="/admin/attributes"
                    element={<Dashboard section={"attributes"} />}
                />
                <Route
                    path="/admin/sms"
                    element={<Dashboard section={"sms"} />}
                />
                <Route
                    path="/admin/settings"
                    element={<Dashboard section={"settings"} />}
                />
                <Route path="/admin/logout" element={<Logout />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
