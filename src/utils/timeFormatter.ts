/**
 * Formatea una fecha en formato ISO a formato de hora (HH:MM AM/PM)
 * @param dateString Fecha en formato ISO
 * @returns Hora formateada (HH:MM AM/PM)
 */
export const timeFormatter = (dateString: string): string => {
  const date = new Date(dateString);

  // Obtener horas y minutos
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determinar AM o PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convertir horas a formato 12 horas
  hours = hours % 12;
  hours = hours ? hours : 12; // la hora '0' debe ser '12'

  return `${hours}:${minutes} ${ampm}`;
};
