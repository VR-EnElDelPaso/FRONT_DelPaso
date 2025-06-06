import { Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AccreditableBadge } from "@/shared/components/Tour/AccreditableBadge";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export interface SlideProps {
  imageSrc: string;
  date: string;
  title: string;
  rating: number;
  description: string;
  isAccreditable: boolean;
  accreditableHours: number | null;
  tourId: string;
}

export default function Slide({
  imageSrc,
  date,
  title,
  rating,
  description,
  isAccreditable,
  accreditableHours,
  tourId,
}: SlideProps) {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPosition = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPosition.current = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartPosition.current.x !== 0) {
      const deltaX = Math.abs(e.clientX - dragStartPosition.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPosition.current.y);

      // Si se mueve más de 10px en cualquier dirección, considerarlo como arrastre
      if (deltaX > 10 || deltaY > 10) {
        setIsDragging(true);
      }
    }
  };

  const handleSlideClick = () => {
    // Solo navegar si no se estaba arrastrando
    if (!isDragging) {
      // SCROLL TO TOP ANTES DE NAVEGAR
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Pequeño delay para que el scroll sea visible
      setTimeout(() => {
        navigate(`/tours/${tourId}`);
      }, 100);
    }
    // Reset del estado
    setIsDragging(false);
    dragStartPosition.current = { x: 0, y: 0 };
  };

  return (
    <Card
      className="grid grid-cols-1 md:grid-cols-[1.8fr,3fr] w-full h-full overflow-hidden border-none shadow-none bg-transparent cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg group"
      onClick={handleSlideClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        // Reset cuando el mouse sale del componente
        setIsDragging(false);
        dragStartPosition.current = { x: 0, y: 0 };
      }}
    >
      <div className="relative h-[180px] sm:h-[200px] md:h-full">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-[90%] h-full object-cover rounded-lg transition-all duration-300 group-hover:brightness-110"
        />

        {/* AGREGAR BADGE ACREDITABLE EN LA IMAGEN */}
        <AccreditableBadge
          isAccreditable={isAccreditable}
          accreditableHours={accreditableHours}
          variant="compact"
          showHours={false}
          className="absolute top-3 left-3 z-10 transition-all duration-300 group-hover:scale-105"
        />

        {/* OVERLAY SUTIL EN HOVER */}
        <div className="absolute inset-0 w-[90%] h-full rounded-lg bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        {/* INDICADOR VISUAL DE CLICKEABLE */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col gap-3 sm:gap-4 justify-center md:pl-16 lg:pl-20 transition-all duration-300 group-hover:translate-x-1">
        <div className="flex flex-col sm:justify-between gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-kaiseiDecol font-bold transition-colors duration-300 group-hover:text-primary">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <Star
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 transition-all duration-300 group-hover:scale-110"
              style={{ fill: "#B33424", color: "#B33424" }}
            />
            <span className="font-medium text-lg sm:text-xl md:text-2xl transition-colors duration-300 group-hover:text-primary">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary/70" />
          <span className="text-sm sm:text-base text-muted-foreground transition-colors duration-300 group-hover:text-primary/70">
            {date}
          </span>
        </div>

        {/* DESCRIPCIÓN CON INFORMACIÓN DE ACREDITACIÓN */}
        <div className="space-y-2">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[95%] sm:max-w-[90%] transition-colors duration-300 group-hover:text-gray-700">
            {description}
          </p>

          {/* Información de acreditación en la descripción cuando esté disponible */}
          {isAccreditable && (
            <div className="pt-2 p-3 bg-green-50 rounded-lg border-l-4 border-green-500 transition-all duration-300 group-hover:bg-green-100 group-hover:border-green-600">
              <p className="text-sm text-green-800 font-medium">
                ✓ Este recorrido otorga horas de acreditaciones culturales y
                deportivas.
                {/* Preparado para mostrar horas en el futuro */}
                {accreditableHours &&
                  false && ( // false mantiene oculto por ahora
                    <span className="block text-xs text-green-600 mt-1">
                      Duración acreditable: {accreditableHours} horas
                    </span>
                  )}
              </p>
            </div>
          )}
        </div>

        {/* INDICADOR DE ACCIÓN */}
        <div className="mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="text-xs text-primary font-medium">
            Haz clic para ver más detalles →
          </span>
        </div>
      </div>
    </Card>
  );
}
