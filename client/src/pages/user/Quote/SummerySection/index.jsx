import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui";
import SingleProduct from "./single_product";

const SummerySection = ({ handleSubmit }) => {
    const cart = useSelector((state) => state.cart);

    const get_total = () => {
        let total = 0;
        cart.forEach((product) => {
            total += product.count * product.price;
        });
        return total;
    };

    return (
        <div className="w-4/5 my-10 lg:my-0 mx-auto md:w-full col-span-3">
            <div className="w-4/5 mx-auto">
                <div className="flex flex-col items-center space-s-4 mb-4">
                    <span className="text-base font-bold text-heading">
                        Order summery
                    </span>
                </div>
                {cart.length == 0 && (
                    <div className="">
                        <p className="pr-2 text-center">
                            Your cart is empty!
                            <Link
                                className="hover:text-primary underline ml-3"
                                to="/#menu"
                            >
                                Let's Add something
                            </Link>
                        </p>
                    </div>
                )}
                {cart.length != 0 && (
                    <div>
                        <div className="flex flex-col py-3 border-b border-border-200">
                            {cart.map((product) => (
                                <SingleProduct
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between">
                                <p className="text-sm text-body">Sub Total</p>
                                <span className="text-sm text-body">
                                    {get_total() + " LKR"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-sm text-body">
                                    Delivery charge
                                </p>
                                <span className="text-sm text-body">0 LKR</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-10">
                    <Button text={"Checkout"} handleClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default SummerySection;
