import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "../Auth/AuthDialog";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const setShowAuthDialog = useState(false)[1];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si no está autenticado, mostrar el diálogo
  if (!isAuthenticated) {
    return (
      <AuthDialog isOpen={true} onClose={() => setShowAuthDialog(false)} />
    );
  }

  return <>{children}</>;
};
