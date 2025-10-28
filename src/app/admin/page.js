"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab"));
  const [items, setItems] = useState();

  const editCom = (item) => {
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>;
  };

  useEffect(() => {
    let a = async () => {
      setTab(() => searchParams.get("tab"));
    };
    a();
  }, [router, searchParams]);

  // tab products
  const loadProducts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const data = await fetch("/api/products", requestOptions);
      const res = await data.json();
      if (res.success) {
        setItems(res.result);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const a = async () => {
      loadProducts();
    };
    a();
  }, []);
  //  edit product
  const handleEdit = async (e) => {
    console.log(e);
  };
  const handleDelete = async (e) => {
    console.log(e);
  };

  if (!session) return <div>Loading...</div>;
  return (
    <div className=" max-w-[1980px] mx-auto">
      <div className="head p-3 bg-gray-200 flex-between ">
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <div className="bg-gray-100 rounded-md px-3 py-2 font-bold flex-center flex-col ">
          <span> Welcome, {session.user.name}</span>
          <button
            variant="destructive"
            className="font-light px-3 rounded-md bg-red-500 hover:bg-red-400 active:bg-red-700 transition-all w-fit"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="cont p-2 flex gap-2">
        {/* tabs  */}
        <div className="tabs max-w-[200px] w-full h-fit gap-1 flex-center flex-col">
          <h3 className="flex-center w-full text-lg font-semibold bg-gray-300 rounded-md">
            Quick Tabs
          </h3>
          <Button
            onClick={() => router.push("/admin?tab=home")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Home
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=products")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Products
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=users")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Users
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=messages")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Messages
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=orders")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Orders
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=reports")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Reports
          </Button>
          <Button
            onClick={() => router.push("/admin?tab=catalouge")}
            variant="secondary"
            className="w-full hover:bg-gray-200"
          >
            Catalouge
          </Button>
        </div>

        {/* {container } */}
        <div className="flex-1 bg-gray-100 rounded-md p-2">
          <h2 className="text-lg font-bold ">
            {tab ? tab.toUpperCase() : "HOME"}
          </h2>
          <div className="">
            {/* home tab  */}
            {(tab === "home" || !tab) && (
              <h2 className="text-lg font-bold ">
                {tab ? tab.toUpperCase() : "HOME"}
              </h2>
            )}
            <div className="flex justify-center  items-stretch flex-wrap gap-3 text-black px-3 py-2">
              {items &&
                items.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="flex justify-start items-start flex-col min-w-[180px] max-w-[180px] w-full flex-1 hover:bg-gray-100 bg-gray-200 p-2 box-border rounded-lg transition-all hover:shadow-md shadow-blue-300  hover:translate-y-[calc(-2px)] "
                    >
                      <div className="buttons flex-around text-2xl w-full py-2 rounded-md ">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-full flex-center bg-gray-300 hover:bg-gray-200 active:bg-gray-400 transition-all"
                          type="button"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-full flex-center bg-gray-300 hover:bg-gray-200 active:bg-gray-400 transition-all"
                          type="button"
                        >
                          <MdDelete />
                        </button>
                      </div>
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
                      <div className="flex-between text-[10px] flex-wrap">
                        <div className="flex-center flex-wrap">
                          <p className="p-1 rounded-md bg-gray-300">
                            Rating:{item.rating}
                          </p>
                          <p className="p-1 rounded-md bg-gray-300 overflow-hidden text-ellipsis text-nowrap">
                            Id:{item.productId}
                          </p>
                        </div>
                        {item.inStock ? (
                          <p className="p-1 rounded-md bg-gray-300">In Stock</p>
                        ) : (
                          <p className="p-1 rounded-md bg-red-300">
                            Out of Stock
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
