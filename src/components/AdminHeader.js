"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminHeader = () => {
  const { data: session, status } = useSession();

  if (session && session.user.role === "admin") {
    return (
      <div className="h-8 w-full bg-gray-700 text-white text-sm flex-between px-2 md:px-3 sticky top-0 z-60">
        <h3 className="text-lg font-bold space-x-2">
          <Link href="/admin" className="px-2 py-1 rounded-sm bg-gray-600">
            Admin Panel
          </Link>
          <Link href="/" className="px-2 py-1 rounded-sm bg-gray-600">
            Site
          </Link>
        </h3>
        <div className="text-xs overflow-hidden text-ellipsis">
          <Link href={"/dashboard"}>{session.user.email}</Link>
        </div>
      </div>
    );
  }
  return;
};

export default AdminHeader;
