import React from "react";

function HomeSection4() {
  return (
    <div className=" h-screen pl-20 pr-20  homesection1 ">
      <div
        className="flex items-center"
        style={{ height: "calc(100% - 70px)" }}
      >
        <div className="sectionbody flex flex-col gap-5">
          <h1 class="text-[50px] font-bold leading-tight">
            Improve Your Problem-Solving
            <br />
            Skills
          </h1>
          <p className="font-semibold">
            Sign up for our service and receive daily problem-solving questions taillored to your skill level.
          </p>
          <div className="flex gap-5">
            <button className="pl-5 pr-5 pt-2 pb-2 bg-black text-white">
              Sign Up
            </button>
            <button className="pl-5 pr-5 pt-2 pb-2 bg-tranparent text-black border-black border">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection4;
