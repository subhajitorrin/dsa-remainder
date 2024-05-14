import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

function QusCard() {
  return (
    <div className="  w-full h-[60px] rounded-[10px] flex items-center justify-between px-5 bg-opacity-6 shadow-md backdrop-filter backdrop-blur-sm border border-white">
      <div className="flex gap-3 items-center">
        <GiConfirmed className="text-green-500 text-[25px]" />
        <h1 className="text-[22px] font-[400]">Container With Most Water</h1>
        <FaExternalLinkAlt className="cursor-pointer" />
      </div>
      <div className="">
        <p className="text-lg text-black font-medium">Array</p>
      </div>
      <div className="">
        <p className="text-lg text-black font-medium">Easy</p>
      </div>
      <div className="">
        <p className="text-lg text-black font-medium">15 May 2024</p>
      </div>
    </div>
  );
}

export default QusCard;
