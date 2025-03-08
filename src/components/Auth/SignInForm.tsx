import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LocalLogin } from "@/services/auth.services";
import ResponseData from "@/shared/types/response-data.types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import RecoveryPasswordForm from "./RecoveryPasswordForm";
import { handleAuthError } from "@/utils/errorHandler";
import { getRedirectPath } from "@/utils/auth";

type SignInFormInputs = {
  email: string;
  password: string;
};

type SignInFormProps = {
  resetRecovery?: boolean;
};

export const SignInForm = ({ resetRecovery }: SignInFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [authError, setAuthError] = useState<string>("");
  const [showRecovery, setShowRecovery] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Reset recovery form when coming back from SignUp
  useEffect(() => {
    if (resetRecovery) {
      setShowRecovery(false);
    }
  }, [resetRecovery]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>();
  
  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      setAuthError("");
      const response = await LocalLogin(data.email, data.password);
      const responseData: ResponseData = response.data;
      const { token } = responseData.data;

      login(token);

      const redirectPath = getRedirectPath(token, from);
      navigate(redirectPath);
      
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = handleAuthError(error, "login");
      setAuthError(errorMessage);
    }
  };

  const handleToggleForm = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowRecovery((prev) => !prev);
      setFadeOut(false);
    }, 100);
  };

  return (
    <div
      className={`h-full transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {showRecovery ? (
        <RecoveryPasswordForm onToggleForm={handleToggleForm} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col items-start justify-center px-12 text-left bg-transparent w-full transition-opacity duration-300"
        >
          <h1 className="text-2xl font-bold mb-4 text-white">Iniciar sesión</h1>

          <div className="space-y-4 w-full">
            <div className="space-y-2 w-full">
              <label className="text-white">Correo</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
                {...register("email", {
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2 w-full">
              <label className="text-white">Contraseña</label>
              <input
                type="password"
                placeholder="********"
                className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleForm}
            className="text-sm text-white/70 my-4 mt-8 hover:text-white transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {authError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <AlertTitle>¡Error!</AlertTitle>
                {authError}
              </AlertDescription>
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};
