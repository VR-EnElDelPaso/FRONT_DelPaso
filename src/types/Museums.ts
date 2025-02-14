export interface Museum {
  id: string;
  name: string;
  description: string;
  address_name: string;
  main_photo: string;
  main_tour_id: string;
  created_at: string;
  updated_at: string;
}

export interface MuseumHours {
  day: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}
