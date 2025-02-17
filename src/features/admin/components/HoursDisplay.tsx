import { Clock } from "lucide-react";
import { MuseumHours } from "@/types/Museums";

interface HoursDisplayProps {
  hours: MuseumHours[];
}

const HoursDisplay = ({ hours }: HoursDisplayProps) => {
  const getDisplayText = () => {
    const openDays = hours.filter((h) => h.isOpen);

    if (openDays.length === 0) return "Cerrado";

    const allSameHours = openDays.every(
      (day) =>
        day.openTime === openDays[0].openTime &&
        day.closeTime === openDays[0].closeTime
    );

    if (allSameHours) {
      if (openDays.length === 7) {
        if (
          openDays[0].openTime === "00:00" &&
          openDays[0].closeTime === "23:59"
        ) {
          return "Abierto 24 horas";
        }
        return `Todos los días ${openDays[0].openTime} - ${openDays[0].closeTime}`;
      }
    }

    const firstDay = openDays[0];
    if (firstDay.openTime === "00:00" && firstDay.closeTime === "23:59") {
      return "Abierto 24 horas";
    }
    return `${firstDay.openTime} - ${firstDay.closeTime}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Clock className="w-4 h-4" />
      <span>{getDisplayText()}</span>
    </div>
  );
};

export default HoursDisplay;
