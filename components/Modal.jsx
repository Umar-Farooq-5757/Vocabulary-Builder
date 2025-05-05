import React from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const Modal = ({ recentSearches, isOpen, setIsOpen }) => {
  const [isDark] = useTheme();
  return createPortal(
    <div
      onClick={() => setIsOpen(false)}
      className={`bg-black/30 fixed inset-0  ${isOpen ? "" : "hidden"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed right-[5%] top-[13%] min-w-48 max-h-[70vh] overflow-y-hidden shadow-2xl ${
          isDark ? "bg-slate-900 text-white" : "bg-slate-200 text-black"
        }`}
      >
        {recentSearches.map((el) => (
          <Link key={el} to={`/${el}`}>
            <div
              className={`border border-gray-500 pl-2 py-1 cursor-pointer ${
                isDark ? "hover:bg-slate-600" : "hover:bg-slate-300"
              }`}
              key={el}
            >
              {el}
            </div>
          </Link>
        ))}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
