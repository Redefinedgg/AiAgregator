// hooks/useHydration.ts
import { useEffect, useState } from 'react';

/**
 * Custom hook to safely handle client-side hydration
 * Returns true only after the component has mounted on the client
 * This prevents hydration mismatches when using client-only features
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook specifically for Zustand stores with persistence
 * Combines hydration check with store hydration status
 */
export function useStoreHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // Small delay to ensure Zustand has time to rehydrate
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return isHydrated;
}