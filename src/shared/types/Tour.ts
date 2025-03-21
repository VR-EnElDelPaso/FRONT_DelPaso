// todo: move to features/tours/types

import { Tag } from "@/types/tag";

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  url: string;
  image_url: string;
  museum_id: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}