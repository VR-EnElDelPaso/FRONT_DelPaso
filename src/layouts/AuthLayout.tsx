import { useCallback, useEffect } from "react";
import useAuthStore from "../stores/AuthStore";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  const {
    setIsAuthenticated,
    setUser
  } = useAuthStore();


  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4006/api/auth/status', {
        credentials: 'include' // Required for cookies
      });
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUser(data.user);
      console.log({ data });

    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }, [setIsAuthenticated, setUser]);


  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus])

  return (
    <>
      {children}
    </>
  )
}