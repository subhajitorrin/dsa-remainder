import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function UpdateProfile({ settriggerUserEffect }) {
  function handelSignout() {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uid");
    settriggerUserEffect((prev) => !prev);
  }
  return (
    <div className="absolute right-0 w-[200px] border border-black rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-white">
      <p className="transition-all duration-100 ease-linear p-2 pl-4 border-b cursor-pointer hover:bg-[#efefef] rounded-tl-md rounded-tr-md">
        Update profile
      </p>
      <p
        className="transition-all duration-100 ease-linear p-2 pl-4 cursor-pointer hover:bg-[#efefef] rounded-bl-md rounded-br-md"
        onClick={handelSignout}
      >
        Sign out
      </p>
    </div>
  );
}

export default UpdateProfile;
