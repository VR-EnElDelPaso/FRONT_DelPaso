import { useCallback, useEffect} from "react";
import useAuthStore from "../stores/AuthStore";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
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

  const handleLogin = () => {
    // posible manera de redirección, requiere configuración en el servidor
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