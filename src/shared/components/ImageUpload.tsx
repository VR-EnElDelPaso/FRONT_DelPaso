import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  error?: boolean;
}

const ImageUpload = ({ value, onChange, onClear, error }: ImageUploadProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: "Error al subir imagen",
        description: `La imagen es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB}MB. Tu imagen tiene ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB.`,
        variant: "destructive",
      });
      event.target.value = "";
      return;
    }

    try {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result as string;
        onChange(base64);
      };

      reader.onerror = () => {
        toast({
          title: "Error al procesar imagen",
          description:
            "No se pudo leer el archivo. Por favor, intenta de nuevo.",
          variant: "destructive",
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Error al procesar imagen",
        description:
          "Ocurrió un error al procesar la imagen. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onClear();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className={error ? "border-destructive" : ""}
          onClick={() => inputRef.current?.click()}
        >
          Subir imagen
        </Button>
        <span className="text-sm text-muted-foreground">
          Tamaño máximo: {MAX_FILE_SIZE_MB}MB
        </span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {value && (
        <div className="relative inline-block">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={value}
            alt="Preview"
            className="rounded-md max-h-48 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
