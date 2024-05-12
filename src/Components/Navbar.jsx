import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Navbar() {
  return (
    <div className="navbar fixed h-[70px]  pl-40 pr-40 w-screen flex items-center justify-between bg-white">
      <div className="flex gap-7 font-semibold">
        <h4>Explore</h4>
        <h4>About Us</h4>
        <h4 className="flex gap-1 items-center">
          Services
          <MdOutlineKeyboardArrowDown className="text-[20px] cursor-pointer" />
        </h4>
      </div>
      <div className="">
        <button className="pl-5 pr-5 pt-2 pb-2 bg-black text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
