import React from "react";
import CartBtn from "./CartBtn";

import { useDispatch } from "react-redux";

import {
    incrementProduct,
    decrementProduct,
    removeProduct,
} from "../../../redux/actions/cartActions";

const CartItem = ({ product }) => {
    const count = product.count;

    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementProduct(product));
    };

    const handleDecrement = () => {
        if (count > 1) {
            dispatch(decrementProduct(product));
        } else if (count == 1) {
            dispatch(removeProduct(product));
        }
    };

    const handleRemove = () => {
        dispatch(removeProduct(product));
    };

    const displayImage = () => {
        if (product.images.length) return product.images[0];
        else return "https://via.placeholder.com/150";
    };

    return (
        <div className="flex items-center border-b border-solid border-border-200 border-opacity-75 py-4 px-4 text-sm sm:px-6">
            <CartBtn
                count={count}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
            <div className="relative mx-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-gray-100 sm:h-16 sm:w-16">
                <span>
                    <img alt="Blueberries" sizes="100vw" src={displayImage()} />
                </span>
            </div>
            <div>
                <h3 className="font-bold text-heading">{product.title}</h3>
                <p className="my-2.5 text-accent">{product.price + " LKR"}</p>
            </div>
            <span className="font-bold text-heading ml-auto">
                {product.price * product.count + " LKR"}
            </span>
            <button
                onClick={handleRemove}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-none ltr:ml-3 ltr:-mr-2 rtl:mr-3 rtl:-ml-2"
            >
                <span className="sr-only">close</span>
                <svg
                    className="h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;
