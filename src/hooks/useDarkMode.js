import { useEffect, useState } from "react";

const STORAGE_KEY = "rokid-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "dark") {
    return true;
  }

  if (savedTheme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const rootElement = document.documentElement;

    if (isDarkMode) {
      rootElement.classList.add("dark");
      localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem(STORAGE_KEY, "light");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((currentValue) => !currentValue);
  }

  return {
    isDarkMode,
    toggleDarkMode,
  };
}