import { useForm } from "react-hook-form";

type UcolStep1Props = {
  onNext: () => void;
  onBack: () => void;
};

type UcolStep1Inputs = {
  fullName: string;
  accountNumber: string;
  ucolEmail: string;
};

export const UcolStep1 = ({ onNext, onBack }: UcolStep1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UcolStep1Inputs>();

  const onSubmit = (data: UcolStep1Inputs) => {
    console.log(data);
    onNext();
  };

  return (
    <div className="transition-all duration-500 ease-in-out transform animate-slideIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="space-y-2">
          <label className="text-white">Nombre completo</label>
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
            {...register("fullName", {
              required: "El nombre es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-white">Número de cuenta</label>
          <input
            type="text"
            placeholder="Número de cuenta"
            className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
            {...register("accountNumber", {
              required: "El número de cuenta es requerido",
              pattern: {
                value: /^\d{8}$/,
                message: "El número de cuenta debe tener 8 dígitos",
              },
            })}
          />
          {errors.accountNumber && (
            <span className="text-red-500 text-sm">
              {errors.accountNumber.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-white">Correo Ucol</label>
          <input
            type="email"
            placeholder="ejemplo@ucol.mx"
            className="w-full bg-gray-300/20 border border-gray-400/20 px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow text-white placeholder-white/70"
            {...register("ucolEmail", {
              required: "El correo es requerido",
              pattern: {
                value: /@ucol\.mx$/,
                message: "Debe ser un correo institucional (@ucol.mx)",
              },
            })}
          />
          {errors.ucolEmail && (
            <span className="text-red-500 text-sm">
              {errors.ucolEmail.message}
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
  );
};
