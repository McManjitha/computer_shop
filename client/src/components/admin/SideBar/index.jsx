import React from "react";

import ListItem from "./listItem";

import {
    FaUser,
    FaUsers,
    FaHome,
    FaMoneyCheck,
    FaWhmcs,
    FaPowerOff,
} from "react-icons/fa";

const SideBar = ({ section }) => {
    const navList = [
        {
            id: 1,
            title: "Home",
            url: "/admin",
            icon: <FaHome />,
            selected: section == "home",
        },
        {
            id: 5,
            title: "Quotes",
            url: "/admin/quotes",
            icon: <FaMoneyCheck />,
            selected: section == "quotes",
        },

        {
            id: 3,
            title: "Banners",
            url: "/admin/banners",
            icon: <FaUser />,
            selected: section == "banners",
        },
        {
            id: 4,
            title: "Products",
            url: "/admin/products",
            icon: <FaUsers />,
            selected: section == "products",
        },
        {
            id: 4,
            title: "Categories",
            url: "/admin/categories",
            icon: <FaUsers />,
            selected: section == "categories",
        },
        {
            id: 4,
            title: "Attributes",
            url: "/admin/attributes",
            icon: <FaUsers />,
            selected: section == "attributes",
        },

        {
            id: 6,
            title: "Settings",
            url: "/admin/settings",
            icon: <FaWhmcs />,
            selected: section == "settings",
        },

        {
            id: 7,
            title: "Logout",
            url: "/admin/logout",
            icon: <FaPowerOff />,
        },
    ];

    return (
        <ul className="space-y-4 mb-12 mt-8 w-full">
            {navList.map((item) => (
                <ListItem key={item.id} item={item} />
            ))}
        </ul>
    );
};
export default SideBar;
