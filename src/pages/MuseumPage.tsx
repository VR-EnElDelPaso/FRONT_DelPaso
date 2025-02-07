import { Card } from "@/components/ui/card";
import { getMuseumById } from "@/services/Museums";
import { Museum } from "@/types/Museums";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, MapPin, DollarSign } from "lucide-react";
import Carousel from "@/components/NowShowing/Carousel";
import { Button } from "@/components/ui/button";
import MuseumStatus from "@/components/NowShowing/MuseumStatus";
import { MuseumInfoCard } from "@/features/museum/componets/MuseumInfoCard";

const MuseumPage = () => {
  // ----[ States ]----
  const [museum, setMuseum] = useState<Museum | null>(null);

  // ----[ Hooks ]----
  const { id } = useParams<{ id: string }>();

  // ----[ Callbacks ]----
  const fetchMuseum = useCallback(async () => {
    const museum = await getMuseumById(id as string);
    setMuseum(museum);
  }, [id]);

  // ----[ Effects ]----
  useEffect(() => {
    fetchMuseum();
  }, [fetchMuseum]);

  if (!museum) return null;

  return (
    <div className="w-full">
      {/* Sección de imagen full-width */}
      <div className="w-screen ml-[calc(-50vw+50%)] overflow-hidden">
        <Card className="rounded-none shadow-xl border-0">
          <img
            src={museum.main_photo}
            alt={museum.name}
            className="w-full h-[400px] object-cover"
          />
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col mb-8">
            <h1 className="text-4xl font-bold font-kaiseiDecol tracking-tight mb-6">
              {museum.name}
            </h1>
            <p className="text-muted-foreground leading-7">
              {museum.description}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Horario */}
            <MuseumInfoCard
              title="Horarios"
              icon={<Clock className="h-6 w-6 text-white" />}
            >
              <p className="text-sm text-muted-foreground">
                Horario no disponible
              </p>
            </MuseumInfoCard>

            {/* Ubicación */}
            <MuseumInfoCard
              title="Ubicación"
              icon={<MapPin className="h-6 w-6 text-white" />}
            >
              <p className="text-sm text-muted-foreground">
                {museum.address_name || "Ubicación no disponible"}
              </p>
            </MuseumInfoCard>

            {/* Precio */}
            <MuseumInfoCard
              title="Precio"
              icon={<DollarSign className="h-6 w-6 text-white" />}
            >
              <p className="text-sm text-muted-foreground">
                Precio no disponible
              </p>
            </MuseumInfoCard>
          </div>

          <div className="flex justify-end mt-4">
            <MuseumStatus />
          </div>

          {/* Recorridos */}
          <div className="container mx-auto flex flex-col px-4 sm:px-6 md:px-8">
            {/* Title */}
            <div className="mb-6 sm:mb-8">
              <div className="flex text-primary/50 items-center mb-2">
                <span className="text-lg sm:text-xl mr-2">•</span>
                <p className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                  Sólo en {museum.name}
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-kaiseiDecol">
                Recorridos Virtuales
              </h1>
            </div>

            {/* Carousel */}
            <div className="w-full mb-8 sm:mb-10">
              <Carousel museum_id={museum.id} />
            </div>

            {/* Button */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <button
                className="text-primary/75 underline underline-offset-2 text-sm sm:text-base font-medium py-2.5 px-6 sm:px-8"
                onClick={() => {}}
              >
                Ver todo
              </button>
            </div>

            {/* Ver Instalaciones */}
            <div className="w-screen ml-[calc(-50vw+50%)] overflow-hidden mt-12">
              <div className="relative group cursor-pointer">
                <img
                  src="/assets/images/pictures/pasillo.png"
                  alt="Instalaciones"
                  className="w-full h-[400px] object-cover blur-[2px]"
                />
                <div className="absolute inset-0 backdrop-blur-md bg-black/10 z-10" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                  <p className="text-lg font-medium mb-2">Solo En Muvi</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-kaiseiDecol text-center px-4">
                    Ver Instalaciones de Fernando del Paso
                  </h2>
                </div>
              </div>
            </div>

            {/* Sección de Ayuda */}
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <h3 className="text-sm font-medium tracking-widest text-primary uppercase text-muted-foreground">
                    Ayuda
                  </h3>
                </div>

                <h2 className="text-3xl font-kaiseiDecol font-bold">
                  ¿Tienes preguntas?
                </h2>

                <p className="text-base leading-7 text-muted-foreground">
                  Si tienes alguna duda sobre nuestras exposiciones, horarios,
                  entradas u otros servicios, por favor visita nuestra sección
                  de preguntas frecuentes o contáctanos directamente a través de
                  contacto@muvi.com o llamando al +52 333 123 4567. Estamos aquí
                  para ayudarte a disfrutar de tu visita al Museo Fernando del
                  Paso.
                </p>

                <div className="flex justify-end">
                  <Button
                    variant="default"
                    size="lg"
                    className="font-medium text-white rounded-xl"
                    >
                    Ayuda
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MuseumPage;
