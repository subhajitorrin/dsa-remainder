import React, { useEffect, useState } from "react";
import QusCard from "./QusCard";
import { db } from "../firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { RotateLoader } from "react-spinners";

function QusList({ id, searchText, list, setlist }) {
  const [filteredList, setfilteredList] = useState([]);
  const [isloadingQus, setisloadingQus] = useState(true);
  useEffect(() => {
    async function fetchQuestions() {
      setisloadingQus(true);
      const qusRef = doc(db, "userQuestions", id);
      onSnapshot(qusRef, (qusSnap) => {
        if (qusSnap.exists()) {
          setlist(qusSnap.data().questions);
        } else {
          setlist([]);
        }
        setisloadingQus(false);
      });
    }
    fetchQuestions();
  }, []);

  function getLeetCodeTitle(url) {
    // Split the URL by '/' and get the last part
    const parts = url.split("/");
    const slug = parts[parts.length - 1];

    // Split the slug by '-' and capitalize each word
    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return title;
  }

  useEffect(() => {
    if (list.length > 0) {
      const result = list.filter((item) => {
        const qus = getLeetCodeTitle(item.link).toLowerCase();
        return qus.includes(searchText.toLowerCase());
      });
      setfilteredList(result);
    }
  }, [searchText]);

  if (isloadingQus) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <RotateLoader color="#949b99" />
      </div>
    );
  }

  if (searchText != "") {
    return (
      <div className="h-full  overflow-x-auto quslistcontainer ">
        {filteredList.map((item, index) => {
          // console.log(item);
          return <QusCard key={index} qus={item} />;
        })}
      </div>
    );
  }
  return (
    <div className="h-full  overflow-x-auto quslistcontainer ">
      {list.map((item, index) => {
        // console.log(item);
        return <QusCard key={index} qus={item} />;
      })}
    </div>
  );
}

export default QusList;
