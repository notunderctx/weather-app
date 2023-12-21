import React from "react";
import wth from "./4571485.png";
const Header = () => {
  return (
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b border-gray-200">
      <a href="/">
        <img src={wth} height={80} width={80} alt="logo" />{" "}
        <p className=" font-semibold first-letter:text-purple-500 first-letter:font-bold">
          Weather Today
        </p>
      </a>
    </div>
  );
};

export default Header;
