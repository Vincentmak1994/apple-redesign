import React, { useState, useEffect } from "react";
import Image from "next/image";
import Currency from "react-currency-formatter";

interface Props {
  products: StripeProduct[];
}

function OrderSummary({ products }: Props) {
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: StripeProduct[] }
  );
  useEffect(() => {
    const groupedItems = products.reduce((results, item) => {
      (results[item.price.product] = results[item.price.product] || []).push(item);
      return results;
    }, {} as { [key: string]: StripeProduct[] });
    setGroupedItemsInBasket(groupedItems);
  }, [products]);

  return (
    <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
      <div className="space-y-4 pb-4">
        {Object.entries(groupedItemsInBasket).map(([key, products]) => (
          <div
            key={products[0].id}
            className="flex items-center space-x-4 text-sm font-medium"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white">
              <div className="relative h-7 w-7 animate-bounce rounded-md">
                <Image src="https://rb.gy/vsvv2o" fill alt="" />
              </div>
              <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                {products.length}
              </div>
            </div>
            <p className="flex-1">{products[0].description}</p>
            <p>
              <Currency
                quantity={
                  (products[0].price.unit_amount / 100) * products.length
                }
                currency={products[0].currency}
              />
            </p>
          </div>
        ))}
        {/* {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center space-x-4 text-sm font-medium"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white">
              <div className="relative h-7 w-7 animate-bounce rounded-md">
                <Image src="https://rb.gy/vsvv2o" fill alt="" />
              </div>
              <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                {product.quantity}
              </div>
            </div>
            <p className="flex-1">{product.description}</p>
            <p>
              <Currency
                quantity={product.price.unit_amount / 100}
                currency={product.currency}
              />
            </p>
          </div>
        ))} */}
      </div>
      <div className="space-y-1 py-4 ">
        <div className="flex justify-between text-sm">
          <p className="text-[gray]">Subtotal</p>
          <p className="font-medium">
            <Currency quantity={subtotal} currency="USD" />
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-[gray]">Discount</p>
          <p className="text-[gray]"></p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-[gray]">Shipping</p>
          <p className="font-medium">
            <Currency quantity={20} currency="USD" />
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <p>Total</p>
        <p className="flex items-center gap-x-2 text-xs text-[gray]">
          USD
          <span className="text-xl font-medium text-black">
            <Currency quantity={subtotal + 20} />
          </span>
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;
