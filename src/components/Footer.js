import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 px-2 bg-graydark">
      <div className="flex-center container text-xs text-gray-300 mx-auto">
        <span>
          &copy; {new Date().getFullYear()} All Right Reserved.
          <Link className="text-blue-400" href="/">
            Next-Ecom
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
