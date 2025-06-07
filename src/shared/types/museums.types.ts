export interface Museum {
  id: string;
  name: string;
  description: string;
  address_name: string;
  main_photo: string;
  latitude?: number;
  longitude?: number;
  main_tour_id: string;
  hours?: MuseumHours[];
  created_at: string;
  updated_at: string;
}

export interface MuseumHours {
  day: string;
  isOpen: boolean;
  openTime?: string | null;
  closeTime?: string | null;
}

// Mapeo entre nombres de día en español e inglés para la API
export const dayMap = {
  Domingo: "SUNDAY",
  Lunes: "MONDAY",
  Martes: "TUESDAY",
  Miércoles: "WEDNESDAY",
  Jueves: "THURSDAY",
  Viernes: "FRIDAY",
  Sábado: "SATURDAY",
};

export const dayReverseMap: Record<string, string> = {
  SUNDAY: "Domingo",
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
};
