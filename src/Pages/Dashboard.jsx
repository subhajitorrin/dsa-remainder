import React, { useEffect, useRef, useState } from "react";
import UpdateCard from "../Components/UpdateCard";
import axios from "axios";
import { IoMenu } from "react-icons/io5";
import QusList from "../Components/QusList";
import { IoMdSearch } from "react-icons/io";
import UpdateProfile from "../Components/UpdateProfile";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import getUserDetailsWithId from "../firebase/getUserDetailsWithID";
import { doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  BarLoader,
  BeatLoader,
  RingLoader,
  ScaleLoader,
  SyncLoader,
} from "react-spinners";
import Loading from "./Loading";
import data from "../data.json";
import { toast } from "react-toastify";

const dsaCategories = [
  "All",
  "Array",
  "Linked List",
  "Stack",
  "Queue",
  "Tree",
  "Graph",
  "Sorting",
  "Binary Search",
  "Dynamic Programming",
  "Hashing",
  "Bit Manipulation",
];

const difficulties = ["Easy", "Medium", "Hard"];

ChartJS.register(Tooltip, Legend, ArcElement);

function Dashboard({ settriggerUserEffect, isLoggedIn }) {
  const updateRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [cardListToggle, setCardListToggle] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState("");
  const [triggerUserDataFetch, settriggerUserDataFetch] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [disableCategories, setdisableCategories] = useState(false);
  const [disableDifficulties, setdisableDifficulties] = useState(false);
  const [toggleSubscribe, settoggleSubscribe] = useState(null);
  const [disableSubscribe, setDisableSubscribe] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [isLeetcode, setisLeetcode] = useState(null);
  const [username, setUsername] = useState("");
  const [leetcodeDataObj, setleetcodeDataObj] = useState({});
  const [isLeetcodeLoading, setisLeetcodeLoading] = useState(true);
  const [completeLeetcodeData, setcompleteLeetcodeData] = useState(null);
  const [list, setlist] = useState([]);
  const [toggleUpdateProfile, settoggleUpdateProfile] = useState(false);
  const [fakeChart, setFakeChart] = useState({
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#A1A1A1", "#585858", "#262626"],
        hoverOffset: 4,
      },
    ],
  });

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
        // console.log(userData);
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

  async function getLeetcodeData(usern) {
    // console.log(usern);
    const url = `https://leetcode-api-faisalshohag.vercel.app/${usern}`;
    try {
      const response = await axios.get(url);
      const leetdata = response.data;
      return leetdata;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function rerenderUser() {
      if (user) {
        setSelectedCategories(user.category);
        setdisableCategories(false);
        setSelectedDifficulty(user.difficulty);
        setdisableDifficulties(false);
        settoggleSubscribe(user.isSubscribed);
        setDisableSubscribe(false);
        if (user.leetcodeUsername != "" && user.isLeetcode) {
          const leetData = await getLeetcodeData(user.leetcodeUsername);
          setcompleteLeetcodeData(leetData.recentSubmissions);
          const obj = {
            total: leetData.totalSolved,
            easy: leetData.matchedUserStats.acSubmissionNum[1].count,
            medium: leetData.matchedUserStats.acSubmissionNum[2].count,
            hard: leetData.matchedUserStats.acSubmissionNum[3].count,
          };
          setleetcodeDataObj(obj);
          setFakeChart((prev) => ({
            ...prev,
            datasets: [
              {
                ...prev.datasets[0],
                data: [obj.easy, obj.medium, obj.hard],
              },
            ],
          }));
          setisLeetcode(user.isLeetcode);
          setisLeetcodeLoading(false);
        } else {
          setisLeetcodeLoading(false);
        }
      }
    }
    rerenderUser();
  }, [user]);

  async function handelSubscribe() {
    setDisableSubscribe(true);
    const userRef = doc(db, "users", user.id);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const currentUserData = userDoc.data();
        const updatedUserData = {
          ...currentUserData,
          isSubscribed: !currentUserData.isSubscribed,
        };
        await updateDoc(userRef, updatedUserData);
        !currentUserData.isSubscribed ? toast.success("Subscribed to email remainder") : toast.warn("Unsubscribed to email remainder")
        settriggerUserDataFetch((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handelLeetcodeRegister() {
    try {
      if (username.trim() != "") {
        const leetData = await getLeetcodeData(username);
        if (!leetData.recentSubmissions) throw "";
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const currentUserData = userDoc.data();
          const updatedUserData = {
            ...currentUserData,
            isLeetcode: true,
            leetcodeUsername: username,
          };
          await updateDoc(userRef, updatedUserData);
          settriggerUserDataFetch((prev) => !prev);
          toast.success("Leetcode username updated");
        }
      }
    } catch (err) {
      toast.success("Invalid leetcode username !");
    }
  }

  function getTitleSlug(url) {
    const parts = url.split("/");
    const slug = parts[parts.length - 1];
    return slug;
  }

  function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function fetchQuestions() {
    try {
      const qusRef = doc(db, "userQuestions", user.id);
      const qusSnap = await getDoc(qusRef);
      if (qusSnap.exists()) {
        return qusSnap.data().questions;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function getQusProgress() {
      if (completeLeetcodeData && list.length > 0) {
        let onLeetcodeProfileList = [];
        let onFirebaseSendedList = await fetchQuestions();
        completeLeetcodeData.forEach((item) => {
          if (item.statusDisplay == "Accepted") {
            const date = timestampToDate(item.timestamp);
            const obj = {
              slug: item.titleSlug,
              date: date,
            };
            onLeetcodeProfileList.push(obj);
          }
        });
        onFirebaseSendedList = onFirebaseSendedList.map((item) => {
          const slug = getTitleSlug(item.link);
          const match = onLeetcodeProfileList.find(
            (leetcodeItem) => leetcodeItem.slug === slug
          );
          if (match) {
            return { ...item, isSubmitted: true };
          } else {
            return item;
          }
        });
        const qusRef = doc(db, "userQuestions", user.id);
        const obj = {
          questions: onFirebaseSendedList,
        };
        await updateDoc(qusRef, obj);
      }
    }
    getQusProgress();
  }, [completeLeetcodeData, list]);

  // useEffect(() => {
  //   async function getQus() {
  //     const qusRef = doc(db, "questions", "TcxZ0CvO006nzYetWVKv");
  //     const qusDoc = await getDoc(qusRef);
  //     if (qusDoc.exists()) {
  //       console.log(qusDoc.data());
  //       const obj={
  //         list:data
  //       }
  //       await updateDoc(qusRef, obj);
  //     }
  //   }
  //   getQus();
  // }, []);

  useEffect(() => {
    const handleUpdateRefStyle = () => {
      if (updateRef.current) {
        updateRef.current.style.opacity = toggleUpdateProfile ? 1 : 0;
        updateRef.current.style.pointerEvents = toggleUpdateProfile
          ? "auto"
          : "none";
      }
    };
    handleUpdateRefStyle();
  }, [toggleUpdateProfile]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex select-none">
      {
        <UpdateCard
          settoggleUpdateProfile={settoggleUpdateProfile}
          updateRef={updateRef}
          user={user}
          settriggerUserDataFetch={settriggerUserDataFetch}
        />
      }
      <div className="flex flex-col w-[30%] bg-white text-black">
        <div className="flex justify-between items-center px-6 h-[70px] ">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold spacemono border-b">
              {user && user.name}
            </h1>
            <button
              className={`w-[150px] ${
                toggleSubscribe
                  ? "bg-black text-white border border-transparent"
                  : "border border-black "
              } rounded-md px-4 py-1 } ${
                disableSubscribe ? "pointer-events-none" : ""
              }`}
              onClick={handelSubscribe}
            >
              {toggleSubscribe ? "Unsubscribe" : "Subscribe"}
            </button>
            {disableSubscribe ? (
              <ScaleLoader color="#949b99" height={10} width={4} />
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <IoMenu
              className="text-xl cursor-pointer"
              onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu ? (
              <UpdateProfile
                settriggerUserEffect={settriggerUserEffect}
                settoggleUpdateProfile={settoggleUpdateProfile}
                setToggleMenu={setToggleMenu}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {isLeetcodeLoading ? (
          <div className="relative mx-6  h-[40%] flex items-center justify-center mt-[60px] mb-[60px] flex-col gap-5">
            <SyncLoader color="#949b99" margin={5} size={12} />
          </div>
        ) : !isLeetcode ? (
          <div className="relative mx-6  h-[40%] flex items-center justify-center mt-[60px] mb-[60px] flex-col gap-5">
            <input
              type="text"
              placeholder="Enter your leetcode username..."
              className="w-[50%] border border-black outline-none rounded-md px-3 py-1"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              className="w-[150px] rounded-md px-4 py-1 border border-black bg-black text-white"
              onClick={handelLeetcodeRegister}
            >
              Register
            </button>
          </div>
        ) : (
          <>
            <div className="relative mx-6  h-[40%] flex items-center justify-center mt-[60px] mb-[60px] flex-col">
              <h2 className="text-lg font-semibold mb-2">
                Leetcode Data{" "}
                <span className="text-neutral-600">
                  {user.leetcodeUsername}
                </span>
              </h2>
              <p className="absolute top-[50%] text-[25px] font-bold leading-6 text-center">
                Total
                <br />
                {leetcodeDataObj.total}
              </p>
              <Doughnut
                options={{}}
                data={fakeChart}
                className="h-[100px] w-full"
              />
            </div>
          </>
        )}
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
                  defaultChecked={selectedCategories.includes(category)}
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
              onChange={(e) => setsearchText(e.target.value)}
            />
            <IoMdSearch className="text-[20px]" />
          </div>
        </div>
        <div className="h-[88%] bg-transparent p-6 pt-0">
          <div className="h-[30px] w-full flex justify-between items-center py-5 font-[500] text-gray-500">
            <p className="w-[600px] text-center ">Question</p>
            <p className="relative left-4">Category</p>
            <p className="relative left-5">Difficulty</p>
            <p className="relative right-8">Sended at</p>
          </div>
          <QusList
            id={user.id}
            searchText={searchText}
            list={list}
            setlist={setlist}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
