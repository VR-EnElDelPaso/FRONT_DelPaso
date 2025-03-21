export interface Slide {
  id?: string;
  index: number;
  image_url: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Carousel {
  id: string;
  page_id: string;
  name: string;
  description: string;
  slides: Slide[];
  created_at?: string;
  updated_at?: string;
}

export interface SlideFormData {
  index: number;
  image_url: string;
  title: string;
  description: string;
}

export interface CarouselFormData {
  page_id: string;
  name: string;
description: string;
  slides: SlideFormData[];
}
