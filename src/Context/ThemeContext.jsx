import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme === "light" ? "light" : "dark");
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
