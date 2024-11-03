import { useState } from "react";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { LocalLogin } from "@/services/Auth";
import ResponseData from "@/types/ResponseData";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type SignInFormInputs = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [authError, setAuthError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      setAuthError(""); // Limpiar error previo
      const response = await LocalLogin(data.email, data.password);
      const responseData: ResponseData = response.data;
      login(responseData.data.token);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Manejar diferentes tipos de errores
      if (error instanceof AxiosError && error.response) {
        // El servidor respondió con un código de error
        switch (error.response.status) {
          case 401:
            setAuthError("Correo o contraseña incorrectas");
            break;
          case 404:
            setAuthError("El servicio no está disponible");
            break;
          case 500:
            setAuthError("Error en el servidor. Por favor, intente más tarde");
            break;
          default:
            setAuthError(
              "Error al iniciar sesión. Por favor, intente de nuevo"
            );
        }
      } else if ((error as AxiosError).request) {
        // La solicitud se hizo pero no se recibió respuesta
        setAuthError(
          "No se pudo conectar con el servidor. Verifique su conexión"
        );
      } else {
        // Error al configurar la solicitud
        setAuthError("Error al procesar la solicitud");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col items-start justify-center px-12 text-left bg-transparent w-full motion-safe:animate-[smoothBounce_0.8s_ease-in-out]"
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Iniciar sesión</h1>

      <div className="space-y-4 w-full">
        <div className="space-y-2 w-full">
          <label className="text-white">Correo</label>
          <input
            type="email"
            placeholder="Correo"
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-2 w-full">
          <label className="text-white">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
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

      <a
        href="#"
        className="text-sm text-white/70 my-4 mt-8 hover:text-white transition-colors"
      >
        ¿Olvidaste tu contraseña?
      </a>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

      {authError && (
        <Alert variant="destructive" className="mt-6 bg-white/70">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};
