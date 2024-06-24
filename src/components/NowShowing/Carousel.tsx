import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import Slide from './Slide';
import CarouselControls from './CarouselControls';
import { slides } from './slide-data';
import { variants, swipeConfidenceThreshold, swipePower } from './animations';

export default function Carousel() {
    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, slides.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000); // Cambia de slide cada 5 segundos

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [page]); // Dependencia para actualizar el intervalo en cada cambio de página

    return (
        <div className="relative w-full h-full mt-8">
            <div className="relative w-full h-96 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full"
                    >
                        <Slide
                            imageSrc={slides[imageIndex].imageSrc}
                            date={slides[imageIndex].date}
                            title={slides[imageIndex].title}
                            description={slides[imageIndex].description}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            <CarouselControls 
                nextSlide={() => paginate(1)} 
                prevSlide={() => paginate(-1)} 
                currentSlide={imageIndex} 
                totalSlides={slides.length} 
                setCurrentSlide={(index) => setPage([index, 0])}
            />
        </div>
    );
}
