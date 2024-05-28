import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";

function UpdateProfile({
  settriggerUserEffect,
  settoggleUpdateProfile,
  setToggleMenu,
}) {
  function handelSignout() {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("uid");
    toast.success("Logout Successful");
    settriggerUserEffect((prev) => !prev);
  }
  function handelUpdateProfile() {
    settoggleUpdateProfile((prev) => !prev);
    setToggleMenu((prev) => !prev);
  }
  return (
    <div className="absolute right-0 w-[200px] border border-black rounded-md shadow-lg  bg-white z-10">
      <p
        className="transition-all duration-100 ease-linear p-2 pl-4 border-b cursor-pointer hover:bg-[#efefef] rounded-tl-md rounded-tr-md "
        onClick={handelUpdateProfile}
      >
        Update profile
      </p>
      <p
        className="transition-all duration-100 ease-linear p-2 pl-4 cursor-pointer hover:bg-[#efefef] rounded-bl-md rounded-br-md "
        onClick={handelSignout}
      >
        Sign out
      </p>
    </div>
  );
}

export default UpdateProfile;
