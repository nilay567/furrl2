import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

interface Item {
  image: {
    alt: string;
    src: string;
  };
  brandName: string;
  title: string;
  furrlCheckoutPrice: number;
  furrlPrice: number;
  furrlDiscountPercent: number;
}

interface Props {
  items: Item[] | null;
}

const WishItems: React.FC<Props> = ({ items }) => {
  const router = useRouter();

  return (
    <>
      {items ? (
        items.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            className="mx-1 flex flex-col items-center justify-center" // Reduced margin between cards
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="flex flex-row items-center justify-center">
              <img
                alt={item.image.alt}
                className="h-80 w-80"
                src={item.image.src}
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start mt-2">
              <div className="text-sm text-gray-400 ml-7">
                {item.brandName}
              </div>
              <div
                className="text-sm text-gray-800 ml-7 truncate overflow-hidden whitespace-nowrap text-ellipsis"
                style={{ maxWidth: '20rem' }}
              >
                {item.title}
              </div>
              <div className="flex flex-row ml-7 items-center w-full space-x-3">
                <div className="text-sm font-bold">
                  Rs. {item.furrlCheckoutPrice}
                </div>
                <div className="text-sm text-gray-400 line-through">
                  Rs. {item.furrlPrice}
                </div>
                <div className="text-sm text-gray-800">
                  {item.furrlDiscountPercent}%
                </div>
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

export default WishItems;
