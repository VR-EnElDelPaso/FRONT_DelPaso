import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Slide from "./Slide";
import CarouselControls from "./CarouselControls";
import { variants, swipeConfidenceThreshold, swipePower } from "./animations";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMuseumTours } from "@/services/Museums";
import { getAllTours } from "@/services/tour.services";

// ACTUALIZAR INTERFACE PARA INCLUIR ID DEL TOUR
interface Slide {
  id: string; // AGREGAR ID
  image_url: string;
  created_at: string;
  name: string;
  stars: number;
  description: string;
  // CAMPOS DE ACREDITACIÓN
  is_accreditable: boolean;
  accreditable_hours: number | null;
}

interface CarouselProps {
  museum_id?: string;
}

export default function Carousel({ museum_id = "" }: CarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      if (museum_id) {
        const tour = await getMuseumTours(museum_id);
        setSlides(tour.data);
      } else {
        const tours = await getAllTours();
        setSlides(tours.data);
      }
    } catch (error) {
      setError("Error al cargar los tours");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [museum_id]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const imageIndex = wrap(0, Math.max(slides.length, 1), page);

  const paginate = useCallback(
    (newDirection: number) => {
      if (slides.length > 0) {
        setPage([page + newDirection, newDirection]);
      }
    },
    [page, slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [paginate, slides.length]);

  if (loading) {
    return (
      <div className="w-full h-[50vh] min-h-[300px] flex items-center justify-center">
        <div className="text-lg">Cargando tours...</div>
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="w-full h-[50vh] min-h-[300px] flex items-center justify-center">
        <div className="text-lg text-gray-600">
          {error || "No hay tours disponibles en este momento"}
        </div>
      </div>
    );
  }

  const currentSlide = slides[imageIndex];

  return (
    <div className="relative w-full mt-4 sm:mt-8">
      <div className="relative w-full h-[50vh] min-h-[300px] max-h-[500px] overflow-hidden mb-8">
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
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
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
              imageSrc={currentSlide?.image_url || ""}
              date={
                currentSlide?.created_at
                  ? dateFormatter(currentSlide.created_at)
                  : ""
              }
              title={currentSlide?.name || ""}
              rating={currentSlide?.stars || 0}
              description={currentSlide?.description || ""}
              // PROPS DE ACREDITACIÓN
              isAccreditable={currentSlide?.is_accreditable || false}
              accreditableHours={currentSlide?.accreditable_hours || null}
              // NUEVO PROP: TOUR ID PARA NAVEGACIÓN
              tourId={currentSlide?.id || ""}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <div className="relative">
          <CarouselControls
            nextSlide={() => paginate(1)}
            prevSlide={() => paginate(-1)}
            currentSlide={imageIndex}
            totalSlides={slides.length}
            setCurrentSlide={(index) => setPage([index, 0])}
          />
        </div>
      )}
    </div>
  );
}
