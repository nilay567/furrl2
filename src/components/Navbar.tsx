"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto py-4 flex justify-center items-center">
                <button
                    className="text-4xl font-normal text-purple-800 text-black m-auto hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Furrl
                </button>
                <button
                    className="cursor-pointer hover:text-gray-900 hover:scale-110 transform transition duration-300 ease-in-out mx-4"
                    onClick={() => {
                        router.push("/wishlist");
                    }}
                >
                    <img
                        id="appbar-wishlist"
                        alt="WishlistIcon"
                        loading="lazy"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        src="/wishlist.svg"
                    />
                </button>
                <button
                    className="cursor-pointer hover:text-gray-900 hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={() => {
                        router.push("/cart");
                    }}
                >
                    <img
                        id="appbar-cart"
                        alt="CartIcon"
                        loading="lazy"
                        width="30"
                        height="30"
                        decoding="async"
                        data-nimg="1"
                        src="/cart.svg"
                    />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
