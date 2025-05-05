import React, { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import Modal from "./Modal.jsx";

const Recents = ({ recentSearches }) => {
  const [isDark] = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`fixed right-10 top-[75px] px-2 py-[3px] rounded-sm ${
        isDark
          ? "bg-slate-800 hover:bg-slate-600"
          : "bg-slate-200 hover:bg-slate-300"
      }`}
    >
      <button
        onClick={() => {
          if (recentSearches.length != 0) {
            setIsOpen(!isOpen);
          } else {
            alert("Search words to create history");
          }
        }}
        className="flex items-center justify-center gap-2 cursor-pointer"
      >
        <FaHistory />
        Recents
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        recentSearches={recentSearches}
      />
    </div>
  );
};

export default Recents;
