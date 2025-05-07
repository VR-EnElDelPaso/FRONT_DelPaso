import { useState, useEffect } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { MuseumHours, dayReverseMap } from "@/types/Museums";
import { toast } from "@/hooks/use-toast";

interface HoursDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hours: MuseumHours[]) => void;
  initialHours: MuseumHours[];
  editingDay: string | null;
}

// Schema de validación con Zod
const timeSchema = z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
  message: "Formato de hora inválido. Use HH:MM (24h)",
});

// Definición de los días de la semana con sus representaciones
const daysOfWeek = [
  { key: "D", label: "Domingo", apiName: "SUNDAY" },
  { key: "L", label: "Lunes", apiName: "MONDAY" },
  { key: "M", label: "Martes", apiName: "TUESDAY" },
  { key: "W", label: "Miércoles", apiName: "WEDNESDAY" },
  { key: "J", label: "Jueves", apiName: "THURSDAY" },
  { key: "V", label: "Viernes", apiName: "FRIDAY" },
  { key: "S", label: "Sábado", apiName: "SATURDAY" },
];

// Función auxiliar para convertir un día de español a formato API
const getApiDayName = (day: string): string => {
  // Si es uno de los valores especiales, devolverlo tal cual
  if (day === "all" || day === "weekdays" || day === "weekend") {
    return day;
  }

  // Buscar en el mapa inverso
  for (const [apiDay, spanishDay] of Object.entries(dayReverseMap)) {
    if (spanishDay === day) {
      return apiDay;
    }
  }

  // Si no se encuentra, asumir que ya está en formato API
  return day;
};

