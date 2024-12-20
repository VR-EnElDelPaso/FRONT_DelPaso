import { AxiosError } from "axios";

type OperationType = "login" | "register";

export const handleAuthError = (error: unknown, type: OperationType): string => {
  if (error instanceof AxiosError && error.response) {
    switch (type) {
      case "login":
        switch (error.response.status) {
          case 401:
            return "Correo o contraseña incorrectas";
          case 404:
            return "El servicio no está disponible";
          case 500:
            return "Error en el servidor. Por favor, intente más tarde";
          default:
            return "Error al iniciar sesión. Por favor, intente de nuevo";
        }
      
      case "register":
        switch (error.response.status) {
          case 400:
            return "Los datos proporcionados no son válidos";
          case 409:
            return "El correo ya está registrado";
          case 500:
            return "Error en el servidor. Por favor, intente más tarde";
          default:
            return "Error al registrar. Por favor, intente de nuevo";
        }
    }
  } else if ((error as AxiosError).request) {
    return "No se pudo conectar con el servidor. Verifique su conexión";
  } else {
    return "Error al procesar la solicitud";
  }
};
