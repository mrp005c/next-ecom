import React from "react";
import { MdDeleteOutline, MdDoneOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { IoMailUnreadOutline } from "react-icons/io5";
import { RiMailOpenLine } from "react-icons/ri";

const MessageModule = ({ message, handleDoneMessage, handleDeleteMessage }) => {
  return (
    <div
      className={`p-2 ring-2 space-y-2 text-sm ring-gray-600 rounded-md hover:translate-y-[-2px] transition-all ${
        message.readStatus ? "bg-gray-300 hover:bg-gray-200" : "bg-violet-100 hover:bg-slate-100"
      }`}
    >
      <div className="flex gap-3 flex-wrap bg-violet-300 p-1 rounded-lg">
        <div className="font-semibold ">
          <span className="font-bold">Name:</span> {message.name}
        </div>
        <div className="font-semibold ">
          <span className="font-bold">Email:</span> {message.email}
        </div>
      </div>
      <div className="  bg-violet-200 p-1 rounded-lg">
        <span className="font-bold">Message:</span> {message.message}
      </div>
      <div className="font-bold space-x-3 w-fit ml-auto">
        <Button
          onClick={() => handleDoneMessage(message._id, message.readStatus)}
          className={"cursor-pointer"}
          variant={"outline"}
          size={"icon"}
        >
          {message.readStatus ? <RiMailOpenLine /> : <IoMailUnreadOutline />}
        </Button>
        <Button
          onClick={() => handleDeleteMessage(message._id)}
          className={"cursor-pointer"}
          variant={"outline"}
          size={"icon"}
        >
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
};

export default MessageModule;
