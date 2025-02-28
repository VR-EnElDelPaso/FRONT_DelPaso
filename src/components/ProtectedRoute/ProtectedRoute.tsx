import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "../Auth/AuthDialog";
import Loader from "@/shared/components/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const setShowAuthDialog = useState(false)[1];

  if (isLoading) {
    return <Loader />;
  }

  // Si no está autenticado, mostrar el diálogo
  if (!isAuthenticated) {
    return (
      <AuthDialog isOpen={true} onClose={() => setShowAuthDialog(false)} />
    );
  }

  return <>{children}</>;
};
