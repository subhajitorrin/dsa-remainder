import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function HomeSection2() {
  return (
    <div className=" h-screen pl-20 pr-20 flex items-center">
      <div className="sectionbody flex flex-col gap-5">
        <h4 className="text-[20px] font-bold">Stay Sharp</h4>
        <h1 className="text-[50px] font-bold leading-tight">
          Never Miss a Daily DSA <br />
          Question <br />
        </h1>
        <p className="font-semibold">
          Get daily remainders with DSA questions delivered straight to your{" "}
          <br />
          mail, Stay sharp and improve your coding skills efforlessly.
        </p>
        <div className="flex gap-5">
          <button className="pl-5 pr-5 pt-2 pb-2 bg-tranparent text-black border-black border">
            Learn More
          </button>
          <button className="pl-5 pr-5 pt-2 pb-2 bg-tranparent text-black flex items-center gap-1">
            Sign Up <MdKeyboardArrowRight className="text-[20px]"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
