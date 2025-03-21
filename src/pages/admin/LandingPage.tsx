import { useState } from "react";
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
import Loader from "@/shared/components/Loader";

// Services
import { getMainCarousel, updateCarousel } from "@/services/Carousel";

// Types
import { CarouselFormData } from "@/shared/types/Carousel";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Consulta para obtener datos del carrusel
  const {
    data: carouselResponse,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["mainCarousel"],
    queryFn: getMainCarousel,
  });

  const carousel = carouselResponse?.ok ? carouselResponse.data : null;
  const error = queryError ? "Error al cargar el carrusel principal" : null;

  // Mutación para actualizar el carrusel
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CarouselFormData }) =>
      updateCarousel(id, data),
    onSuccess: (response) => {
      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Carrusel actualizado correctamente",
        });
        queryClient.invalidateQueries({ queryKey: ["mainCarousel"] });
      } else {
        toast({
          title: "Error",
          description: response.message || "Error al actualizar el carrusel",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error al actualizar el carrusel",
        variant: "destructive",
      });
    },
  });

  // Manejar actualización del carrusel
  const handleUpdateCarousel = (data: CarouselFormData) => {
    if (!carousel) return;
    updateMutation.mutate({ id: carousel.id, data });
    setIsFormOpen(false);
  };

  return (
    <div className="container p-6 mx-auto space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Gestión de Landing Page
        </h1>
        <p className="text-gray-600">
          Gestiona el contenido del carrusel principal de la página principal
        </p>
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
                disabled={!carousel || isLoading || updateMutation.isPending}
                className="text-white self-start sm:self-center w-full sm:w-auto"
              >
                {updateMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Carrusel
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader />
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
