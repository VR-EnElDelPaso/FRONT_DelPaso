// todo: move to features/tours/types

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  url: string;
  image_url: string;
  museum_id: string;
  created_at: string;
  updated_at: string;
}