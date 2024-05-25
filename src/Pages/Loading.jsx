import React from "react";
import { BeatLoader } from "react-spinners";

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <BeatLoader color="#949b99" />
    </div>
  );
}

export default Loading;
