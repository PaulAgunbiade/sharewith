import {useState, useCallback, useEffect} from "react";

export const useAsyncError = () => {
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return useCallback((error: unknown) => {
    setError(error);
  }, []);
};
