import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Error = () => {
  const [isDark] = useContext(ThemeContext);
  return (
    <div
      className={`${
        isDark ? "bg-slate-700 text-white" : "bg-white text-black"
      }`}
    >
      Something went wrong.
    </div>
  );
};

export default Error;
