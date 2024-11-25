import { useState } from "react";
import { RegisterUser } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "@/stores/RegisterStore";
import { Register } from "@/services/Auth";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { handleAuthError } from "@/utils/errorHandler";

type NonUcolFormProps = {
  onBack: () => void;
  onComplete: () => void;
};

type NonUcolFormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterNonUcolUser = Omit<RegisterUser, "account_number"> & { 
  account_number?: number 
};

export const NonUcolForm = ({ onBack, onComplete }: NonUcolFormProps) => {
  const { toast } = useToast();
  const { getUserType, setFormInputs, getDisplayName } = useRegisterStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NonUcolFormInputs>();
  const [authError, setAuthError] = useState<string>("");

  const password = watch("password");

  const onSubmit = async (data: NonUcolFormInputs) => {
    const { username, email, password } = data;

    setFormInputs({
      name: username,
      account_number: "",
      email,
    });

    const combinedData: RegisterNonUcolUser = {
      name: username,
      display_name: getDisplayName(),
      email,
      password,
      role: getUserType(),
    }

    try {
      await Register(combinedData as RegisterUser);
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada exitosamente.",
        variant: "default",
      });
      onComplete();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleAuthError(error, "register");
      setAuthError(errorMessage);
      toast({
        title: "¡Error!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="transition-all duration-500 ease-in-out transform animate-slideIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <div className="max-h-[500px] overflow-y-auto overflow-x-hidden p-2">
        {/* Contenedor con scroll */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
          <div className="space-y-2">
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
                validate: {
                  noSpecificDomain: (value) =>
                    !value.endsWith("@ucol.mx") || "No se permiten correos UCOL en esta opción",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-white">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Manuel Rosado"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("username", {
                required: "El nombre de usuario es requerido",
                minLength: {
                  value: 3,
                  message:
                    "El nombre de usuario debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "La contraseña debe contener al menos una letra y un número",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-white">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="********"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("confirmPassword", {
                required: "Debe confirmar la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="w-full space-y-4 mt-6">
            <button
              type="submit"
              className="mt-2 bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Registrate
            </button>
            <button
              type="button"
              onClick={onBack}
              className="mb-4 bg-transparent text-neutral-300 w-full rounded-md font-light hover:scale-105 text-sm tracking-wider transform transition-all duration-300"
            >
              Regresar
            </button>
          </div>

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
      </div>
    </div>
  );
};
