import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const ChartSection = () => {
    const data = [
        { name: "January", users: 0, tasks: 4 },
        { name: "February", users: 15, tasks: 2 },
        { name: "March", users: 10, tasks: 19 },
        { name: "April", users: 13, tasks: 7 },
        { name: "May", users: 9, tasks: 9 },
        { name: "June", users: 11, tasks: 7 },
        { name: "July", users: 17, tasks: 8 },
        { name: "Augest", users: 17, tasks: 8 },
        { name: "September", users: 20, tasks: 4 },
        { name: "October", users: 15, tasks: 4 },
        { name: "November", users: 10, tasks: 8 },
        { name: "December", users: 17, tasks: 10 },
    ];
    return (
        <ResponsiveContainer width="99%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#0F9B79"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="users" stroke="#0F9B79" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ChartSection;
