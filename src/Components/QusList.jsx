import React, { useState } from "react";
import QusCard from "./QusCard";

function QusList() {
  const [list, setlist] = useState([1, 2, 3, 4, 5, 6,1,1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1]);
  return (
    <div className="h-full  overflow-x-auto quslistcontainer ">
      {list.map((item, index) => {
        return <QusCard key={index}/>;
      })}
    </div>
  );
}

export default QusList;
