import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(isOpen);

  useEffect(() => {
    setShowDialog(isOpen);
  }, [isOpen]);

  const handleLogin = () => {
    navigate("/auth", { state: { from: location } });
  };

  const handleCancel = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-medium text-dark font-kaiseiDecol mb-4">
            Iniciar sesión requerido
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base md:text-lg sm:text-lg">
            Para continuar con tu compra, necesitas iniciar sesión en tu cuenta.
            ¿Deseas ir a la página de inicio de sesión?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className="text-lg text-black/60"
          >
            Volver al carrito
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogin}
            className="text-white text-lg"
          >
            Iniciar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
