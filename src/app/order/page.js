"use client";
import CartProductItem from "@/components/modules/cartProduct";
import LoadingOverlay from "@/components/modules/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCart } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const [isloading, setIsloading] = useState(false);
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({});

  const handleCartLoad = async () => {
    if (session) {
      const userId = session.user.id;
      dispatch(fetchCart(userId));
    }
  };

  const handleRomoveFromCart = async (newCartItem) => {
    if (!session) {
      toast.info("Please Login First.");
      router.push("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: session.user.email,
      userId: session.user.id,
      products: newCartItem,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const add = await fetch("/api/cart", requestOptions);
      const res = await add.json();
      if (res.success) {
        toast.success(res.message);
        await handleCartLoad();
      } else {
        console.log("object");
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?redurl=${encodeURIComponent("/order")}`);
    }
  }, [router, status]);

  useEffect(() => {
    handleCartLoad();
  }, [session]);

  useEffect(() => {
    setFormData({ ...formData, products: cartItems });
  }, [cartItems]);

  useEffect(() => {
    if (session) {
      setFormData({
        userId: session.user.id,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        phone: session.user.phone ?? "",
        address: session.user.address ?? "",
        products: cartItems ?? [],
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (formData.products.length === 0) {
      toast.error("Please add a Product.")
      return
    }
    setIsloading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const raw = JSON.stringify(formData);
    const raw = JSON.stringify(formData);

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
        const myHeadersd = new Headers();
        myHeadersd.append("Content-Type", "application/json");

        const requestOptionsd = {
          method: "DELETE",
          headers: myHeadersd,
          redirect: "follow",
        };
        try {
          const id = session.user.id;
          const data = await fetch(`/api/cart?id=${id}`, requestOptionsd);
          const res = await data.json();
          if (res.success) {
           await handleCartLoad()
          }
        } catch (error) {
          console.log(error);
        }
        setFormData({ image: [""] });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  if (!session) {
    return <LoadingOverlay show={true} message={"Loading..."} />;
  }

  return (
    <>
      <Toaster />
      <LoadingOverlay show={isloading} message={"Order in Progress..."} />
      <div>
        <h2 className="text-2xl font-bold m-2 flex-center">Place A Order</h2>
        <div className="max-w-[600px] bg-gray-200 rounded-md p-3 m-4 mx-auto h-fit">
          <form onSubmit={handleSubmitOrder}>
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
                <Label htmlFor="email-1">Email</Label>
                <Input
                  id="email-1"
                  onChange={handleChange}
                  value={formData.email || ""}
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="price">Phone</Label>
                  <Input
                    onChange={handleChange}
                    value={formData.phone || ""}
                    id="phone"
                    name="phone"
                    type="number"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    onChange={handleChange}
                    type="text"
                    value={formData.address || ""}
                    id="address"
                    name="address"
                  />
                </div>
              </div>
              {/* Cart items */}
              <div className="p-2 bg-gray-100 rounded-md flex-center flex-col gap-2">
                {cartItems && cartItems.length > 0 ?
                  cartItems.map((item) => (
                    <CartProductItem
                      key={item.cartP}
                      item={item}
                      handleRomoveFromCart={handleRomoveFromCart}
                    />
                  )): <h1>No item to show!</h1>}
              </div>

              <div className="calculate flex-between justify-end text-md bg-background p-2 font-bold gap-3 flex-wrap">
                <span>Items: {cartItems && cartItems.length}</span>
                <span>
                  Total Price:
                  {cartItems &&
                    cartItems.length > 0 ?
                    cartItems.reduce((a, b) => a + b.price, 0): 0}
                </span>
              </div>
            </div>
            {/* <Button  type="submit" >Save changes</Button> */}
            <Button type="submit" className={"flex-center w-full my-2"}>
              Order Now
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
