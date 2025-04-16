import React from "react";
import { useTheme } from "../hooks/useTheme";

const Error = () => {
  const [isDark] = useTheme();
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
