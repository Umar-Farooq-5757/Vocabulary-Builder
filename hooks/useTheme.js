import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
export function useTheme() {
  const [isDark, setIsDark] = useContext(ThemeContext);
  return [isDark, setIsDark];
}
