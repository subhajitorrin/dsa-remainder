import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function UpdateCard({
  settoggleUpdateProfile,
  updateRef,
  user,
  settriggerUserDataFetch,
}) {
  const [profileName, setProfileName] = useState("");
  const [userName, setuserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handelProfileName() {
    if (profileName.trim() != "") {
      setIsLoading(true);
      const userRef = doc(db, "users", user.id);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const newUserObj = {
            ...userDoc.data(),
            name: profileName,
          };
          await updateDoc(userRef, newUserObj);
          toast.success("Profile name updated");
          setProfileName("");
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        settriggerUserDataFetch((prev) => !prev);
      }
    }
  }

  async function getLeetcodeData(usern) {
    // console.log(usern);
    const url = `https://leetcode-api-faisalshohag.vercel.app/${usern}`;
    try {
      const response = await axios.get(url);
      const leetdata = response.data;
      return leetdata;
    } catch (error) {
      throw new Error("Error fetching data from Leetcode API");
    }
  }

  async function handelUsername() {
    if (userName.trim() != "") {
      try {
        let leetData = await getLeetcodeData(userName);
        if (!leetData.recentSubmissions) throw "";
        setIsLoading(true);
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const newUserObj = {
            ...userDoc.data(),
            leetcodeUsername: userName,
            isLeetcode: true,
          };
          await updateDoc(userRef, newUserObj);
          toast.success("Leetcode username updated");
          setuserName("");
        }
      } catch (err) {
        toast.warn("Invalid leetcode username !");
      } finally {
        settriggerUserDataFetch((prev) => !prev);
        setIsLoading(false);
      }
    }
  }

  return (
    <div
      className="absolute h-screen w-screen top-0 left-0 flex items-center justify-center updateCardContainer"
      ref={updateRef}
    >
      <div className="relative updateCard flex flex-col justify-center items-center gap-5 rounded-xl">
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
            value={profileName}
            onChange={(e) => {
              setProfileName(e.target.value);
            }}
          />
          <button
            className={`bg-black text-white w-[100px] px-5 py-2 rounded-tr-md rounded-br-md border border-black ${
              isLoading ? "pointer-events-none " : ""
            }`}
            onClick={handelProfileName}
          >
            {isLoading ? <BeatLoader color="#949b99" size={3} /> : "Update"}
          </button>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Update Leetcode username..."
            className="w-[300px] outline-none border border-black rounded-tl-md rounded-bl-md px-3 py-2"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          <button
            className={`bg-black text-white px-5 w-[100px] py-2 rounded-tr-md rounded-br-md border border-black ${
              isLoading ? "pointer-events-none " : ""
            }`}
            onClick={handelUsername}
          >
            {isLoading ? <BeatLoader color="#949b99" size={3} /> : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateCard;
