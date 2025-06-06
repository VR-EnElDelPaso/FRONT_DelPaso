import { Badge } from "@/components/ui/badge";

import AccreditableImage from "/assets/shared/images/acreditable.png";

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
            <img
              src={AccreditableImage}
              alt="Acreditable"
              className="inline h-4 w-auto mr-1 filter brightness-0 invert"
            />
            {formatHours(accreditableHours ?? null)}
          </>
        );
      case "detailed":
        return (
          <>
            <img
              src={AccreditableImage}
              alt="Acreditable"
              className="inline h-5 w-auto mr-1 filter brightness-0 invert"
            />
            <div className="inline-block h-5 w-px bg-white opacity-40 mx-2 align-middle" />
            Recorrido Acreditable {formatHours(accreditableHours ?? null)}
          </>
        );
      default:
        return (
          <>
            <img
              src={AccreditableImage}
              alt="Acreditable"
              className="inline h-4 w-auto mr-1 filter brightness-0 invert"
            />
            {formatHours(accreditableHours ?? null)}
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
