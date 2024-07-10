import { useEffect, useState } from "react";
import { User } from "../types/user";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null)


  useEffect(() => {
    checkAuthStatus();
  }, [])


  const checkAuthStatus = async () => {
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
  };

  const handleLogin = () => {
    // window.location.href = 'http://localhost:4006/api/auth/login?redirect_uri=http://localhost:3000/auth/callback';
    window.location.href = 'http://localhost:4006/api/auth/login';
  }

  const handleLogout = async () => {
    window.location.href = 'http://localhost:4006/api/auth/logout';
  }

  return (
    <>
      {user && <p>{user.uCorreo}</p>}
      {
        isAuthenticated
          ? (<button onClick={handleLogout}>Logout</button>)
          : (<button onClick={handleLogin}>Login</button>)
      }
      {children}
    </>
  )
}