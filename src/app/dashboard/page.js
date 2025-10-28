"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePaid } from "react-icons/md";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  if (status === "authenticated") {
    return (
      <div className="container mx-auto p-2 ">
        <div className=" bg-gray-100 p-3 rounded-md flex-between flex-wrap">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{session.user.name}</span>
            <span>{session.user.email}</span>
          </div>
          <div className="flex-center gap-2">
            <Button
            className="cursor-pointer"
              variant="outline"
              onClick={() => console.log("edit")}
              type="button"
            >
              Edit Profile
            </Button>
            <Button  className="cursor-pointer" onClick={() => signOut()} type="button">
              log Out
            </Button>
          </div>
        </div>

 {/* other links  */}
        <div className="text-2xl flex-center gap-2 flex-wrap p-3 bg-gray-200 rounded-md">

        <button className="px-4 py-2 rounded-md ring-2 ring-gray-600 font-bold bg-gray-50 hover:bg-gray-200 active:bg-gray-300" onClick={()=> router.push("/dashboard?tab=cart")} type="button"><IoCartOutline/></button>
        <button className="px-4 py-2 rounded-md ring-2 ring-gray-600 font-bold bg-gray-50 hover:bg-gray-200 active:bg-gray-300" onClick={()=> router.push("/dashboard?tab=cart")} type="button"><IoCartOutline/></button>
        <button className="px-4 py-2 rounded-md ring-2 ring-gray-600 font-bold bg-gray-50 hover:bg-gray-200 active:bg-gray-300" onClick={()=> router.push("/dashboard?tab=cart")} type="button"><IoCartOutline/></button>
        <button className="px-4 py-2 rounded-md ring-2 ring-gray-600 font-bold bg-gray-50 hover:bg-gray-200 active:bg-gray-300" onClick={()=> router.push("/dashboard?tab=cart")} type="button"><IoCartOutline/></button>
        <button className="px-4 py-2 rounded-md ring-2 ring-gray-600 font-bold bg-gray-50 hover:bg-gray-200 active:bg-gray-300" onClick={()=> router.push("/dashboard?tab=cart")} type="button"><MdOutlinePaid/></button>
        </div>
        <span> {session.user.id}</span>
      </div>
    );
  }
};

export default Page;
