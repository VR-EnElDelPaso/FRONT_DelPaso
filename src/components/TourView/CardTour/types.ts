export type TourId = string;

export interface CardTourProps {
  id: TourId;
  name: string;
  description: string;
  price: string;
  url?: string;
  image_url?: string;
  created_at: string;
}

export interface CardImageProps {
  imagePath: string;
  title: string;
}

export interface CardHeaderProps {
  date: string;
  title: string;
}

export interface CardDescriptionProps {
  description: string;
}

export interface ActionButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface PriceTagProps {
  price: string;
}

export interface BuyButtonProps {
  id: TourId;
  onBuy: (id: TourId) => void;
  isBuyNow?: boolean;
}