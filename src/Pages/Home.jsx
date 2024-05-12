import React, { useRef } from "react";
import HomeSection1 from "../Components/HomeSection1";
import HomeSection2 from "../Components/HomeSection2";
import HomeSection3 from "../Components/HomeSection3";
import HomeSection4 from "../Components/HomeSection4";
import Navbar from "../Components/Navbar";
import HomeSection5 from "../Components/HomeSection5";
import Footer from "../Components/Footer";
import RegLog from "../Components/RegLog";

function Home() {
  const logrefsection = useRef(null);
  function handelGotoLogReg() {
    logrefsection.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="">
      <Navbar />
      <HomeSection1 />
      <HomeSection2 />
      <RegLog logrefsection={logrefsection} />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <Footer />
    </div>
  );
}

export default Home;
