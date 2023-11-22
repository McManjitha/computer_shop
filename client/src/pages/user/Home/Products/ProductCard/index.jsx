import React from "react";
import { useSelector } from "react-redux";

import CartBtn from "./CartBtn";

const ProductCard = ({ product }) => {
    const cart = useSelector((state) => state.cart);

    let item;

    if ((item = cart.find((item) => item.id === product.id))) {
        product.count = item.count;
    } else {
        product.count = 0;
    }

    const displayImage = () => {
        if (product.images.length) return product.images[0];
        else return "https://via.placeholder.com/150";
    };

    const price = product.price;
    const discount = product.discount;
    return (
        <div className="card container mx-auto px-4 min-h-[400px] cursor-pointer cart-type-neon rounded h-full bg-light overflow-hidden  transition-all duration-200 hover:shadow transform hover:-translate-y-0.5 shadow-xl backdrop-blur-xl">
            <span />
            <span />
            <span />
            <span />
            <div className="absolute top-2 flex right-3">
                {product.availability == "false" && (
                    <div
                        className="
                    bg-red-700 text-white rounded-md 
                    text-center text-sm  px-2 
                "
                    >
                        Out of stock
                    </div>
                )}

                {discount != 0 && (
                    <div
                        className="
                    bg-emerald-700 text-white rounded-md 
                       text-center text-sm px-2 ml-2
                "
                    >
                        {discount + "%"}
                    </div>
                )}
            </div>

            <img
                className="mx-auto w-3/5 product-img mt-10 "
                src={displayImage()}
            />

            <div className="text-center  flex mt-8 ml-2">
                <h2 className="text-heading text-white uppercase text-xl font-semibold m-0 cursor-pointer mr-3">
                    {product.title}
                </h2>
            </div>
            <div className="text-center text-white  flex mb-3 ml-2 text-xl font-semibold uppercase">
                <h2 className="text-heading font-semibold mr-3">
                    {discount
                        ? Math.floor(price - (price * discount) / 100) + " LKR"
                        : price + " LKR"}
                </h2>
                {discount != 0 && (
                    <h2 className="text-muted ms-2 line-through">
                        {price + "LKR"}
                    </h2>
                )}
            </div>

            <CartBtn className={"fixed"} product={product} />
        </div>
    );
};

export default ProductCard;
