import { useForm } from "react-hook-form";
import { useRegisterStore } from "@/stores/RegisterStore";
import { Register } from "@/services/auth.services";
import { RegisterUser } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

type UcolStep2Props = {
  onBack: () => void;
  onComplete: () => void;
};

type UcolStep2Inputs = {
  password: string;
  confirmPassword: string;
};

export const UcolStep2 = ({ onBack, onComplete }: UcolStep2Props) => {
  const { toast } = useToast();
  const { formInputs, getUserType, getDisplayName } = useRegisterStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UcolStep2Inputs>();

  const password = watch("password");

  const onSubmit = async (data: UcolStep2Inputs) => {
    const { password } = data;

    const combinedData: RegisterUser = {
      ...formInputs,
      account_number: parseInt(formInputs.account_number),
      display_name: getDisplayName(),
      password,
      role: getUserType(),
    };

    try {
      await Register(combinedData);
      onComplete();
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "Hubo un error al intentar registrar tu cuenta.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="transition-all duration-500 ease-in-out transform animate-slideIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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
            className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Completar
          </button>
          <button
            type="button"
            onClick={onBack}
            className="mb-4 bg-transparent text-neutral-300 w-full rounded-md font-light hover:scale-105 text-sm tracking-wider transform transition-all duration-300"
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
};
