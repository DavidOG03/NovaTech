import { useEffect, useState } from "react";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(getStoredTheme);

  useEffect(() => {
    // Apply theme to DOM on mount
    const currentTheme = getStoredTheme();
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
    setTheme(currentTheme);

    const handleThemeChange = () => {
      const newTheme = getStoredTheme();
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleThemeChange);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const nextTheme = isDark ? "dark" : "light";
      if (localStorage.getItem("theme") !== nextTheme) {
        localStorage.setItem("theme", nextTheme);
        setTheme(nextTheme);
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  return theme;
};
