"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { fetchCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { addToGuestCart } from "./AddtoLocalCart";

const Product = ({ item }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const pathname = usePathname();

   const handleCartLoad = async () => {
    if (session) {
      const userId = session.user.id;
      dispatch(fetchCart(userId));
    }
  };

  const handleAddToCart = async (newCartItem) => {
    if (!session) {
      toast.info("Please Login First.");
      router.push(`/login?redurl=${encodeURIComponent(pathname)}`);
      // addToGuestCart(newCartItem)
      return;
    }


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const withoutid = {...newCartItem}
    delete withoutid._id;

    const raw = JSON.stringify({
      email: session.user.email,
      userId: session.user.id,
      products: withoutid,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const add = await fetch("/api/cart", requestOptions);
      const res = await add.json();
      if (res.success) {
        toast.success(res.message);
        handleCartLoad()
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col max-w-[430px] w-[350px] bg-gray-100 p-2 box-border rounded-lg transition-all hover:shadow-md shadow-blue-300  hover:translate-y-[calc(-2px)] ">
        <Link
          href={`/products/${item.productId}`}
          className="h-[250px] w-full z-10 relative cursor-pointer bg-gray-200 rounded-lg"
        >
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            src={item.image[0] || "/ecom.png"}
            className="object-cover h-full w-full object-center rounded-lg"
            alt=""
          />
        </Link>
        <div className="flex-between">
          <Link
            href={`/products/${item.productId}`}
            className="font-bold hover:underline underline-offset-2 cursor-pointer transition "
          >
            {item.name}
          </Link>
          <h4 className="font-bold bg-gray-300 px-2 rounded-lg">
            ${item.price}
          </h4>
        </div>
        {/* <h4 className="font-bold text-nowrap overflow-hidden text-ellipsis">{item.name}</h4> */}
        <Link
          href={`/products/category/${item.category.toLowerCase()}`}
          className="hover:underline cursor-pointer transition-all w-fit text-sm from-gray-700"
        >
          {item.category}
        </Link>
        <div className="flex-around flex-wrap py-2">
          <Button
            disabled={!item.inStock}
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart
          </Button>
          <Button
            disabled={!item.inStock}
            onClick={() => console.log("buy now")}
          >
            Buy Now
          </Button>
        </div>
        <div className="flex-between text-sm">
          <div className="flex-center gap-2">
            <p className="p-1 rounded-md bg-gray-300">Rating:{item.rating}</p>
            <p className="p-1 rounded-md bg-gray-300">
              ProductId:{item.productId}
            </p>
          </div>
          {item.inStock ? (
            <p className="p-1 rounded-md bg-gray-300">In Stock</p>
          ) : (
            <p className="p-1 rounded-md bg-red-300">Out of Stock</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
