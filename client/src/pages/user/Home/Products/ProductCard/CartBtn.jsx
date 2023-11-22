import React from "react";
import { useDispatch } from "react-redux";

import {
    addProduct,
    incrementProduct,
    decrementProduct,
    removeProduct,
} from "../../../../../redux/actions/cartActions";

const CartBtn = ({ product }) => {
    const count = product.count;

    const dispatch = useDispatch();

    const centerBtnClassess = () => {
        let classess =
            "text-center  mb-2 h-10 cursor-pointer hover:bg-primary hover:text-white ";
        classess +=
            count == 0
                ? "col-span-6 rounded-md bg-[#ecf0f1]"
                : "col-span-4 bg-primary text-white";
        return classess;
    };

    const sideBtnClassess = (type) => {
        let classess =
            "text-center mb-2 h-10 cursor-pointer w-full bg-primary text-white ";
        classess += count === 0 ? "hidden " : "block ";
        classess += type === 1 ? "rounded-l-md" : "rounded-r-md";
        return classess;
    };

    const handleAdd = (product) => {
        dispatch(addProduct(product));
    };

    const handleIncrement = (product) => {
        dispatch(incrementProduct(product));
    };

    const handleDecrement = (product) => {
        if (count > 1) {
            dispatch(decrementProduct(product));
        } else if (count == 1) {
            dispatch(removeProduct(product));
        }
    };

    return (
        <div className=" grid grid-cols-6 gap-[1px]">
            <button
                onClick={() => handleDecrement(product)}
                className={sideBtnClassess(1)}
            >
                -
            </button>

            <button
                onClick={() => handleAdd(product)}
                className={centerBtnClassess()}
            >
                {count == 0 ? "Add to quote" : count}
            </button>

            <button
                onClick={() => handleIncrement(product)}
                className={sideBtnClassess(2)}
            >
                +
            </button>
        </div>
    );
};

export default CartBtn;
