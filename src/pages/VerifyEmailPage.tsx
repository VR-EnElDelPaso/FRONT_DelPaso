import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { verifyEmail } from "@/services/auth.services";
import Loader from "@/shared/components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const VerifyEmailPage = () => {
  // ---- States ----
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // ---- Hooks ----
  const { token } = useParams();

  // ---- Callbacks ----
  const verifyEmailRequest = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      await verifyEmail(token);
      toast({
        title: "Verificación de correo electrónico exitosa",
        description: "Tu correo electrónico ha sido verificado correctamente.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error verifying email:", error);
      setIsError(true);
      toast({
        title: "Error al verificar el correo electrónico",
        description: "El enlace de verificación es incorrecto o ha expirado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // ---- Effects ----
  useEffect(() => {
    verifyEmailRequest();
  }, [verifyEmailRequest]);

  // ---- Render ----
  return (
    <div
      className={`font-inter text-dark min-h-screen bg-[url('/assets/auth/images/auth-bg.png')] bg-cover bg-center flex items-center justify-center px-4 relative`}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative w-full max-w-[1035px] min-h-[612px] rounded-lg overflow-hidden backdrop-blur-2xl bg-white/10 flex sm:flex-row flex-col items-center justify-center">
        {isLoading && <Loader />}
        {isError && !isLoading && <InvalidTokenAlert />}
        {!isLoading && !isError && <VerifyEmailSuccessAlert />}
      </div>
    </div>
  );
};

export const InvalidTokenAlert = () => {
  // ---- Hooks ----
  const navigate = useNavigate();
  
  // ---- Handlers ----
  const handleGoToLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-4 p-6 rounded-2xl max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">
        Token no válido o expirado
      </h1>
      <p className="text-center text-gray-200">
        El enlace de verificación que intentaste usar es incorrecto, ha expirado
        o ya fue utilizado. Por favor, solicita uno nuevo para continuar con la
        verificación de tu correo electrónico.
      </p>
      <Button variant="default" className="mt-4" onClick={handleGoToLogin}>
        volver
      </Button>
    </div>
  );
};

export const VerifyEmailSuccessAlert = () => {
  // ---- Hooks ----
  const navigate = useNavigate();

  // ---- Handlers ----
  const handleGoToLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-4 p-6 rounded-2xl max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">
        Verificación exitosa
      </h1>
      <p className="text-center text-gray-200">
        Tu correo electrónico ha sido verificado correctamente. Ahora puedes
        acceder a todas las funciones de la aplicación.
      </p>
      <Button variant="default" className="mt-4" onClick={handleGoToLogin}>
        Ir a Iniciar Sesión
      </Button>
    </div>
  );
};
