import React, { useState, useEffect } from "react";
import ChartSection from "./ChartSection";
import CounterSection from "./CounterSection";

//import { counts } from "../../../http/stat";

const Home = () => {
    const [countData, setCounts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await counts();
    //             setCounts(result);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <CounterSection countData={countData} />
            <ChartSection />
        </div>
    );
};

export default Home;
