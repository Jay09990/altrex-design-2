import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface LoadingContextType {
  isInitialLoadComplete: boolean;
  setInitialLoadComplete: (complete: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Check if we've already shown the loading screen in this session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("altrex_initial_load_complete");
    if (hasSeenSplash === "1") {
      setIsInitialLoadComplete(true);
    }
  }, []);

  const handleSetComplete = (complete: boolean) => {
    setIsInitialLoadComplete(complete);
    if (complete) {
      sessionStorage.setItem("altrex_initial_load_complete", "1");
    }
  };

  return (
    <LoadingContext.Provider value={{ isInitialLoadComplete, setInitialLoadComplete: handleSetComplete }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
