import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../hooks/useTheme";
import Recents from "../components/Recents";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [isDark] = useTheme();
  const [recentSearches, setRecentSearches] = useOutletContext();

  return (
    <main
      className={`h-[calc(100vh-(61.5px+48px))] flex flex-col gap-8 sm:gap-10 pt-48 items-center ${
        isDark ? "bg-slate-700 text-white" : ""
      }`}
    >
      <Recents recentSearches={recentSearches} />
      <h1 className="font-bold text-[21px] sm:text-3xl md:text-4xl">
        Unlock the Meaning of Words!
      </h1>
      <SearchBar />
      <p
        className={`text-center text-[12px] sm:text-[16px] mx-4 y${
          isDark ? "text-white" : "text-slate-600"
        }`}
      >
        Instantly find clear definitions for any word you're curious about, and
        even {window.innerWidth > 646 ? <br /> : ""} hear exactly how it's
        pronounced!
      </p>
    </main>
  );
};

export default Home;
