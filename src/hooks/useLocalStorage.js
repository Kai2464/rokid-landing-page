import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      if (!item) {
        return initialValue;
      }

      return JSON.parse(item);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore localStorage write errors.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}