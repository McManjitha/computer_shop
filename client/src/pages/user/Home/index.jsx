import React, { useState } from "react";
import HeroSection from "../../user/Home/HeroSection";
import Products from "./Products";
import NavBar from "../../../components/NavBar";
import Footer from "./footer";

const ProductsSection = () => {
    return (
        <div className="flex flex-col">
            <NavBar />
            <HeroSection />
            <Products/>
            <Footer />
        </div>
    );
};

export default ProductsSection;
