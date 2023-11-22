import React from "react";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../components/admin/SideBar";

import HomeSection from "./Home";
import ProductSection from "./Products";
import QuoteSection from "./Quotes";
import CategorySection from "./Categories";
import AttributeSection from "./Attributes";
import SettingSection from "./Settings";

const Dashboard = ({ section }) => {
    return (
        <div>
            <NavBar />
            <div className="flex mt-[85px] gap-6">
                <div className="w-[220px] p-10 bg-primary fixed h-screen -mt-12">
                    <SideBar section={section} />
                </div>
                <div className="w-full ml-[220px] ">
                    {section == "home" && <HomeSection />}
                    {section == "products" && <ProductSection />}
                    {section == "quotes" && <QuoteSection />}
                    {section == "categories" && <CategorySection />}
                    {section == "attributes" && <AttributeSection />}
                    {section == "settings" && <SettingSection />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
