import React from "react";

const CartBtn = ({ count, handleIncrement, handleDecrement }) => {
    return (
        <div className="flex overflow-hidden flex-col-reverse items-center w-8 h-24 bg-gray-100 text-heading rounded-full">
            <button
                onClick={handleDecrement}
                className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-none hover:!bg-gray-100"
            >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-3 w-3 stroke-2.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                    />
                </svg>
            </button>
            <div className="flex flex-1 items-center justify-center px-3 text-sm font-semibold text-heading">
                {count}
            </div>
            <button
                onClick={handleIncrement}
                className="cursor-pointer p-2 transition-colors duration-200 hover:bg-accent-hover focus:outline-none hover:!bg-gray-100"
                title
            >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="md:w-4.5 h-3.5 w-3.5 stroke-2.5 md:h-4.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CartBtn;
