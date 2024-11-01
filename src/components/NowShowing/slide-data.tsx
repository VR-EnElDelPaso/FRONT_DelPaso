export interface SlideProps {
    imageSrc: string;
    date: string;
    title: string;
    rating: number;
    description: string;
}

export const slides: SlideProps[] = [
    {
        imageSrc: 'PA_Obra31.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. PALABRALMA',
        rating: 4,
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    },
    {
        imageSrc: 'PA_Obra13.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. DESEAR',
        rating: 4,
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    },
    {
        imageSrc: 'PA_Obra23.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. AMAR',
        rating: 4.5,
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    }
];
