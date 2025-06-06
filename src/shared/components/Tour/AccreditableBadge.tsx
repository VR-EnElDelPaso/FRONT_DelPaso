import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

interface AccreditableBadgeProps {
  isAccreditable: boolean;
  accreditableHours?: number | null;
  variant?: "default" | "compact" | "detailed";
  showHours?: boolean; // Control para mostrar/ocultar horas
  className?: string;
}

export const AccreditableBadge = ({
  isAccreditable,
  accreditableHours,
  variant = "default",
  showHours = false, // Por defecto oculto según el ticket
  className = "",
}: AccreditableBadgeProps) => {
  if (!isAccreditable) return null;

  const formatHours = (hours: number | null) => {
    if (!hours || !showHours) return "";
    return ` - ${hours}h`;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return "text-xs px-2 py-1";
      case "detailed":
        return "text-sm px-3 py-1.5";
      default:
        return "text-sm px-3 py-1";
    }
  };

  const getContent = () => {
    switch (variant) {
      case "compact":
        return (
          <>
            <GraduationCap className="h-3 w-3 mr-1" />
            Acreditable{formatHours(accreditableHours ?? null)}
          </>
        );
      case "detailed":
        return (
          <>
            <GraduationCap className="h-4 w-4 mr-2" />
            Tour Acreditable{formatHours(accreditableHours ?? null)}
          </>
        );
      default:
        return (
          <>
            <GraduationCap className="h-3 w-3 mr-1" />
            Acreditable{formatHours(accreditableHours ?? null)}
          </>
        );
    }
  };

  return (
    <Badge
      className={`bg-green-600 hover:bg-green-700 text-white font-medium ${getVariantStyles()} ${className}`}
    >
      {getContent()}
    </Badge>
  );
};
