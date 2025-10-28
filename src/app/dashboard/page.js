"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { RiCoupon4Line } from "react-icons/ri";
import { MdManageAccounts, MdOutlinePayment, MdSettings } from "react-icons/md";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <div className="container mx-auto p-2 ">
        {/* other links  */}
        <div className=" flex-center gap-2 flex-wrap p-3 bg-gray-200 rounded-md">
          <button
            className="sec-btn"
            onClick={() => router.push("/dashboard?tab=profile")}
            type="button"
          >
            <MdManageAccounts className="text-4xl" />
            <span className="text-xs">Profile</span>
          </button>
          <button
            className="sec-btn"
            onClick={() => router.push("/dashboard?tab=cart")}
            type="button"
          >
            <IoCartOutline className="text-4xl" />
            <span className="text-xs">Cart</span>
          </button>
          <button
            className="sec-btn"
            onClick={() => router.push("/dashboard?tab=orders")}
            type="button"
          >
            <MdOutlinePayment className="text-4xl" />
            <span className="text-xs">Orders</span>
          </button>
          <button
            className="sec-btn"
            onClick={() => router.push("/dashboard?tab=coupon")}
            type="button"
          >
            <RiCoupon4Line className="text-4xl" />
            <span className="text-xs">Coupon</span>
          </button>
          <button
            className="sec-btn"
            onClick={() => router.push("/dashboard?tab=setting")}
            type="button"
          >
            <MdSettings className="text-4xl" />
            <span className="text-xs">Setting</span>
          </button>
        </div>
        <span> {session.user.id}</span>
      </div>
    );
  }
};

export default Page;
