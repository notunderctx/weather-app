import React from "react";
import Header from "./Components/Header";
import { Footer } from "./Components/Footer";
import Weather from "./Components/Weather";

function App() {
  return (
    <div className="">
      <Header />
      <Weather City="London" />
      <div className=" h-48"></div>
      <Footer />
    </div>
  );
}

export default App;
