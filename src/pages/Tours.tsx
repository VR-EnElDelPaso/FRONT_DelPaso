import { useNavigate } from "react-router-dom";
import { Search, Star, Calendar, GraduationCap } from "lucide-react";
import { Tour } from "../types/tour";
import useFetchTours from "../hooks/useFetchTours";
import { dateFormatter } from "../utils/dateFormatter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AccreditableBadge } from "@/shared/components/Tour/AccreditableBadge";
import { useState } from "react";

const Tours = () => {
  const navigate = useNavigate();
  const tours = useFetchTours();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [showAccreditableOnly, setShowAccreditableOnly] = useState(false);

  const filteredTours = () => {
    let filtered = tours;

    // Filtro por categoría (tags)
    if (selectedCategory) {
      filtered = filtered.filter((tour: Tour) =>
        tour.tags.some(
          (tag) => tag.name.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Filtro por tours acreditables
    if (showAccreditableOnly) {
      filtered = filtered.filter((tour: Tour) => tour.is_accreditable);
    }

    return filtered;
  };

  const handleTourClick = (tourId: string) => {
    // Scroll to top suave antes de navegar
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Pequeño delay para que el scroll sea visible
    setTimeout(() => {
      navigate(`/tours/${tourId}`);
    }, 100);
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-10 rounded-full"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Filtrar por:</span>

          {/* Category Filter */}
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="universitario">Universitarios</SelectItem>
                <SelectItem value="local">Locales</SelectItem>
                <SelectItem value="otros estados">Otros estados</SelectItem>
                <SelectItem value="otros paises">Otros países</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Accreditable Filter */}
          <Button
            variant={showAccreditableOnly ? "default" : "outline"}
            onClick={() => setShowAccreditableOnly(!showAccreditableOnly)}
            className="flex items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Solo Acreditables
          </Button>
        </div>
      </div>

      {/* Tours */}
      <div className="space-y-6">
        {filteredTours().map((tour: Tour) => (
          <Card
            key={tour.id}
            className="overflow-hidden border-none shadow-none bg-transparent cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg group"
            onClick={() => handleTourClick(tour.id)}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="w-full md:w-[200px] relative">
                <img
                  src={tour.image_url}
                  alt={tour.name}
                  className="w-full h-64 md:h-[200px] object-cover rounded-lg transition-all duration-300 group-hover:brightness-110"
                />

                {/* Etiqueta acreditable en imagen */}
                <AccreditableBadge
                  isAccreditable={tour.is_accreditable}
                  accreditableHours={tour.accreditable_hours}
                  variant="compact"
                  showHours={false}
                  className="absolute top-2 left-2 transition-all duration-300 group-hover:scale-105"
                />

                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg" />

                {/* Indicador visual de clickeable */}
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

              {/* Content */}
              <div className="flex-1 p-6 transition-all duration-300 group-hover:translate-x-1">
                <div className="flex flex-col md:h-full md:justify-center space-y-4">
                  {/* Title with accreditable indicator */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-kaiseiDecol flex-1 transition-colors duration-300 group-hover:text-primary">
                      {tour.name}
                    </h2>
                    {/* Badge adicional junto al título */}
                    <AccreditableBadge
                      isAccreditable={tour.is_accreditable}
                      accreditableHours={tour.accreditable_hours}
                      variant="compact"
                      showHours={false}
                      className="transition-all duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star
                      className="h-6 w-6 transition-all duration-300 group-hover:scale-110"
                      style={{ fill: "#B33424", color: "#B33424" }}
                    />
                    <span className="font-medium text-lg transition-colors duration-300 group-hover:text-primary">
                      {tour.stars}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-primary/70" />
                    <time className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary/70">
                      {dateFormatter(tour.created_at)}
                    </time>
                  </div>

                  {/* Description and Button */}
                  <div className="flex justify-between items-end gap-4">
                    <div className="flex-1">
                      <p className="text-muted-foreground transition-colors duration-300 group-hover:text-gray-700">
                        {tour.description}
                      </p>

                      {/* Información adicional de acreditación */}
                      {tour.is_accreditable && (
                        <div className="mt-2 text-sm text-green-700 font-medium transition-colors duration-300 group-hover:text-green-800">
                          ✓ Recorrido con créditos académicos
                          {/* Preparado para mostrar horas */}
                          {tour.accreditable_hours && false && (
                            <span className="text-green-600">
                              {" "}
                              ({tour.accreditable_hours}h)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTourClick(tour.id);
                      }}
                      className="text-white bg-primary hover:bg-primary/90 whitespace-nowrap transition-all duration-300 group-hover:scale-105 group-hover:shadow-md z-10 relative"
                    >
                      Ver más
                    </Button>
                  </div>

                  {/* Indicador de acción */}
                  <div className="mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="text-xs text-primary font-medium">
                      Haz clic para ver más detalles →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tours;
