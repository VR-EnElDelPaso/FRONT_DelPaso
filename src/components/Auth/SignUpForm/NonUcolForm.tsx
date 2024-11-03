import { useForm } from "react-hook-form";

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

export const NonUcolForm = ({ onBack, onComplete }: NonUcolFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NonUcolFormInputs>();

  const password = watch("password");

  const onSubmit = () => {
    onComplete();
  };

  return (
    <div className="transition-all duration-500 ease-in-out transform animate-slideIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <div className="max-h-[500px] overflow-y-auto overflow-x-hidden p-2">
        {" "}
        {/* Contenedor con scroll */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
          <div className="space-y-2">
            <label className="text-white">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
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
          <div className="space-y-2">
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
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
              placeholder="Confirmar contraseña"
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
        </form>
      </div>
    </div>
  );
};
