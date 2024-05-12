import React from "react";

function HomeSection3() {
  return (
    <div className="h-screen pl-40 pr-40 flex">
      <div className=" w-[50%] flex items-center justify-center">
        <div className="img5 h-[700px] w-[700px]"></div>
      </div>
      <div className=" w-[50%]  h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-5">
          <div className="">
            <h1 className="text-[40px] font-bold leading-tight">
              Customizable Difficulty Selection
            </h1>
            <p className="font-semibold">
              Choose the level of difficulty for your daily questions and
              challenge yourself
            </p>
          </div>
          <div className="">
            <h1 className="text-[40px] font-bold leading-tight">
              Progress Tracking
            </h1>
            <p className="font-semibold">
              Track your progress over time and see how you are improving
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection3;
