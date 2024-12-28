import { useEffect, useState } from "react";
export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error("Error reading localStorage key:", key, e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("Error writing localStorage key:", key, e);
    }
  }, [key, state]); // Add key to the dependency array

  return [state, setState];
}
