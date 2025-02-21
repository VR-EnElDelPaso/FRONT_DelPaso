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
      title: 'Fernando del Paso',
      description: 'Descubre más sobre nuestros artistas y el arte emergente que se expone, ¡ahora mismo!',
      imageUrl: Background1,
    },
    {
      id: 2,
      title: 'Museo Fernando del Paso',
      description: '¡Visita nuestro museo y descubre la historia de Fernando del Paso!',
      imageUrl: Background2,
    },
    {
      id: 3,
      title: 'Fernando del Paso',
      description: '¡Conoce más sobre la vida y obra de Fernando del Paso!',
      imageUrl: Background3,
    }
  ];
  