const HoursDialog = ({
  isOpen,
  onClose,
  onSave,
  initialHours,
  editingDay,
}: HoursDialogProps) => {
  // Estados para el diálogo
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [is24Hours, setIs24Hours] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  // Estados para validación
  const [errors, setErrors] = useState<{
    openTime?: string;
    closeTime?: string;
    timeComparison?: string;
  }>({});

  // Inicializar los estados basados en el día seleccionado
  useEffect(() => {
    if (!isOpen) return;

    // If initialHours is empty or undefined, return early or use a default value
    if (!initialHours || initialHours.length === 0) {
      console.log("No hay horas iniciales, utilizando valores predeterminados");
      // You might want to set some default hours here if needed
      return;
    }

    let daysToSelect: string[] = [];

    if (editingDay === "all") {
      // Seleccionar todos los días
      daysToSelect = initialHours.map((h) => h.day);
      resetTimeInputs();
    } else if (editingDay === "weekdays") {
      // Seleccionar días de semana (lunes-viernes)
      daysToSelect = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
      resetTimeInputs();
    } else if (editingDay === "weekend") {
      // Seleccionar fin de semana (sábado-domingo)
      daysToSelect = ["SATURDAY", "SUNDAY"];
      resetTimeInputs();
    } else if (editingDay) {
      // Seleccionar un día específico
      const dayApiName = getApiDayName(editingDay);
      daysToSelect = [dayApiName];

      // Cargar la configuración actual del día
      const dayConfig = initialHours.find((h) => h.day === dayApiName);
      if (dayConfig) {
        setIs24Hours(
          dayConfig.isOpen && (!dayConfig.openTime || !dayConfig.closeTime)
        );
        setIsClosed(!dayConfig.isOpen);
        setOpenTime(dayConfig.openTime || "");
        setCloseTime(dayConfig.closeTime || "");
      }
    }

    setSelectedDays(daysToSelect);
  }, [isOpen, initialHours, editingDay]);

  // Función para resetear los inputs de tiempo
  const resetTimeInputs = () => {
    setIs24Hours(false);
    setIsClosed(false);
    setOpenTime("");
    setCloseTime("");
    setErrors({});
  };

  // Manejar la selección/deselección de un día
  const handleDayClick = (apiDay: string) => {
    setSelectedDays((prev) => {
      // Si ya está seleccionado y no es el único, quitarlo
      if (prev.includes(apiDay)) {
        return prev.length > 1 ? prev.filter((d) => d !== apiDay) : prev;
      }
      // Añadirlo a la selección
      return [...prev, apiDay];
    });
  };

  // Validar los horarios
  const validateHours = (): boolean => {
    // Resetear errores
    setErrors({});

    // Si está cerrado o es 24 horas, no hay validación
    if (isClosed || is24Hours) return true;

    let isValid = true;
    const newErrors: {
      openTime?: string;
      closeTime?: string;
      timeComparison?: string;
    } = {};

    // Validar hora de apertura
    if (!openTime) {
      newErrors.openTime = "La hora de apertura es obligatoria";
      isValid = false;
    } else {
      try {
        timeSchema.parse(openTime);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.openTime = error.errors[0].message;
          isValid = false;
        }
      }
    }

    // Validar hora de cierre
    if (!closeTime) {
      newErrors.closeTime = "La hora de cierre es obligatoria";
      isValid = false;
    } else {
      try {
        timeSchema.parse(closeTime);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors.closeTime = error.errors[0].message;
          isValid = false;
        }
      }
    }

    // Comparar horas (apertura debe ser anterior a cierre)
    if (isValid && openTime && closeTime) {
      const openMinutes =
        parseInt(openTime.split(":")[0]) * 60 +
        parseInt(openTime.split(":")[1]);
      const closeMinutes =
        parseInt(closeTime.split(":")[0]) * 60 +
        parseInt(closeTime.split(":")[1]);

      if (openMinutes >= closeMinutes) {
        newErrors.timeComparison =
          "La hora de cierre debe ser posterior a la de apertura";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Guardar los cambios
  const handleSave = () => {
    // Validar horarios si no está cerrado y no es 24 horas
    if (!isClosed && !is24Hours) {
      if (!validateHours()) {
        toast({
          title: "Error de validación",
          description: "Por favor, corrija los errores en el formulario.",
          variant: "destructive",
        });
        return;
      }
    }

    const updatedHours = [...initialHours];

    // Crear la configuración basada en los estados actuales
    const newSchedule = {
      isOpen: !isClosed,
      // Para 24 horas, establecer explícitamente "00:00" y "23:59"
      openTime: is24Hours ? "00:00" : openTime,
      closeTime: is24Hours ? "23:59" : closeTime,
    };

    console.log("Nueva configuración de horario:", newSchedule);

    // Actualizar cada día seleccionado
    selectedDays.forEach((day) => {
      const index = updatedHours.findIndex((h) => h.day === day);
      if (index !== -1) {
        updatedHours[index] = { ...updatedHours[index], ...newSchedule };
      }
    });

    console.log("Horarios actualizados antes de guardar:", updatedHours);
    onSave(updatedHours);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-6">
        <DialogHeader>
          <DialogTitle>Selecciona los días y el horario</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selección de días */}
          <div className="flex justify-between mb-6">
            {daysOfWeek.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day.apiName)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                  selectedDays.includes(day.apiName)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
                title={day.label}
              >
                {day.key}
              </button>
            ))}
          </div>

          {/* Opciones de horario */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="24hours"
                checked={is24Hours}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setIs24Hours(isChecked);
                  if (isChecked) {
                    setIsClosed(false);
                    setErrors({});
                  }
                }}
                disabled={isClosed}
              />
              <Label htmlFor="24hours">Abierto las 24 horas</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="closed"
                checked={isClosed}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setIsClosed(isChecked);
                  if (isChecked) {
                    setIs24Hours(false);
                    setErrors({});
                  }
                }}
              />
              <Label htmlFor="closed">Cerrado</Label>
            </div>
          </div>

          {/* Inputs de horario - solo visibles si no está cerrado y no es 24h */}
          {!is24Hours && !isClosed && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    className={`text-sm ${
                      errors.openTime ? "text-destructive" : "text-gray-500"
                    }`}
                  >
                    Apertura
                  </Label>
                  <Input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className={errors.openTime ? "border-destructive" : ""}
                  />
                  {errors.openTime && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.openTime}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    className={`text-sm ${
                      errors.closeTime ? "text-destructive" : "text-gray-500"
                    }`}
                  >
                    Cierre
                  </Label>
                  <Input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className={errors.closeTime ? "border-destructive" : ""}
                  />
                  {errors.closeTime && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.closeTime}
                    </p>
                  )}
                </div>
              </div>
              {errors.timeComparison && (
                <p className="text-xs text-destructive">
                  {errors.timeComparison}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HoursDialog;
