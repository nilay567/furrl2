import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

interface CartItem {
  imageUrl: string;
  productName: string;
  brandName: string;
  size: string;
  furrlCheckoutPrice: number;
  furrlPrice: number;
  furrlDiscountPercent: number;
  quantity: number;
}

interface Props {
  items: CartItem[] | null;
}

const CartItems: React.FC<Props> = ({ items }) => {
  const router = useRouter();

  return (
    <>
      {items ? (
        items.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            className="mx-1 flex flex-col items-center justify-center"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="flex flex-row items-center justify-center">
              <img
                alt="image not available"
                className="h-80 w-80"
                src={item.imageUrl}
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start mt-2">
              <div className="text-sm text-gray-800 ml-7">
                {item.productName}
              </div>
              <div
                className="text-sm text-purple-700 ml-7 truncate overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ maxWidth: '20rem' }}
              >
                {item.brandName}
              </div>
              <div className="text-sm text-gray-700 ml-7">
                {item.size !== "Default Title" && item.size}
              </div>
              <div className="flex flex-row ml-7 items-center w-full space-x-3">
                <div className="text-sm font-bold">
                  Rs. {item.furrlCheckoutPrice}
                </div>
                <div className="text-sm text-gray-500 font-bold line-through">
                  Rs. {item.furrlPrice}
                </div>
                <div className="text-sm text-gray-800">
                  {item.furrlDiscountPercent}%
                </div>
              </div>
              <div className="flex items-center ml-7 mt-2">
                <span className="text-sm text-gray-700 mr-2">Quantity:</span>
                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                  -
                </button>
                <span className="text-sm text-gray-700 mx-2">{item.quantity}</span>
                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                  +
                </button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>no image</div>
      )}
    </>
  );
};

export default CartItems;
