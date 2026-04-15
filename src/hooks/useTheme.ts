import { useEffect, useState } from "react";

const getStoredTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
};

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(getStoredTheme);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getStoredTheme());
    };

    window.addEventListener("storage", handleThemeChange);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const nextTheme = isDark ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      setTheme(nextTheme);
    });

    observer.observe(document.documentElement, { attributes: true });
    handleThemeChange();

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  return theme;
};
