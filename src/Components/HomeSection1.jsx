import React, { useContext } from "react";
import { ScrollContext } from "../context/ScrollContext";

function HomeSection1() {
  const {handelScroll}= useContext(ScrollContext);
  return (
    <div className=" h-screen pl-40 pr-40  homesection1 flex">
      <div
        className="flex items-center w-[50%]"
        style={{ height: "calc(100% - 70px)" }}
      >
        <div className="sectionbody flex flex-col gap-5">
          <h1 className="text-[50px] font-bold leading-tight">
            Get Daily DSA <br />
            Question Remainders <br />
            and Ace Your Coding <br />
            Interviews
          </h1>
          <p className="font-semibold">
            Sign up now to receive daily DSA question remainders tailored to
            your <br />
            preferred difficulty level, improve your coding skills and increase
            your <br />
            chances of acting your next coding interview.
          </p>
          <div className="flex gap-5">
            <button className="pl-5 pr-5 pt-2 pb-2 bg-black text-white" onClick={handelScroll}>
              Register
            </button>
            <button className="pl-5 pr-5 pt-2 pb-2 bg-tranparent text-black border-black border">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-[50%] flex justify-center items-center">
        <div className="img1 h-[700px] w-[700px]"></div>
      </div>
    </div>
  );
}

export default HomeSection1;
