// src/features/admin/components/HoursDialog.tsx
import { useState, useEffect } from "react";
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
import { MuseumHours } from "@/types/Museums";

interface HoursDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hours: MuseumHours[]) => void;
  initialHours: MuseumHours[];
  editingDay: string | null;
}

const daysOfWeek = [
  { key: "D", label: "Domingo" },
  { key: "L", label: "Lunes" },
  { key: "M", label: "Martes" },
  { key: "M", label: "Miércoles" },
  { key: "J", label: "Jueves" },
  { key: "V", label: "Viernes" },
  { key: "S", label: "Sábado" },
];

const HoursDialog = ({
  isOpen,
  onClose,
  onSave,
  initialHours,
  editingDay,
}: HoursDialogProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [is24Hours, setIs24Hours] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  useEffect(() => {
    if (isOpen && initialHours.length > 0) {
      let daysToSelect: string[] = [];

      if (editingDay === "all") {
        daysToSelect = initialHours.map((h) => h.day);
        // Resetear estados para edición múltiple
        setIs24Hours(false);
        setIsClosed(false);
        setOpenTime("");
        setCloseTime("");
      } else if (editingDay === "weekdays") {
        daysToSelect = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        // Resetear estados para edición múltiple
        setIs24Hours(false);
        setIsClosed(false);
        setOpenTime("");
        setCloseTime("");
      } else if (editingDay) {
        daysToSelect = [editingDay];
        // Obtener el horario del día específico que se está editando
        const referenceHours = initialHours.find((h) => h.day === editingDay);
        if (referenceHours) {
          setIs24Hours(
            referenceHours.isOpen &&
              (!referenceHours.openTime || !referenceHours.closeTime)
          );
          setIsClosed(!referenceHours.isOpen);
          setOpenTime(referenceHours.openTime || "");
          setCloseTime(referenceHours.closeTime || "");
        }
      }

      setSelectedDays(daysToSelect);
    }
  }, [isOpen, initialHours, editingDay]);

  const handleDayClick = (dayLabel: string) => {
    setSelectedDays((prev) => {
      // Si el día está seleccionado y no es el único, quitarlo
      if (prev.includes(dayLabel)) {
        return prev.length > 1 ? prev.filter((d) => d !== dayLabel) : prev;
      }
      // Si no está seleccionado, agregarlo
      return [...prev, dayLabel];
    });
  };

  const handleSave = () => {
    // Crear una copia de los horarios iniciales
    const updatedHours = [...initialHours];

    // Crear el nuevo horario para los días seleccionados
    const newSchedule = {
      isOpen: !isClosed,
      openTime: is24Hours ? undefined : openTime,
      closeTime: is24Hours ? undefined : closeTime,
    };

    // Actualizar cada día seleccionado
    selectedDays.forEach((day) => {
      const index = updatedHours.findIndex((h) => h.day === day);
      if (index !== -1) {
        updatedHours[index] = {
          ...updatedHours[index],
          ...newSchedule,
        };
      }
    });

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
                onClick={() => handleDayClick(day.label)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                  selectedDays.includes(day.label)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {day.key}
              </button>
            ))}
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="24hours"
                checked={is24Hours}
                onCheckedChange={(checked) => {
                  setIs24Hours(checked as boolean);
                  if (checked) {
                    setIsClosed(false);
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
                  setIsClosed(checked as boolean);
                  if (checked) {
                    setIs24Hours(false);
                  }
                }}
              />
              <Label htmlFor="closed">Cerrado</Label>
            </div>
          </div>

          {/* Inputs de horario */}
          {!is24Hours && !isClosed && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Apertura</Label>
                  <Input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-500 text-sm">Cierre</Label>
                  <Input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                  />
                </div>
              </div>
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
