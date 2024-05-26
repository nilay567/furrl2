"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Items from "@/components/Items";
import Loading from "@/components/Loading";

interface Item {
  id: string;
  shopifyId: number;
  title: string;
  MRP: {
      currency: string;
      value: number;
  };
  price: {
      value: number;
      currency: string;
  };
  brand: {
      id: string;
      name: string;
  }[];
  discountPercent: number;
  images: {
      id: number;
      position: number;
      width: number;
      height: number;
      src: string;
  }[];
}

const Home: React.FC = () => {
  

const authToken: string | null = process.env.NEXT_PUBLIC_API_KEY ?? null;


  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(170);
  const data = { "input": { page, "pageSize": 10, "filters": [], "id": "#HomeHunts", "entity": "vibe" } }

  const fetchItems = async () => {
    // console.log("button clicked")
    console.log(page)
    console.log(items)

    try {
      const res = await axios.post(
        `https://api.furrl.in/api/v2/listing/getListingProducts`,
        data,

        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        }


      );

      //console.log(res)
      const resp = res?.data?.data?.getListingProducts?.products
      console.log(resp)
      setItems((prev) => [...prev, ...resp]);
      
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const handleScroll = async () => {
    try {
      if (document.documentElement.scrollHeight - window.innerHeight-1 <= document.documentElement.scrollTop
        && page<totalPages
      ) {
        setPage((prev) => (prev + 1))
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
  }, [])

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className=" flex flex-col items-center justify-center">
        <img
          src="https://cdn.shopify.com/s/files/1/0558/4830/4838/products/PRO_8161.jpg?v=1707817130"
          alt="no image"
          className="w-[90%] h-[80%] absolute inset-10 mx-auto"
        />
        <div className="relative italic text-white text-3xl mt-80">#HomeHunts</div>
      </div>
      <div className="mt-60 flex flex-col items-center justify-center">
        <h1 className="text-black font-bold text-3xl">Our Products</h1>
        <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2 mt-10">
          <Items items={items} />
          {loading && 
         <div className="fixed bottom-10 left-1/2 w-20 h-20 transform -translate-x-1/2 text-center">
         <Loading/> 
       </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
