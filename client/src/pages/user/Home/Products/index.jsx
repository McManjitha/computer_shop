import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ControlPanel from "./ControlPanel";
import { Button } from "../../../../components/ui";
import { getProducts, getProductsByCategory } from "../../../../http/product";
import { getCategories } from "../../../../http/category";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Slide } from "react-toastify";


const Products = () => {
    const [products, setproducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fileters, setFileters] = useState([]);

    const refreshProducts = async (category = null, index = 1) => {
        const products = await getProducts();
        setproducts(products);
    };

    const selectCategory = async (catid) => {
        const products = await getProductsByCategory(catid);
        setproducts(products);
    };

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });

        refreshProducts();
        const intervalId = setInterval(refreshProducts, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const getBtnClasses = (title) => {
        let classList =
            "backdrop-blur-xl h-[250px] bg-orange-300 rounded drop-shadow-lg text-sm font-medium text-center rounded-lg cursor-pointer  text-white shadow-xl backdrop-blur-xl   transition-all duration-300 ";
        return classList;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div id="menu" className="w-full h-1/2 bg-zinc-900 flex flex-col border-t-8 border-stone-700">
            <div className="flex md:flex-row flex-col w-full border-b-4 border-stone-700">
                <div className=" px-6 w-full md:w-1/2 h-1/2 ">
                    <Slider {...settings}>
                        {categories.map((item) => {
                            return (

                                <div key={item.slug} className="backdrop-blur-xl h-[200px]  drop-shadow-lg text-sm font-medium text-center rounded-lg cursor-pointer  text-white shadow-xl  transition-all duration-300 "
                                    onClick={() => selectCategory(item.id)}>

                                    <img className="mx-auto h-1/2 sm:h-4/6 cover my-3" src={item.img} />
                                    <span className="top-4 font-semibold uppercase text-white">
                                        {item.title}
                                    </span>
                                </div>
                            );
                        })}
                    </Slider>
                </div>

                <div className="bg-slate-900 md:w-1/2 w-full p-6">
                    <div className="mx-auto w-full mt-2 ">
                        <ControlPanel />
                    </div>
                </div>
            </div>
            <div className="ml-64 w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
        </div>
    );
};

export default Products;
