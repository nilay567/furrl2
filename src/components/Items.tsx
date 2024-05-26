// Items.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Share from "@/components/Share";

interface Item {
  id: string;
  title: string;
  images: { src: string }[];
  brand: { name: string }[];
  MRP: { value: number };
  price: { value: number };
  discountPercent: number;
}

interface Props {
  items: Item[] | null;
}

const Items: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const [share, setShare] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const toggleShare = (itemId?: string) => { // Optional parameter
    setShare(!share);
    if (itemId) {
      setId(itemId);
    }
  };

  return (
    <>
      {items ? (
        items.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            className={`mx-1 flex flex-col items-center justify-center ${
              share ? "opacity-50" : ""
            }`}
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="flex flex-row items-center justify-center">
              <img
                alt={item.title}
                className="h-80 w-80"
                src={item.images[0]?.src || ""}
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start mt-2">
              <div className="text-sm text-gray-600 ml-7">
                {item.brand[0]?.name || ""}
              </div>
              <div
                className="text-sm text-gray-800 ml-7 truncate overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ maxWidth: "20rem" }}
              >
                {item.title}
              </div>
              <div className="flex flex-row ml-7 items-center w-full space-x-3">
                <div className="text-sm font-bold">
                  Rs. {item.MRP?.value || 0}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  Rs. {item.price?.value || 0}
                </div>
                <div className="text-sm text-purple-900">
                  {item.discountPercent}%
                </div>
                <button
                  className="text-sm border border-gray-600 rounded-md px-4 py-2 bg-gray-600 hover:scale-110 transform transition duration-300 ease-in-out"
                  onClick={() => toggleShare(item.id)}
                >
                  <img src="/share.svg" alt="Share Icon" />
                </button>
                {share && <Share toggleShare={() => toggleShare()} id={id} />} {/* Pass function without arguments */}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>No items available</div>
      )}
    </>
  );
};

export default Items;
