import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function App() {
  const [isDark, setisDark] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );
  return (
    <ThemeContext.Provider value={[isDark, setisDark]}>
      <Header />
      <Outlet context={[recentSearches, setRecentSearches]} />
      <Footer />
    </ThemeContext.Provider>
  );
}

export default App;
