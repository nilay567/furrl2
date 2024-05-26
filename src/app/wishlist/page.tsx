
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import WishItems from "@/components/WishItems";
const Wishlist: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const authToken: string | null = process.env.NEXT_PUBLIC_API_KEY ?? null;
    
    const wishItems = async () => {
        try {

            const res = await axios.get(
                `https://api.furrl.in/api/v1/user/wishList`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );

           // console.log(res);
            const response = res.data.allWishlist?.products;
            console.log(response)
            setItems(response);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        wishItems();
       // console.log(items)
    }, [])

    return (
        <>
            <div className="flex flex-col min-h-screen w-full mx-auto">
                <div className="bg-gray-300 border rounded-md h-[46px] w-[95%] ml-10 mb-4">
                    <div className="bg-white mx-auto w-1/4 py-1 my-1 flex justify-center items-center border rounded-md">
                        <div className="text-xl font-bold">
                            Wishlist Products
                        </div>

                    </div>
                </div>
                <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2">
                     <WishItems items={items}/>
                </div>
            </div>
        </>
    );

}

export default Wishlist;