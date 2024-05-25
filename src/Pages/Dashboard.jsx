import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import QusList from "../Components/QusList";
import { IoMdSearch } from "react-icons/io";
import UpdateProfile from "../Components/UpdateProfile";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import getUserDetailsWithId from "../firebase/getUserDetailsWithID";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BarLoader, BeatLoader } from "react-spinners";

const dsaCategories = [
  "All",
  "Array",
  "LinkedList",
  "Stack",
  "Queue",
  "Tree",
  "Graph",
  "Sorting",
  "Searching",
  "Dynamic Programming",
  "Hashing",
  "Bit Manipulation",
];

const difficulties = ["Easy", "Medium", "Hard"];

const fakeChart = {
  labels: ["Array", "LinkedList", "Stack", "Queue", "Tree"],
  datasets: [
    {
      data: [200, 100, 300, 100, 100],
      backgroundColor: [
        "rgba(255,99,132,0.9)",
        "rgba(23, 212, 127, 0.9)",
        "rgba(161, 65, 190, 0.9)",
        "rgba(194, 140, 52, 0.9)",
        "rgba(54,162,235,0.9)",
      ],
      hoverOffset: 4,
    },
  ],
};

ChartJS.register(Tooltip, Legend, ArcElement);

function Dashboard({ settriggerUserEffect, isLoggedIn }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [cardListToggle, setCardListToggle] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState("");
  const [triggerUserDataFetch, settriggerUserDataFetch] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [disableCategories, setdisableCategories] = useState(false);
  const [disableDifficulties, setdisableDifficulties] = useState(false);

  const toggleCategory = (category) => {
    setdisableCategories(true);
    let result;
    if (category === "All") {
      result = ["All"];
    } else if (selectedCategories.includes("All")) {
      // If "All" is selected, deselect it and select the clicked category
      result = [category];
    } else if (selectedCategories.includes(category)) {
      // If the category is already selected, deselect it
      result = selectedCategories.filter((c) => c !== category);
    } else {
      // If the category is not selected, select it
      result = [...selectedCategories, category];
    }
    setSelectedCategories(result);
    updateUser(null, result);
  };

  function handelDifficulty(difficulty) {
    setdisableDifficulties(true);
    setSelectedDifficulty(difficulty);
    updateUser(difficulty, null);
  }

  useEffect(() => {
    async function setUserAfterLogin() {
      if (isLoggedIn) {
        const useruid = localStorage.getItem("uid");
        const userData = await getUserDetailsWithId(useruid);
        setUser(userData);
        console.log(userData);
        setisLoading(false);
      }
    }
    setUserAfterLogin();
  }, [settriggerUserEffect, triggerUserDataFetch]);

  async function updateUser(difficulty, category) {
    const userRef = doc(db, "users", user.id);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentUserData = userDoc.data();
        if (difficulty) {
          const updatedUserData = {
            ...currentUserData,
            difficulty: difficulty,
          };
          await updateDoc(userRef, updatedUserData);
        } else {
          const updatedUserData = {
            ...currentUserData,
            category: category,
          };
          await updateDoc(userRef, updatedUserData);
        }
        settriggerUserDataFetch((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) {
      setSelectedCategories(user.category);
      setdisableCategories(false);
      setSelectedDifficulty(user.difficulty);
      setdisableDifficulties(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <BeatLoader color="#949b99" />
      </div>
    );
  } else {
    return (
      <div className="h-screen flex select-none">
        <div className="flex flex-col w-[30%] bg-white text-black">
          <div className="flex justify-between items-center px-6 h-[70px] ">
            <h1 className="text-2xl font-bold spacemono border-b">
              {user && user.name}
            </h1>
            <div className="relative">
              <IoMenu
                className="text-xl cursor-pointer"
                onClick={() => setToggleMenu((prev) => !prev)}
              />
              {toggleMenu ? (
                <UpdateProfile settriggerUserEffect={settriggerUserEffect} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="relative mx-6  h-[40%] flex items-center justify-center mt-[60px] mb-[60px]">
            <p className="absolute top-[50%] text-[25px] font-bold leading-6 text-center">
              Total
              <br />
              60
            </p>
            <Doughnut
              options={{}}
              data={fakeChart}
              className="h-[100px] w-full"
            />
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">
              Choose Question Categories
              {disableCategories ? (
                <BarLoader color="#a0a8a6" height={2} width={60} />
              ) : (
                <div className="h-[2px]"></div>
              )}
            </h2>
            <div
              className={`flex flex-wrap ${
                disableCategories ? "pointer-events-none" : ""
              }`}
            >
              {dsaCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => toggleCategory(category)}
                  className={`shadow-lg backdrop-filter backdrop-blur-sm ease-linear px-4 py-2 rounded-md mr-2 mb-2 
                  ${
                    selectedCategories.includes(category)
                      ? "bg-black text-white border border-transparent"
                      : "border border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    className="hidden"
                  />
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">
              Select Difficulty{" "}
              {disableDifficulties ? (
                <BarLoader color="#a0a8a6" height={2} width={60} />
              ) : (
                <div className="h-[2px]"></div>
              )}
            </h2>
            <div
              className={`flex flex-wrap ${
                disableDifficulties ? "pointer-events-none" : ""
              }`}
            >
              {difficulties.map((difficulty, index) => (
                <label
                  key={index}
                  className={`shadow-xl backdrop-filter backdrop-blur-sm inline-flex items-center mr-4 mb-2 cursor-pointer ${
                    selectedDifficulty === difficulty
                      ? "bg-black text-white border border-transparent"
                      : "border border-black hover:bg-black hover:text-white"
                  } rounded-full px-4 py-2 `}
                  onClick={() => handelDifficulty(difficulty)}
                >
                  {difficulty}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[70%] bg-white text-black border-l">
          <div className="h-[10%] bg-transparent flex items-center px-6 justify-between border-b">
            <h1 className="text-[40px] font-bold spacemono">Dashboard</h1>
            <div className="flex items-center border border-black border-opacity-20 p-2 rounded-2xl px-5 ">
              <input
                type="text"
                placeholder="Search for question..."
                className="outline-none pr-2 w-[300px]"
              />
              <IoMdSearch className="text-[20px]" />
            </div>
          </div>
          <div className="h-[88%] bg-transparent p-6 pt-0">
            <div className="h-[30px] w-full flex justify-between items-center py-5 font-[500] text-gray-500">
              <p className="w-[600px] text-center ">Question</p>
              <p className="relative left-1">Category</p>
              <p className="relative right-7">Difficulty</p>
              <p className="relative right-8">Sended at</p>
            </div>
            <QusList />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
