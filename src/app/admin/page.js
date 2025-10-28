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
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useConfirmDialog } from "@/components/oui/ConfirmDialog";
import { IoAdd, IoAddCircle, IoReload } from "react-icons/io5";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab"));
  const [items, setItems] = useState();
  const [openD, setOpenD] = useState(false);
  const [openAdd, setOpenAdd] = useState(false)
  const [formData, setFormData] = useState({});
  const [ConfirmDialog, confirm] = useConfirmDialog();

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
    setFormData({
      id: e._id,
      name: e.name,
      image: e.image,
      price: e.price,
      rating: e.rating,
      category: e.category,
      productId: e.productId,
      inStock: e.inStock,
    });
    setOpenD(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const upd = await fetch("/api/products/product", requestOptions);
      const res = await upd.json();
      if (res.success) {
        toast.success(res.message);
        setOpenD(false);
        setFormData({});
        loadProducts();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add product
  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const add = await fetch("/api/products/product", requestOptions);
      const res = await add.json();
      if (res.success) {
        toast.success(res.message);
        setOpenAdd(false);
        setFormData({});
        loadProducts();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Delete product
  const handleDelete = async (e) => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    try {
      const del = await fetch(`/api/products/product?id=${e}`, requestOptions);
      const res = await del.json();

      if (res.success) {
        toast.success(res.message);
        loadProducts();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) return <div>Loading...</div>;
  return (
    <div className=" max-w-[1980px] mx-auto">
      <Toaster />
      {ConfirmDialog}
      {/* diagram container  */}
      <Dialog open={openD} onOpenChange={setOpenD}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Make changes to your productId here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  onChange={handleChange}
                  value={formData.name || ""}
                  name="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  onChange={handleChange}
                  value={formData.image || ""}
                  name="image"
                  placeholder="Product Image Link"
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
                    checked={formData.inStock || false}
                    id="instock"
                    name="inStock"
                    type="checkbox"
                  />
                </div>
                <div className="flex ">
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="ring-1 ring-gray-200"
                    value={formData.category || ""}
                    onChange={handleChange}
                    name="category"
                    placeholder="Select One"
                    id="category"
                  >
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home-appliances">Home Appliances</option>
                    <option value="beauty-health">Beauty & Health</option>
                    <option value="sports-outdoors">Sports & Outdoors</option>
                    <option value="toys-games">Toys & Games</option>
                    <option value="groceries">Groceries</option>
                    <option value="books">Books</option>
                    <option value="furniture">Furniture</option>
                    <option value="mobile">Mobile Phones</option>
                    <option value="computers">Computers & Laptops</option>
                    <option value="watches">Watches</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                    <option value="camera">Cameras & Photography</option>
                    <option value="kitchen">Kitchen Essentials</option>
                    <option value="automotive">Automotive</option>
                    <option value="gaming">Gaming</option>
                    <option value="pets">Pet Supplies</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* <Button  type="submit" >Save changes</Button> */}
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* add */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmitAdd}>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Make changes to your productId here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  onChange={handleChange}
                  value={formData.name || ""}
                  name="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  onChange={handleChange}
                  value={formData.image || ""}
                  name="image"
                  placeholder="Product Image Link"
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
                    checked={formData.inStock || false}
                    id="instock"
                    name="inStock"
                    type="checkbox"
                  />
                </div>
                <div className="flex ">
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="ring-1 ring-gray-200"
                    value={formData.category || ""}
                    onChange={handleChange}
                    name="category"
                    placeholder="Select One"
                    id="category"
                  >
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home-appliances">Home Appliances</option>
                    <option value="beauty-health">Beauty & Health</option>
                    <option value="sports-outdoors">Sports & Outdoors</option>
                    <option value="toys-games">Toys & Games</option>
                    <option value="groceries">Groceries</option>
                    <option value="books">Books</option>
                    <option value="furniture">Furniture</option>
                    <option value="mobile">Mobile Phones</option>
                    <option value="computers">Computers & Laptops</option>
                    <option value="watches">Watches</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                    <option value="camera">Cameras & Photography</option>
                    <option value="kitchen">Kitchen Essentials</option>
                    <option value="automotive">Automotive</option>
                    <option value="gaming">Gaming</option>
                    <option value="pets">Pet Supplies</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* <Button  type="submit" >Save changes</Button> */}
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
          <div className="">

            {/* home tab  */}
            {(tab === "home" || !tab) && (
              <h2 className="text-lg font-bold ">
                HOME
              </h2>
            )}

            {/* Products tab */}
            {tab === "products" && (
              <>
                <div className="flex-between">
                  <h2 className="text-lg font-bold ">
                    {tab ? tab.toUpperCase() : "HOME"}
                  </h2>
                  <div className="buttons flex-center flex-wrap gap-2">
                  <Button onClick={()=> {setOpenAdd(true)
                    if (formData.id) {
                      setFormData({})
                    }
                  }} variant="outline" className="">
                    <IoAdd /> Add New
                  </Button>
                  <Button variant="outline" className="font-bold text-2xl">
                    <IoReload />
                  </Button>
                  </div>
                </div>
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
                            onClick={() => router.push(`/products/${item.productId}`)}
                            className="h-24 w-full z-10 relative cursor-pointer bg-gray-200 rounded-lg"
                          >
                            <Image
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="eager"
                              src={item.image || "/ecom.png"}
                              className="object-cover h-full w-full object-center rounded-lg"
                              alt=""
                            />
                          </div>
                          <div className="flex-between">
                            <h4
                              onClick={() =>
                                router.push(`/products/${item.productId}`)
                              }
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
                              <p className="p-1 rounded-md bg-gray-300">
                                In Stock
                              </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
