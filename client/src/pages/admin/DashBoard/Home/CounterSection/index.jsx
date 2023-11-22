import React from "react";
import {
    FaUsers,
    FaUser,
    FaCheckDouble,
    FaListUl,
    FaExclamationTriangle,
    FaSpinner,
} from "react-icons/fa";

import SingleCounter from "./SingleCounter";

const CounterSection = ({ countData }) => {
    const counts = [
        { title: "Teams", count: countData.teamCount, icon: <FaUsers /> },
        { title: "Members", count: countData.memberCount, icon: <FaUser /> },
        {
            title: "Completed tasks",
            count: countData.completedTaskCount,
            icon: <FaCheckDouble />,
        },
        {
            title: "Todo tasks",
            count: countData.toDoTaskCount,
            icon: <FaListUl />,
        },
        {
            title: "In Progress tasks",
            count: countData.inProgressTaskCount,
            icon: <FaSpinner />,
        },
        {
            title: "Overdue tasks",
            count: countData.overDueTaskCount,
            icon: <FaExclamationTriangle />,
        },
    ];

    return (
        <div className="flex flex-wrap">
            {counts.map((item) => {
                return <SingleCounter item={item} />;
            })}
        </div>
    );
};

export default CounterSection;
