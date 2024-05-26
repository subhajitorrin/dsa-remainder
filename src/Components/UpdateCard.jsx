import React from "react";
import { RxCross2 } from "react-icons/rx";

function UpdateCard({ settoggleUpdateProfile, updateRef }) {
  return (
    <div
      className="absolute h-screen w-screen top-0 left-0 flex items-center justify-center updateCardContainer"
      ref={updateRef}
    >
      <div className="relative updateCard flex flex-col justify-center items-center gap-5 rounded-lg">
        <button
          onClick={() => {
            settoggleUpdateProfile((prev) => !prev);
          }}
          className="absolute right-5 top-5"
        >
          <RxCross2 className="text-[20px]" />
        </button>
        <h1 className="text-[30px] font-bold spacemono">Update User</h1>
        <div className="">
          <input
            type="text"
            placeholder="Update profile name..."
            className="w-[300px] outline-none border border-black rounded-tl-md rounded-bl-md px-3 py-2"
          />
          <button className="bg-black text-white px-5 py-2 rounded-tr-md rounded-br-md border border-black">
            Update
          </button>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Update Leetcode username..."
            className="w-[300px] outline-none border border-black rounded-tl-md rounded-bl-md px-3 py-2"
          />
          <button className="bg-black text-white px-5 py-2 rounded-tr-md rounded-br-md border border-black">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCard;
