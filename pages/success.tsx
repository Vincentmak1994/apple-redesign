import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Button";
import Currency from "react-currency-formatter";
import OrderSummary from "../components/OrderSummary";
import { CheckIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import {
  ShoppingCartIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "../utils/fetchLineItems";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}

function Success({ products }: Props) {
  console.log(products);
  const router = useRouter();
  const { session_id } = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subtotal = products.reduce(
    (acc, product) => acc + product.price.unit_amount / 100,
    0
  );


  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  });

  //   check if window screen size is tablet or mobile, return true if so
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <div>
      <Head>
        <title>Thank you!</title>
        <link rel="icon" href="/apple.png" />
      </Head>
      <header className="mx-auto max-w-xl">
        <Link href="/">
          {/* logo is hidden in large screen - different style*/}
          <div className="relative ml-4 h-16 w-8 cursor-pointer py-4 transition lg:hidden">
            <Image src="https://rb.gy/vsvv2o" width={100} height={100} alt="" />
          </div>
        </Link>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            {/* logo is hidden in small screen - different style*/}
            <div className="relative ml-14 hidden h-20 w-20 cursor-pointer transition lg:inline-flex">
              <Image
                src="https://rb.gy/vsvv2o"
                width={100}
                height={100}
                alt=""
              />
            </div>
          </Link>
          <div className="xl:ml-15 my-8 ml-4 flex space-x-4 lg:ml-14">
            <div className="flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
                <CheckIcon className="h-6 w-6" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4>
                Thank you{" "}
                {session
                  ? session.user?.name?.split(" ")[0]
                  : //   session.user?.name?.split(" ")[0].charAt(0).toUpperCase() +
                    //     session.user?.name?.split(" ")[0].slice(1)
                    "Guest"}
              </h4>
            </div>
          </div>

          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14 ">
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">Tracking Number</p>
              <p>ABC123K37</p>
            </div>
          </div>

          <div className="mx-4 my-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You'll get shipping and delivery updates by email and text.
            </p>
          </div>

          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Need help? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "w-full" : undefined}
                padding="py-4"
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300  text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6 ">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  <Currency quantity={subtotal+20} currency="USD" />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && <OrderSummary products={products} />}
          </section>
        )}
      </main>
    </div>
  );
}

export default Success;

// server side rendering
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return {
    props: {
      products,
    },
  };
};
