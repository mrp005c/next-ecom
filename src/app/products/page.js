"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoReloadCircleOutline } from "react-icons/io5";

const Page = () => {
  const [items, setItems] = useState();
  const router = useRouter();
  const loadProducts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
try {
    const data = await fetch("/api/products", requestOptions)
    const res = await data.json()
    if (res.success) {
      setItems(res.result)
    }else{
      alert(res.message)
    }
} catch (error) {
  console.log(error)
}
  
     
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className=" container mx-auto">
      <div className="flex-between bg-gray-200 px-3">
        <h1 className="text-2xl font-bold py-4 ">All Products</h1>
        <button
          className="text-2xl font-bold cursor-pointer "
          onClick={loadProducts}
        >
          <IoReloadCircleOutline />
        </button>
      </div>
      <div className="flex-center flex-wrap gap-3 text-black px-3 py-2">
        {items &&
          items.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-col max-w-[430px] w-full bg-gray-100 p-2 box-border rounded-lg transition-all hover:shadow-md shadow-blue-300  hover:translate-y-[calc(-2px)] "
              >
                <div
                  onClick={() => router.push(`/products/${item._id}`)}
                  className="h-24 w-full z-10 relative cursor-pointer bg-gray-200 rounded-lg"
                >
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                    priority={false}
                    src={item.image || "/ecom.png"}
                    className="object-contain object-center rounded-lg"
                    alt=""
                  />
                </div>
                <div className="flex-between">
                  <h4
                    onClick={() => router.push(`/products/${item._id}`)}
                    className="font-bold hover:underline underline-offset-2 cursor-pointer transition "
                  >
                    {item.name}
                  </h4>
                  <h4 className="font-bold bg-gray-300 px-2 rounded-lg">
                    ${item.price}
                  </h4>
                </div>
                {/* <h4 className="font-bold text-nowrap overflow-hidden text-ellipsis">{item.name}</h4> */}
                <p
                  onClick={() =>
                    router.push(
                      `/products/category/${item.category.toLowerCase()}`
                    )
                  }
                  className="hover:underline cursor-pointer transition-all w-fit text-sm from-gray-700"
                >
                  {item.category}
                </p>
                <div className="flex-around flex-wrap py-2">
                  <Button disabled={!item.inStock} onClick={()=> console.log("added cart")}>Add To Cart</Button>
                  <Button disabled={!item.inStock} onClick={()=> console.log("buy now")}>Buy Now</Button>
                </div>
                <div className="flex-between text-sm">
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
            );
          })}
      </div>
    </div>
  );
};

export default Page;
