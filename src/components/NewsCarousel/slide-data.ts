import Background1 from '@/assets/images/background-1.webp';
import Background2 from '@/assets/images/background-2.webp';
import Background3 from '@/assets/images/background-3.webp';

export interface CarouselSlideProps {
    title: string;
    description: string;
    imageUrl: string;
  }
  
  export default interface CarouselSlideInterface extends CarouselSlideProps {
    id: number;
  }
  
  export const slides: CarouselSlideInterface[] = [
    {
      id: 1,
      title: 'CONOCE MUVI',
      description: 'MUVi está listo para ofrecerte las mejores experiencias en Recorridos Virtuales',
      imageUrl: Background1,
    },
    {
      id: 2,
      title: 'CONOCE MUVI',
      description: 'Hacemos del arte una experiencia cercana para ti.',
      imageUrl: Background2,
    },
    {
      id: 3,
      title: 'CONOCE MUVI',
      description: 'Descubre nuestros recorridos y elige tu favorito.',
      imageUrl: Background3,
    }
  ];
  