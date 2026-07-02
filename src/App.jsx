import { useEffect, useRef, useState } from "react";
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import UseCases from "./components/sections/UseCases";
import Specs from "./components/sections/Specs";
import Newsletter from "./components/sections/Newsletter";
import MiniCommerce from "./components/sections/MiniCommerce";
import Toast from "./components/ui/Toast";
import ScrollProgress from "./components/ui/ScrollProgress";
import SkeletonLoader from "./components/ui/SkeletonLoader";
import Chatbot from "./components/ui/Chatbot";
import { trackingMessages } from "./data/landingData";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);
  const hasTrackedHalfScrollRef = useRef(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  function showToast(message) {
    setToastMessage(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
    }, 3200);
  }

  function closeToast() {
    setToastMessage("");

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
  }

  function handleToggleTheme() {
    toggleDarkMode();
    showToast(
      isDarkMode
        ? "Đã chuyển sang giao diện sáng."
        : "Đã chuyển sang giao diện tối."
    );
  }

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercent = (scrollTop + windowHeight) / documentHeight;

      if (scrollPercent >= 0.5 && !hasTrackedHalfScrollRef.current) {
        hasTrackedHalfScrollRef.current = true;
        showToast(trackingMessages.scrollHalf);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-950 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <ScrollProgress />

      <Header
        onTrack={showToast}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      <Hero onTrack={showToast} />
      <Features />
      <UseCases />
      <Specs />
      <Newsletter onTrack={showToast} />
      <MiniCommerce />

      <Chatbot onTrack={showToast} />
      <Toast message={toastMessage} onClose={closeToast} />
    </div>
  );
}

export default App;