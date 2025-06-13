import { Card } from "@/components/ui/card";
import { getMuseumById } from "@/services/Museums";
import { Museum, dayReverseMap } from "@/shared/types/museums.types";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, MapPin, DollarSign } from "lucide-react";
import Carousel from "@/components/NowShowing/Carousel";
import { Button } from "@/components/ui/button";
import MuseumStatus from "@/components/NowShowing/MuseumStatus";
import { MuseumInfoCard } from "@/features/museum/componets/MuseumInfoCard";
import NotFound from "@/shared/components/NotFound";

// Componente para mostrar los horarios del museo
interface MuseumHourDisplayProps {
  hours: {
    day: string;
    isOpen: boolean;
    openTime?: string | null;
    closeTime?: string | null;
  }[];
}

// Tipo para los datos de días agrupados
type DayGroup = {
  days: string[];
  schedule: string;
};

const MuseumHoursDisplay = ({ hours }: MuseumHourDisplayProps) => {
  if (!hours || hours.length === 0) {
    return <p className="text-black">Horario no disponible</p>;
  }

  // Ordenar los días según el orden tradicional (Lunes a Domingo para la visualización)
  const orderedDayKeys = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // Función auxiliar para formatear hora y minutos
  const formatTime = (time: string | null): string => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const numHours = parseInt(hours);

    // Formato 12h con a.m/p.m
    const suffix = numHours >= 12 ? "p.m" : "a.m";
    const displayHours = numHours % 12 || 12;

    // Si los minutos son '00', mostrar solo la hora
    if (minutes === "00") {
      return `${displayHours} ${suffix}`;
    } else {
      return `${displayHours}:${minutes} ${suffix}`;
    }
  };

  const sortedHours = [...hours].sort((a, b) => {
    return orderedDayKeys.indexOf(a.day) - orderedDayKeys.indexOf(b.day);
  });

  // Función para obtener los grupos de días con horarios similares
  const getDayGroups = (): DayGroup[] => {
    const groups: DayGroup[] = [];

    // Para agrupar días con el mismo horario
    const scheduleMap: Record<string, string[]> = {};

    // Procesar cada día
    sortedHours.forEach((hour) => {
      let scheduleKey = "";

      if (!hour.isOpen) {
        scheduleKey = "CLOSED";
      } else if (!hour.openTime || !hour.closeTime) {
        scheduleKey = "24H";
      } else {
        scheduleKey = `${hour.openTime}-${hour.closeTime}`;
      }

      if (!scheduleMap[scheduleKey]) {
        scheduleMap[scheduleKey] = [];
      }

      scheduleMap[scheduleKey].push(hour.day);
    });

    // Convertir el mapa en grupos
    Object.entries(scheduleMap).forEach(([key, days]) => {
      // Ordenar los días según orderedDayKeys
      days.sort(
        (a, b) => orderedDayKeys.indexOf(a) - orderedDayKeys.indexOf(b)
      );

      // Determinar el texto del horario
      let scheduleText = "";

      if (key === "CLOSED") {
        scheduleText = "Cerrado";
      } else if (key === "24H") {
        scheduleText = "Abierto 24h";
      } else {
        const [openTime, closeTime] = key.split("-");
        scheduleText = `${formatTime(openTime)} - ${formatTime(closeTime)}`;
      }

      // Agrupar días consecutivos
      const dayGroups: string[][] = [];
      let currentGroup: string[] = [days[0]];

      for (let i = 1; i < days.length; i++) {
        const currentDay = days[i];
        const prevDay = days[i - 1];

        // Verificar si los días son consecutivos
        if (
          orderedDayKeys.indexOf(currentDay) ===
          orderedDayKeys.indexOf(prevDay) + 1
        ) {
          currentGroup.push(currentDay);
        } else {
          dayGroups.push([...currentGroup]);
          currentGroup = [currentDay];
        }
      }

      if (currentGroup.length > 0) {
        dayGroups.push(currentGroup);
      }

      // Crear grupo para cada conjunto de días consecutivos
      dayGroups.forEach((groupDays) => {
        groups.push({
          days: groupDays,
          schedule: scheduleText,
        });
      });
    });

    // Ordenar los grupos según el primer día de cada grupo
    groups.sort((a, b) => {
      return (
        orderedDayKeys.indexOf(a.days[0]) - orderedDayKeys.indexOf(b.days[0])
      );
    });

    return groups;
  };

  // Obtener los grupos de días
  const dayGroups = getDayGroups();

  // Formatear texto para rango de días
  const formatDayRangeText = (days: string[]): string => {
    if (days.length === 1) {
      return `${dayReverseMap[days[0]]}:`;
    } else {
      return `${dayReverseMap[days[0]]} - ${
        dayReverseMap[days[days.length - 1]]
      }:`;
    }
  };

  return (
    <div className="space-y-4 text-black">
      {dayGroups.map((group, index) => (
        <div key={index} className="flex flex-col">
          <div className="font-bold">{formatDayRangeText(group.days)}</div>
          <div>{group.schedule}</div>
        </div>
      ))}
    </div>
  );
};

