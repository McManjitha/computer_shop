import React from "react";

const SingleProduct = ({ product }) => {
    return (
        <div className="flex justify-between py-2">
            <p className="flex items-center justify-between text-base">
                <span className="text-sm text-body">
                    <span className="text-sm font-bold text-heading">
                        {product.count}
                    </span>
                    <span className="mx-2">x</span>
                    <span>{product.title}</span>
                </span>
            </p>
            <span className="text-sm text-body">
                {product.count * product.price + " LKR"}
            </span>
        </div>
    );
};

export default SingleProduct;
