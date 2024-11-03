import { useState } from "react";
import { useForm } from "react-hook-form";

const RecoveryPasswordForm = ({
  onToggleForm,
}: {
  onToggleForm: () => void;
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    // Aquí puedes agregar la lógica para enviar un correo de recuperación
    console.log("Recuperar contraseña para:", data.email);
    setEmailSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col items-center justify-center px-12 text-left bg-transparent w-full transition-opacity duration-300"
    >
      <h1 className="text-2xl font-bold mb-4 text-white">Recuperar cuenta</h1>

      {emailSent ? (
        <p className="text-white mb-4">
          Se ha enviado un correo para recuperar tu contraseña.
        </p>
      ) : (
        <div className="space-y-4 w-full">
          <div className="space-y-2 w-full">
            <label className="text-white">Correo</label>
            <input
              type="email"
              placeholder="example@example.com"
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
          <button
            type="submit"
            className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Enviar correo
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={onToggleForm}
        className="text-sm text-white/70 my-4 hover:text-white transition-colors"
      >
        Regresar
      </button>
    </form>
  );
};

export default RecoveryPasswordForm;
