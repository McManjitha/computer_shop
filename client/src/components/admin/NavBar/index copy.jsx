import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import CartModal from "./CartModal";
import UserModal from "./UserModal";

const NavBar = () => {
    const user = useSelector((state) => state.user.data);
    const [cartModal, setCartModalState] = useState(false);
    const [userModal, setUserModalState] = useState(false);

    return (
        <div>
            <ToastContainer />
            {cartModal && (
                <CartModal handleClose={() => setCartModalState(false)} />
            )}
            <nav className="header-nav z-30 fixed top-0 left-0 w-full  h-16  bg-white shadow-lg">
                <div className="container m-auto flex justify-between items-center text-gray-700">
                    <a href="/">
                        <img
                            className="h-[60px] bg-white pb-1 pt-1"
                            src={require("../../../assets/img/logo.png")}
                        ></img>
                    </a>

                    <div className="inset-0 transition-all  md:flex items-center justify-center space-y-8 md:space-y-0 md:space-x-8 flex-col md:flex-row lg:space-x-14 hidden">
                        <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 lg:md:-x-8">
                            <li className="text-lg md:text-base lg:text-lg font-medium group text-primary">
                                <a href="/">Home</a>
                                <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                            </li>
                            <li className="text-lg md:text-base lg:text-lg font-medium group">
                                <a href="#">Delivery</a>
                                <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                            </li>
                            <li className="text-lg md:text-base lg:text-lg font-medium group">
                                <a href="#menu">Menu</a>
                                <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                            </li>
                            <li
                                className="cursor-pointer hover:text-primary"
                                onClick={() => setCartModalState(true)}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    className="shrink-0"
                                    viewBox="0 0 12.686 16"
                                >
                                    <g transform="translate(-27.023 -2)">
                                        <g transform="translate(27.023 5.156)">
                                            <g>
                                                <path
                                                    d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z"
                                                    transform="translate(-53.023 -101.005)"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                        </g>
                                        <g transform="translate(30.274 2)">
                                            <g>
                                                <path
                                                    d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z"
                                                    transform="translate(-157.039)"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <p className="absolute right-2 top-4 text-primary">
                                    0
                                </p>
                            </li>
                            <li
                                className="cursor-pointer hover:text-primary"
                                onClick={() => setUserModalState(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                >
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </li>
                            {userModal && (
                                <UserModal
                                    handleClose={() => setUserModalState(false)}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
