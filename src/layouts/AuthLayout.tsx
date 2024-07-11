import { useCallback, useEffect } from "react";
import useAuthStore from "../stores/AuthStore";
import config from "../config";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { apiBaseUrl } = config;

  const {
    setIsAuthenticated,
    setUser
  } = useAuthStore();

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/status`, {
        credentials: 'include' // Required for cookies
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUser(data.user);
      console.log({ data });

    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }, [setIsAuthenticated, setUser, apiBaseUrl]);


  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus])

  return (
    <>
      {children}
    </>
  )
}