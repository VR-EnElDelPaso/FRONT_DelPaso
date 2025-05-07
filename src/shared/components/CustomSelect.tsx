import { ChevronDown } from "lucide-react";

// Mantener la interfaz original para compatibilidad
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[]; // Tipo simplificado que acepta Museum, Tour y otros objetos similares
  placeholder: string;
  error?: boolean;
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  error,
}: CustomSelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-10 px-3 rounded-md border bg-background text-sm outline-none 
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-input 
            disabled:cursor-not-allowed disabled:opacity-50 appearance-none
            ${error ? "border-destructive" : "border-input"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
    </div>
  );
};