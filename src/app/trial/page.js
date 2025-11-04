"use client";
import LoadingOverlay from "@/components/modules/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [formData, setFormData] = useState({});
  const [isloading, setIsloading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitAdd = async (e) => {
    setIsloading(true);
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const raw = JSON.stringify(formData);
    const raw = JSON.stringify({
      email: "mrp@gmail.com",
      userInfo: {
        name: "Md Rakib",
        email: "mrp@gmail.com",
        phone: "01928432323",
        address: "Natore",
      },
      products: [
        {
          "pro-1": "this is product 1",
        },
        {
          "pro-2": "this is product 2",
        },
        {
          "pro-3": "this is product 3",
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const add = await fetch("/api/orders", requestOptions);
      const res = await add.json();
      if (res.success) {
        toast.success(res.message);
        setFormData({ image: [""] });
        loadProducts();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <>
    <Toaster/>
    <LoadingOverlay show={isloading} message={"Submitting your Data..."}/>
      <div className="max-w-[600px] bg-gray-200 rounded-md p-3 m-4 mx-auto h-fit">
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                onChange={handleChange}
                value={formData.name || ""}
                name="name"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="proid">Product Id</Label>
              <Input
                id="proid"
                onChange={handleChange}
                value={formData.productId || ""}
                name="productId"
                placeholder="Product Id"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  onChange={handleChange}
                  value={formData.price || ""}
                  id="price"
                  name="price"
                  type="number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Ratings</Label>
                <Input
                  onChange={handleChange}
                  type="number"
                  value={formData.rating || ""}
                  id="price"
                  name="rating"
                />
              </div>
            </div>

            <div className="flex-between flex-wrap gap-2">
              <div className="flex-center">
                <Label htmlFor="instock">In Stock</Label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, inStock: e.target.checked })
                  }
                  className="h-8 rounded-sm w-5 "
                  checked={formData.inStock ?? true}
                  id="instock"
                  name="inStock"
                  type="checkbox"
                />
              </div>
            </div>
          </div>
          <Button type="button" variant="outline">Cancel</Button>
          {/* <Button  type="submit" >Save changes</Button> */}
          <Button type="submit">Save changes</Button>
        </form>
      </div>
      <Button onClick={handleSubmitAdd} variant={"destructive"}>
        Submit Form Test
      </Button>
    </>
  );
};

export default Page;

{
  /* "use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function App() {
  const image = [
    "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    "https://images.unsplash.com/photo-1591775667978-2222e699c77a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    "https://plus.unsplash.com/premium_photo-1681470644798-dd63dc4a0851?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
  ];

  const item = {
    _id: {
      $oid: "6905f93fbe9c6fbc0e4cd99a",
    },
    name: "Smart LED TV 43 Inch",
    image: [
      "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      "https://images.unsplash.com/photo-1591775667978-2222e699c77a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://plus.unsplash.com/premium_photo-1681470644798-dd63dc4a0851?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vbml0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    ],
    price: 599,
    category: "computers",
    rating: 4.8,
    inStock: true,
    productId: "212",
    createdAt: {
      $date: "2025-11-01T12:12:47.866Z",
    },
    updatedAt: {
      $date: "2025-11-01T12:19:09.494Z",
    },
    __v: 0,
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {image && image.map((e, ind)=>  <SwiperSlide key={ind} className="relative"><Image className="object-cover object-center" fill src={e} alt="image" /></SwiperSlide>)}
      </Swiper>
    </>
  );
}
*/
}
