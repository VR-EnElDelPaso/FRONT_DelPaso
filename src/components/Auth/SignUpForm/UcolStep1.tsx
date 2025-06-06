import { useForm } from "react-hook-form";
import { useRegisterStore } from "@/stores/RegisterStore";

type UcolStep1Props = {
  onNext: () => void;
  onBack: () => void;
};

export type UcolStep1Inputs = {
  name: string;
  first_lastname: string;
  second_lastname: string;
  account_number: string;
  email: string;
};

export const UcolStep1 = ({ onNext, onBack }: UcolStep1Props) => {
  const { setFormInputs } = useRegisterStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UcolStep1Inputs>();

  const onSubmit = (data: UcolStep1Inputs) => {
    setFormInputs(data);
    onNext();
  };

  return (
    <div className="transition-all duration-500 ease-in-out transform animate-slideIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <div className="max-h-[500px] overflow-y-auto overflow-x-hidden p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="space-y-2">
            <label className="text-white">Nombres</label>
            <input
              type="text"
              placeholder="Nombres"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("name", {
                required: "Los nombres son requeridos",
                minLength: {
                  value: 2,
                  message: "Los nombres deben tener al menos 2 caracteres",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white">Primer apellido</label>
            <input
              type="text"
              placeholder="Primer apellido"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("first_lastname", {
                required: "El primer apellido es requerido",
                minLength: {
                  value: 2,
                  message:
                    "El primer apellido debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.first_lastname && (
              <span className="text-red-500 text-sm">
                {errors.first_lastname.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white">Segundo apellido</label>
            <input
              type="text"
              placeholder="Segundo apellido"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("second_lastname", {
                required: "El segundo apellido es requerido",
                minLength: {
                  value: 2,
                  message:
                    "El segundo apellido debe tener al menos 2 caracteres",
                },
              })}
            />
            {errors.second_lastname && (
              <span className="text-red-500 text-sm">
                {errors.second_lastname.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white">Número de cuenta</label>
            <input
              type="text"
              placeholder="Número de cuenta"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("account_number", {
                required: "El número de cuenta es requerido",
                pattern: {
                  value: /^\d{8}$/,
                  message: "El número de cuenta debe tener 8 dígitos",
                },
              })}
            />
            {errors.account_number && (
              <span className="text-red-500 text-sm">
                {errors.account_number.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-white">Correo Ucol</label>
            <input
              type="email"
              placeholder="ejemplo@ucol.mx"
              className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
              {...register("email", {
                required: "El correo es requerido",
                pattern: {
                  value: /@ucol\.mx$/,
                  message: "Debe ser un correo institucional (@ucol.mx)",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-full space-y-4 mt-6">
            <button
              type="submit"
              className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Siguiente
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
