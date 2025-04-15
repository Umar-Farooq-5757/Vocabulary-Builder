import React from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Header = () => {
  const [isDark, setisDark] = useContext(ThemeContext);
  return (
    <header
      className={`shadow-md py-1 px-2 sm:px-6 sticky top-0 z-1 ${
        isDark ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      <nav className="flex items-center justify-between max-w-[1100px] mx-auto">
        <h1 className="logo text-[#4d6bfe] font-bold text-[21px] sm:text-[27px]">
          <span className="text-[38px] sm:text-5xl">V</span>OCABULARY{" "}
          <span className="text-[38px] sm:text-5xl">B</span>UILDER
        </h1>
        <div
          onClick={() => {
            setisDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          {isDark ? (
            <SunIcon className="h-8 w-8 cursor-pointer" />
          ) : (
            <MoonIcon className="h-7 w-7 cursor-pointer" />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
