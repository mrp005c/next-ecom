"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
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
import Image from "next/image";

const DashNav = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({});
  const [openD, setOpenD] = useState(false);
  const router = useRouter();

  const handleEdit = async (e) => {
    setFormData({
      id: e.id,
      email: e.email,
      name: e.name,
      image: e.image,
    });
    setOpenD(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading your page</div>;
  }

  return (
    <div className="w-ful flex-between bg-gray-300 rounded-md container mx-auto px-3 py-4 flex-wrap">
      <Toaster/>
      {/* diagram container  */}
      <Dialog open={openD} onOpenChange={setOpenD}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Make changes to your Profile here. Click save when you&apos;re
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
                  placeholder="Name"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  // onChange={handleChange}
                  disabled
                  value={session.user.email}
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  onChange={handleChange}
                  value={formData.image || ""}
                  name="image"
                  placeholder="Image Link"
                />
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
      <h1 className="text-2xl font-bold flex-center ">Dashboard</h1>
      <div className=" bg-gray-100 p-2 rounded-md flex-between flex-wrap flex-col">
        <div className="flex-center gap-3 ">
          <Image
            height={80}
            width={80}
            className="rounded-full "
            src={session.user.image}
            alt=""
          />
          <div className="flex flex-col w-full overflow-hidden text-ellipsis text-nowrap">
            <span className="text-lg font-bold">{session.user.name}</span>
            <span>{session.user.email}</span>
          </div>
        </div>
        <div className="flex-center flex-wrap gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => handleEdit(session.user)}
            type="button"
          >
            Edit Profile
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => signOut()}
            type="button"
          >
            log Out
          </Button>
        </div>
      </div>
      {/* <div className="head h-12 ">{session.user.name}</div>
          <div className="head h-12 ">
            {session.user.email}
          </div>
 */}
    </div>
  );
};

export default DashNav;
