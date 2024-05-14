import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

const dsaCategories = [
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

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
      <div className="w-[70%] bg-gray-200">
        <div className="h-[30%] bg-red-600"></div>
        <div className="h-[70%] bg-green-600"></div>
      </div>
    </div>
  );
}

export default Dashboard;