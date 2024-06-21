import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slide from './Slide';
import CarouselControls from './CarouselControls';

interface SlideData {
    imageSrc: string;
    date: string;
    title: string;
    description: string;
}

const slides: SlideData[] = [
    {
        imageSrc: 'PA_Obra31.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. PALABRALMA',
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    },
    {
        imageSrc: 'PA_Obra13.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. DESEAR',
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    },
    {
        imageSrc: 'PA_Obra23.jpg',
        date: '07 de Mayo de 2024',
        title: 'Teresa Olmedo. AMAR',
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.'
    }
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-full mt-8">
            <div className="relative w-full h-96">
                <AnimatePresence>
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute w-full h-full"
                            >
                                <Slide
                                    imageSrc={slide.imageSrc}
                                    date={slide.date}
                                    title={slide.title}
                                    description={slide.description}
                                />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
            <CarouselControls 
                nextSlide={nextSlide} 
                prevSlide={prevSlide} 
                currentSlide={currentSlide} 
                totalSlides={slides.length} 
                setCurrentSlide={setCurrentSlide}
            />
        </div>
    );
}
