import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import CartItem from "./CartItem";

const CartModal = ({ handleClose }) => {
    const cart = useSelector((state) => state.cart);
    const authenticated = useSelector((state) => state.user.authenticated);
    const productCount = cart.length;
    const navigate = useNavigate();

    const handleSubmit = () => {
        const event = window.event;
        event.preventDefault();

        if (cart.length == 0) {
            toast.error("cart is empty!");
        } else if (!authenticated) {
            toast.error("Please log in to make an order!");
        } else {
            handleClose();
            navigate("/checkout");
        }
    };

    const DisplayProductCount = () => {
        switch (productCount) {
            case 0:
                return "Cart is empty";
                break;
            case 1:
                return productCount + " Item";
                break;
            default:
                return productCount + " Items";
                break;
        }
    };

    const displayCartTotal = () => {
        let cartTotal = 0;

        cart.forEach((item) => {
            cartTotal += item.count * item.price;
        });

        return cartTotal + " LKR";
    };

    return (
        <div
            className="relative z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-white "
                        >
                            <div className="flex bg-secondery text-primary font-bold text-xl pl-3 w-full py-2">
                                Cart ({DisplayProductCount()})
                                <button
                                    onClick={handleClose}
                                    className="absolute right-2 h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 bg-gray-100 hover:text-red-600 focus:bg-gray-100 focus:text-red-600 focus:outline-none ltr:ml-3 ltr:-mr-2 rtl:mr-3 rtl:-ml-2"
                                >
                                    <svg
                                        className="h-3 w-3 mx-auto hover:fill-primary"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="#000000"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {cart.map((product) => {
                                    return <CartItem product={product} />;
                                })}
                            </div>
                            <button
                                onClick={handleSubmit}
                                class="w-[90%] mx-auto mb-4 flex h-12 justify-between rounded-full bg-primary text-white p-1 text-xl font-bold shadow-700 transition-colors hover:bg-accent-hover focus:bg-accent-hover focus:outline-none md:h-14"
                            >
                                <span class="flex h-full flex-1 items-center px-5 text-light">
                                    Checkout
                                </span>
                                <span class="flex h-full shrink-0 items-center rounded-full bg-secondery px-5 text-black">
                                    {displayCartTotal()}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
