import { useEffect, useState } from "react";
import {
  AlertCircle,
  Edit,
  Image,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// Importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CarouselForm from "@/features/admin/components/CarouselForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Services
import { getMainCarousel, updateCarousel } from "@/services/Carousel";

// Types
import { Carousel, CarouselFormData } from "@/shared/types/Carousel";
import { useToast } from "@/hooks/use-toast";

const LandingPage = () => {
  // Estados
  const [carousel, setCarousel] = useState<Carousel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { toast } = useToast();

  // Cargar datos del carrusel principal
  const fetchCarousel = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMainCarousel();

      if (response.ok && response.data) {
        setCarousel(response.data);
      } else {
        setError(response.message || "Error al cargar el carrusel principal");
      }
    } catch (error) {
      console.error("Error fetching carousel:", error);
      setError("Error al cargar el carrusel principal");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  // Manejar actualización del carrusel
  const handleUpdateCarousel = async (data: CarouselFormData) => {
    if (!carousel) return;

    try {
      const response = await updateCarousel(carousel.id, data);

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Carrusel actualizado correctamente",
        });
        fetchCarousel(); // Recargar datos
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar el carrusel",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating carousel:", error);
      toast({
        title: "Error",
        description: "Error al actualizar el carrusel",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container p-6 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestión de Landing Page
        </h1>

        <Button onClick={fetchCarousel} variant="outline" disabled={isLoading}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Sección del carrusel principal */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            {/* Rediseño responsive del header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">
                  Carrusel: {carousel ? `${carousel.name}` : "Carrusel"}
                </CardTitle>
                <CardDescription>{carousel?.description}</CardDescription>
                <div className="text-sm text-gray-500">
                  {carousel ? `${carousel.slides.length} slides` : "0 slides"}
                </div>
              </div>

              <Button
                onClick={() => setIsFormOpen(true)}
                disabled={!carousel || isLoading}
                className="text-white self-start sm:self-center w-full sm:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Carrusel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : carousel ? (
              <div className="space-y-4">
                <h3 className="font-medium mt-6">Vista previa de slides</h3>
                {/* Contenedor de Swiper con botones personalizados */}
                <div className="mt-4 relative max-w-3xl mx-auto px-12">
                  {/* Botones de navegación fuera del slider */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors custom-prev-button">
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors custom-next-button">
                      <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                      nextEl: ".custom-next-button",
                      prevEl: ".custom-prev-button",
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass:
                        "inline-block h-2 w-2 rounded-full bg-gray-300 mx-1 cursor-pointer transition-all",
                      bulletActiveClass: "bg-primary w-6",
                      el: ".custom-pagination",
                    }}
                    slidesPerView={1}
                    loop={true}
                    className="rounded-lg border overflow-hidden"
                  >
                    {carousel.slides.map((slide) => (
                      <SwiperSlide key={slide.id || slide.index}>
                        <div className="h-60 bg-gray-100">
                          {slide.image_url ? (
                            <img
                              src={slide.image_url}
                              alt={slide.title || "Slide image"}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Image className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-white border-t">
                          <h4 className="font-medium">
                            {slide.title || "Sin título"}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {slide.description || "Sin descripción"}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Paginación personalizada */}
                  <div className="custom-pagination flex justify-center mt-4"></div>
                </div>

                {/* Información adicional */}
                <div className="bg-gray-50 p-4 rounded-md mt-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Información adicional
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Los slides se{" "}
                    <span className="font-semibold">
                      mostrarán en el carrusel de la página principal
                    </span>{" "}
                    en el orden definido. Puedes editar cada slide desde el
                    botón{" "}
                    <span className="font-semibold">"Editar Carrusel"</span>.
                    Desliza horizontalmente o utiliza las flechas para navegar
                    entre slides.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">
                  No se encontró el carrusel principal
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Formulario de edición */}
      {carousel && (
        <CarouselForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleUpdateCarousel}
          initialValues={carousel}
        />
      )}
    </div>
  );
};

export default LandingPage;
