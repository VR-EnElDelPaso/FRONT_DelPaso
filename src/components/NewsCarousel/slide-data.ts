export interface CarouselSlideProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default interface CarouselSlideInterface extends CarouselSlideProps {
  id: number | string; // Cambiar a number | string para soportar UUIDs
}
