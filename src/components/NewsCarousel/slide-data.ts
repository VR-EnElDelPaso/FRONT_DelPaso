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
      imageUrl: '/fernando-del-paso.jpg',
    },
    {
      id: 2,
      title: 'Museo Fernando del Paso',
      description: '¡Visita nuestro museo y descubre la historia de Fernando del Paso!',
      imageUrl: '/Museo-Fernando-del-Paso.jpg',
    },
    {
      id: 3,
      title: 'Fernando del Paso',
      description: '¡Conoce más sobre la vida y obra de Fernando del Paso!',
      imageUrl: 'fernando-del-paso-3.jpg',
    }
  ];
  