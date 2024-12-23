import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserType } from "@/types/user";
import useAuthStore from "@/stores/AuthStore";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, isAuthenticated, verifyToken, isLoading } = useAuthStore();

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== UserType.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
