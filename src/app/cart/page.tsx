
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CartItems from "@/components/CartItems";
import { RxDotFilled } from 'react-icons/rx';
interface Review {
    text: string;
    name: string;
    place: string;
  }
  
  const Cart: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [price, setPrice] = useState<any>(null);
    const [index, setIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
    const authToken: string | null = process.env.NEXT_PUBLIC_API_KEY ?? null;
    const cartItems = async () => {
        try {

            const res = await axios.get(
                `https://api.furrl.in/api/v1/user/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );

            console.log(res);
            const itemData = res.data.cart;
            const reviewData = res.data.reviews;
            const discData = res.data.cartDiscount
            setItems(itemData)
             setReviews(reviewData)
            setPrice(discData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        cartItems();
        // console.log(items)
    }, [])

   const change=(idx: number)=>{
           setIndex(idx);
           console.log(`${idx} is clicked`)
   }

   useEffect(() => {
    const id = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
            setIsAnimating(false);
        }, 1000);
    }, 5000);
    return () => clearInterval(id);
});



    return (
        <>
            <div className="flex flex-col min-h-screen w-full mx-auto">
                <div className="bg-gray-300 border rounded-md h-[46px] w-[95%] ml-10 mb-4">
                    <div className="bg-white mx-auto w-1/4 py-1 my-1 flex justify-center items-center border rounded-md">
                        <div className="text-xl font-bold">
                            Cart Products
                        </div>

                    </div>
                </div>
                <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <CartItems items={items} />
                </div>
                <div className="flex justify-center items-center h-full mt-10 border border-white-100 rounded-lg  w-[50%] mx-auto">
                    <div className="max-w-lg w-full bg-white border rounded-md shadow-md p-6">
                        <div className="text-gray-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">Total MRP:</span>
                                <span className="text-gray-700 font-bold">Rs. {price?.totalCartValue}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-normal text-purple-800">Discount on MRP:</span>
                                <span className="text-purple-800">- Rs. {price?.bagDiscount}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-normal text-purple-800">Convenience fee:</span>
                                <span className="text-purple-800">-Rs. {0}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-normal text-purple-800">Delivery fee</span>
                                <span className="text-purple-800">-Rs. {0}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold">Total Amount:</span>
                                <span className="text-gray-700 font-bold">Rs. {price?.cartValue}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center h-full mt-10 border border-white-100 rounded-lg  w-[50%] mx-auto">
                    <h1 className="font-semibold text-purple-800 text-3xl">What customers are saying</h1>
                    <div className="relative w-full mt-5 flex flex-col justify-center items-center">
                        <div className="">
                            {reviews.map((review,idx)=>(
                                  <div key={idx} className={`transition-transform duration-1000 ${idx === index ? (isAnimating ? 'slide-in' : 'slide-show') : (isAnimating ? 'slide-out' : 'hidden')}`}>
                                  {idx === index ? (
                                      <div className="text-center text-md text-gray-800 w-[75%] mx-auto">
                                        <div className="italic">
                                         {review.text}
                                         </div>
                                        <div className="mt-1">
                                         - {review.name} , {review.place}
                                         </div>
                                      </div>
                                  ) : null}
                              </div>
                            ))}
                        </div>
                        <div className='flex justify-center py-2'>
                            {reviews.map((review, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => change(idx)}
                                    className={`text-2xl cursor-pointer hover:text-purple-800 ${idx === index ? 'text-purple-800' : ''}`}
                                    >
                                    <RxDotFilled />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
            <style jsx>{`
                .slide-show {
                    transform: translateX(0%);
                }
                .slide-in {
                    transform: translateX(50%);
                }
                .slide-out {
                    transform: translateX(-50%);
                }
            `}</style>
        </>
    );

}

export default Cart;