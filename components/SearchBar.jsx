import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDark] = useTheme();
  const navigate = useNavigate();

  function handleInputChange(e) {
    setInputValue(e.target.value);
    if (e.key == "Enter") {
      navigate(`/${inputValue}`);
    }
  }
  return (
    <div className="flex items-center justify-between gap-1 sm:gap-5 md:gap-6">
      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputChange}
        className={`border border-gray-300 min-w-[18rem] sm:min-w-[34rem] md:min-w-[40rem] outline-none rounded-full shadow-md py-2 pl-4 sm:py-3 sm:pl-8 duration-75 transition-all focus:scale-105 focus:shadow-lg ${
          isDark ? "placeholder:text-white" : "placeholder:text-gray-700"
        }`}
        type="text"
        placeholder="Search for a word..."
      />
      <Link to={`/${inputValue}`}>
        <button className="bg-[#4d6bfe] border border-gray-700 flex justify-center items-center transition-all active:scale-95 hover:scale-105 rounded-full h-[50px] py-0 px-3 sm:p-2 cursor-pointer">
          <MagnifyingGlassIcon className="h-6 w-6 sm:h-9 sm:w-9 text-[#fff] font-extrabold" />
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