const MuseumPage = () => {
  // ----[ States ]----
  const [museum, setMuseum] = useState<Museum | null>(null);
  const [loading, setLoading] = useState(true);

  // ----[ Hooks ]----
  const { id } = useParams<{ id: string }>();

  // ----[ Callbacks ]----
  const fetchMuseum = useCallback(async () => {
    try {
      setLoading(true);
      const museumData = await getMuseumById(id as string);
      setMuseum(museumData);
    } catch (error) {
      console.error("Error al obtener datos del museo:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ----[ Effects ]----
  useEffect(() => {
    fetchMuseum();
  }, [fetchMuseum]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando...
      </div>
    );
  }

  if (!museum) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      {/* Sección de imagen full-width */}
      <div className="w-screen ml-[calc(-50vw+50%)] overflow-hidden">
        <Card className="border-0 rounded-none shadow-xl">
          <img
            src={museum.main_photo}
            alt={museum.name}
            className="w-full h-[400px] object-cover"
          />
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col mb-8">
            <h1 className="mb-6 text-4xl font-bold tracking-tight font-kaiseiDecol">
              {museum.name}
            </h1>
            <p className="leading-7 text-muted-foreground">
              {museum.description}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-3">
            {/* Horario */}
            <MuseumInfoCard
              title="Horarios"
              icon={<Clock className="w-6 h-6 text-white" />}
            >
              {museum.hours && museum.hours.length > 0 ? (
                <MuseumHoursDisplay hours={museum.hours} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Horario no disponible
                </p>
              )}
            </MuseumInfoCard>

            {/* Ubicación */}
            <MuseumInfoCard
              title="Ubicación"
              icon={<MapPin className="w-6 h-6 text-white" />}
            >
              <p className="text-sm text-muted-foreground">
                {museum.address_name || "Ubicación no disponible"}
              </p>
            </MuseumInfoCard>

            {/* Precio */}
            <MuseumInfoCard
              title="Cuota de recuperación"
              icon={<DollarSign className="w-6 h-6 text-white" />}
            >
              <p className="text-sm text-muted-foreground">no disponible</p>
            </MuseumInfoCard>
          </div>

          {/* Google Maps iframe */}
          {museum.latitude && museum.longitude && (
            <div className="mb-10 overflow-hidden border rounded-lg shadow-md">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500!2d${museum.longitude}!3d${museum.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1620000000000!5m2!1ses-419!2smx`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title={`Ubicación de ${museum.name}`}
              ></iframe>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <MuseumStatus />
          </div>

          {/* Recorridos */}
          <div className="container flex flex-col px-4 mx-auto sm:px-6 md:px-8">
            {/* Title */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center mb-2 text-primary/50">
                <span className="mr-2 text-lg sm:text-xl">•</span>
                <p className="text-xs font-bold tracking-widest uppercase sm:text-sm">
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
              <div className="relative cursor-pointer group">
                <img
                  src="/assets/images/pictures/pasillo.png"
                  alt="Instalaciones"
                  className="w-full h-[400px] object-cover blur-[2px]"
                />
                <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/10" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                  <p className="mb-2 text-lg font-medium">Solo En Muvi</p>
                  <h2 className="px-4 text-3xl font-bold text-center md:text-4xl font-kaiseiDecol">
                    Ver Instalaciones de Fernando del Paso
                  </h2>
                </div>
              </div>
            </div>

            {/* Sección de Ayuda */}
            <div className="container px-4 py-16 mx-auto">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <h3 className="text-sm font-medium tracking-widest uppercase text-primary text-muted-foreground">
                    Ayuda
                  </h3>
                </div>

                <h2 className="text-3xl font-bold font-kaiseiDecol">
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
