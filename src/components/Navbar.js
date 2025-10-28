"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMenuOutline } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (pathname.toString().includes("dashboard")) {
    // return
  }
  return (
    <header className="flex-center flex-wrap bg-graydark box-border sticky z-40 top-0 w-full text-background">
      <div className="container mx-auto flex-center px-2 py-3 box-border relative">
        {/* main nav  */}
        <div className="w-full flex-between ">
          <Link href="/" className="relative h-12 w-[130px]">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              src="/ecom.png"
              alt="sitelogo"
            />
          </Link>
          <div className="buttons flex-center gap-2">
            {status === "authenticated" ? (
              <div className="flex-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <img
                      className="object-fill rounded-full h-[50px] "
                      src={session.user.image || "/profilea.jpg"}
                      alt="image"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => router.push("/dashboard")}
                      >
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Invite users
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login" className="primary-btn">
                Log In
              </Link>
            )}
            <div className="flex-center flex sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="cursor-pointer text-3xl font-bold flex-center rounded-full hover:bg-gray-500 active:bg-gray-300 transition-all"
                >
                  <IoMenuOutline />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>Navigation Links</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/")}>
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/#about-us")}>
                      About
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/#contact")}>
                      Contact
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => router.push("/products")}>
                      Products
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* sec nav  */}
        <nav className="absolute   sm:flex hidden">
          <ul className="flex-between gap-2">
            <li>
              <Link
                className="hover:bg-gray-400 rounded-md transition-all active:bg-gray-700 p-1"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-400 rounded-md transition-all active:bg-gray-700 p-1"
                href="/#about-us"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-400 rounded-md transition-all active:bg-gray-700 p-1"
                href="/#contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-400 rounded-md transition-all active:bg-gray-700 p-1"
                href="/products"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
