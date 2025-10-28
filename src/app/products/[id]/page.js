"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState();
  const [success, setSuccess] = useState(true);
  const loadProduct = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const data = await fetch(
        `/api/products/product?productId=${params.id}`,
        requestOptions
      );
      const res = await data.json();

      setSuccess(res.success);
      if (res.success) {
        setItem(res.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const a = async () => {
      loadProduct();
    };
    a();
  }, []);
  if (!success) {
    return notFound();
  }
  return (
    <div className=" container mx-auto bg-slate-50">
      <div className="flex-center">
        {item && (
          <div className="flex flex-col max-w-[890px] gap-4 w-full bg-gray-100 p-4 box-border rounded-lg transition-all hover:shadow-md shadow-blue-300  hover:translate-y-[calc(-2px)] ">
            <div className="h-[350px] w-full z-10 relative bg-gray-200 rounded-lg">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="eager"
                src={item.image || "/ecom.png"}
                className="object-cover object-center rounded-lg"
                alt=""
              />
            </div>
            <div className="flex-between text-3xl">
              <h4 className="font-bold hover:underline underline-offset-2 transition ">
                {item.name}
              </h4>
              <h4 className="font-bold bg-gray-300 px-2 rounded-lg">
                Price: {item.price}$
              </h4>
            </div>
            {/* <h4 className="font-bold text-nowrap overflow-hidden text-ellipsis">{item.name}</h4> */}
            <p
              onClick={() =>
                router.push(`/products/category/${item.category.toLowerCase()}`)
              }
              className="hover:underline cursor-pointer transition-all w-fit text-sm from-gray-700"
            >
              {item.category}
            </p>
            <div className="flex-around flex-wrap py-2">
                  <Button disabled={!item.inStock} onClick={()=> console.log("added cart")}>Add To Cart</Button>
                  <Button disabled={!item.inStock} onClick={()=> console.log("buy now")}>Buy Now</Button>
                </div>
            <div className="flex-between">
              <div className="flex-center gap-2">
                <p className="p-1 rounded-md bg-gray-300">
                  Rating:{item.rating}
                </p>
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
        )}
      </div>
    </div>
  );
};

export default Page;
