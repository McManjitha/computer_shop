import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "./SearchBar";

import CartModal from "./CartModal";

const NavBar = () => {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [cartModal, setCartModalState] = useState(false);
    const [userMenu, setUserMenuState] = useState(false);
    const [search, setSearch] = useState(false);
    const [menu, setmenu] = useState(false);

    const hidClass = search ? "hidden" : "";
    const menuClass = menu ? "hidden" : "";

    const handleSearch = () => {
        setSearch(!search);
    }
    const handleMenu = () => {
        setmenu(!menuClass);
    }


    const userMenuclassList = () => {
        let classList =
            "absolute z-10 right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl transform transition-all duration-300 ";

        classList += userMenu ? "opacity-100 scale-100" : "opacity-0 scale-95";

        return classList;
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const isOutside = !event.target.closest(".user-menu");

            if (isOutside && userMenu) {
                setUserMenuState(false);
            }
        };

        if (userMenu) {
            window.addEventListener("click", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [userMenu]);

    return (
        <div>
            <div className="w-full h-[70px] flex flex-col">
                <ToastContainer />
                {cartModal && (
                    <CartModal handleClose={() => setCartModalState(false)} />
                )}
                <nav className=" z-30 flex justify-between items-center top-0 w-full  h-[70px] bg-[#0c0c35]">
                    <div className="w-full md:mx-4 mx-2 md:h-[70px] h-[50px] flex justify-between items-center text-gray-700">
                        <a href="/">
                            <img
                                className="md:h-[60px] h-[45px] pb-1 pt-1"
                                src={require("../../assets/img/logo.png")}
                            ></img>
                        </a>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="w-1/3 hidden sm:flex">
                            <SearchBar/>    
                        </div>
                        <div className="inset-0 transition-all  flex items-center justify-center space-y-0  flex-row lg:space-x-12">
                            <ul className="sm:flex sm:flex-row items-center space-y-0 md:space-x-6 sm:space-x-3 hidden">
                                <li className="sm:text-sm md:text-lg font-medium group text-slate-200 cursor-pointer">Home
                                    <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                                </li>
                                <li className="sm:text-sm md:text-base  font-medium group text-slate-200 cursor-pointer">About Us
                                    <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                                </li>
                                <li className="sm:text-sm md:text-base  font-medium group text-slate-200 cursor-pointer">Our Showrooms
                                    <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                                </li>
                                <li className="sm:text-sm md:text-base  font-medium group text-green-500 cursor-pointer">
                                    Login
                                    <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out" />
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center sm:hidden">
                            <div className="block sm:hidden cursor-pointer p-1 mx-1 hover:bg-sky-900" onClick={handleSearch}>
                                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <div className=" sm:hidden mx-1 flex flex-col mr-3 p-1 hover:bg-sky-900 cursor-pointer" onClick={handleMenu}>
                                <span className="w-[20px] h-[3px] bg-white my-1"></span>
                                <span className="w-[20px] h-[3px] bg-white my-1"></span>
                                <span className="w-[20px] h-[3px] bg-white my-1"></span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`sm:hidden w-full mt-2 ${hidClass}`}>
                <SearchBar/>
            </div>
            <ul className={`sm:hidden w-full flex flex-col bg-[linear-gradient(-20deg,#2b5876_0%,#4e4376_100%)] p-2 ${menuClass}`}>
                <li className="mx-2 text-center border-b border-slate-500  hover:text-white text-slate-300 cursor-pointer">Home</li>
                <li className="mx-2 text-center border-b border-slate-500  hover:text-white text-slate-300 cursor-pointer">About Us</li>
                <li className="mx-2 text-center border-b border-slate-500  hover:text-white text-slate-300 cursor-pointer">Our Showrooms</li>
                <li className="mx-2 text-center border-b border-slate-500  hover:text-white text-slate-300 cursor-pointer">Login</li>
            </ul>
        </div>
    );
};

export default NavBar;
