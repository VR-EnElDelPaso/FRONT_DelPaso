import { useState } from "react";
import { MuseumHours } from "@/types/Museums";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/shared/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface HoursDisplayProps {
  hours: MuseumHours[];
}

// Definir el tipo para los datos de la tabla
interface HourTableData {
  day: string;
  schedule: string;
  isOpen: boolean;
}

const HoursDisplay = ({ hours }: HoursDisplayProps) => {
  const [open, setOpen] = useState(false);

  // Mapeo de nombres de días en inglés a español
  const dayTranslations: Record<string, string> = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
  };

  // Orden correcto de los días para mostrar
  const dayOrder = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  if (!hours || hours.length === 0) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Clock className="w-4 h-4" />
        <span>No especificado</span>
      </div>
    );
  }

  // Para mostrar una versión detallada en la tabla de administración
  const openDays = hours.filter((h) => h.isOpen);

  // Texto de resumen para el botón
  let summaryText = "";

  if (openDays.length === 0) {
    summaryText = "Cerrado todos los días";
  } else {
    // Verificar si todos los días tienen el mismo horario
    const allSameHours = openDays.every(
      (day) =>
        day.openTime === openDays[0].openTime &&
        day.closeTime === openDays[0].closeTime
    );

    // Si todos los días tienen el mismo horario y son los 7 días
    if (allSameHours && openDays.length === 7) {
      if (
        (!openDays[0].openTime && !openDays[0].closeTime) ||
        (openDays[0].openTime === "00:00" && openDays[0].closeTime === "23:59")
      ) {
        summaryText = "Abierto 24 horas";
      } else {
        summaryText = `Todos los días ${openDays[0].openTime} - ${openDays[0].closeTime}`;
      }
    } else {
      summaryText = `Abierto ${openDays.length} días`;
    }
  }

  // Preparar datos para la tabla (ahora fuera de useMemo)
  const tableData: HourTableData[] = [...hours]
    .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))
    .map((hour) => ({
      day: dayTranslations[hour.day] || hour.day,
      schedule: hour.isOpen
        ? hour.openTime && hour.closeTime
          ? `${hour.openTime} - ${hour.closeTime}`
          : "24 horas"
        : "Cerrado",
      isOpen: hour.isOpen,
    }));

  // Definir las columnas para la tabla
  const columns: ColumnDef<HourTableData>[] = [
    {
      accessorKey: "day",
      header: "Día",
    },
    {
      accessorKey: "schedule",
      header: "Horario",
      cell: ({ row }) => {
        const isOpen = row.original.isOpen;
        return (
          <span className={isOpen ? "text-green-600" : "text-red-500"}>
            {row.getValue("schedule")}
          </span>
        );
      },
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
        >
          <Clock className="w-4 h-4" />
          <span>{summaryText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">Horarios</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <DataTable
            columns={columns}
            data={tableData}
            canCreate={false}
            canEdit={false}
            canDelete={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HoursDisplay;
