import React, { useEffect, useState } from "react";
import QusCard from "./QusCard";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { RotateLoader } from "react-spinners";

function QusList({ id }) {
  const [list, setlist] = useState([]);
  const [isloadingQus, setisloadingQus] = useState(true);
  useEffect(() => {
    async function fetchQuestions() {
      setisloadingQus(true);
      const qusRef = doc(db, "userQuestions", id);
      const qusSnap = await getDoc(qusRef);
      if (qusSnap.exists()) {
        setlist(qusSnap.data().questions);
      }
      setisloadingQus(false);
    }
    fetchQuestions();
  }, []);
  if (isloadingQus) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <RotateLoader color="#949b99" />
      </div>
    );
  }
  return (
    <div className="h-full  overflow-x-auto quslistcontainer ">
      {list.map((item, index) => {
        console.log(item);
        return <QusCard key={index} qus={item}/>;
      })}
    </div>
  );
}

export default QusList;
