import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import QusCard from "../Components/QusCard";
import { BsCardText } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import QusList from "../Components/QusList";

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

function Dashboard() {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [cardListToggle, setCardListToggle] = useState(true);

  const toggleCategory = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]); // Select only "All"
    } else if (selectedCategories.includes("All")) {
      // If "All" is selected, deselect it and select the clicked category
      setSelectedCategories([category]);
    } else if (selectedCategories.includes(category)) {
      // If the category is already selected, deselect it
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // If the category is not selected, select it
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    console.log(cardListToggle);
  }, [cardListToggle]);

  return (
    <div className="h-screen flex">
      <div className="flex flex-col w-[30%] bg-gray-800 text-white">
        <div className="flex justify-between items-center px-6 h-[70px] ">
          <h1 className="text-2xl font-bold">Subhajit Ghosh</h1>
          <IoMenu className="text-xl cursor-pointer" />
        </div>
        <div className="border border-gray-700 h-[40%] flex items-center justify-center mt-[60px] mb-[60px]">
          Chart
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">
            Choose Question Categories
          </h2>
          <div className="flex flex-wrap">
            {dsaCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-md mr-2 mb-2 
                  ${
                    selectedCategories.includes(category)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
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
          <h2 className="text-lg font-semibold mb-2">Select Difficulty</h2>
          <div className="flex flex-wrap">
            {difficulties.map((difficulty, index) => (
              <label
                key={index}
                className={`inline-flex items-center mr-4 mb-2 cursor-pointer ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                } rounded-full px-4 py-2 transition-all duration-200 ease-in-out`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                <input
                  type="radio"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-gray-200 ">
        <div className="h-[10%] bg-red-600 flex items-center px-6 justify-between">
          <h1 className="text-[40px] font-bold">Dashboard</h1>
          <div className="relative cardListContainer">
            <div className="w-[170px] h-[40px] bg-white rounded-[30px] flex select-none listcardcontainer">
              <div
                className={`transition-all duration-700 flex font-[400] gap-2 items-center w-[50%] justify-center relative z-10 rounded-[30px] cursor-pointer bg-transparent ${
                  cardListToggle ? "text-white font-500" : "text-black"
                }`}
                onClick={() => setCardListToggle(true)}
              >
                <BsCardText /> <p>Card</p>
              </div>
              <div
                className={`transition-all duration-700 flex gap-2 font-[400] items-center w-[50%] justify-center relative z-10 rounded-[30px] cursor-pointer bg-transparent ${
                  !cardListToggle ? "text-white font-500" : "text-black"
                }`}
                onClick={() => setCardListToggle(false)}
              >
                <VscListSelection /> <p>List</p>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out w-[50%] h-full bg-black absolute z-1 rounded-[30px] top-0 ${
                  cardListToggle ? "left-0" : "left-[85px]"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <div className="h-[90%] bg-gray-700 p-6 ">
          <QusList/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
