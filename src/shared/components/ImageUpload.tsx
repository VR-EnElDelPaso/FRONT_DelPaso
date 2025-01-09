import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE_MB = 5; // 5MB máximo
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ImageUpload = ({
  value,
  onChange,
  onClear,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  error?: boolean;
}) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Validar tamaño de archivo
      if (file.size > MAX_FILE_SIZE_BYTES) {
        console.log(
          `Imagen demasiado grande: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        );
        toast({
          title: "Error al subir imagen",
          description: `La imagen es demasiado grande. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB}MB. Tu imagen tiene ${(
            file.size /
            1024 /
            1024
          ).toFixed(2)}MB.`,
          variant: "destructive",
        });
        event.target.value = ""; // Limpiar input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className={error ? "border-destructive" : ""}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          Subir imagen
        </Button>
        <span className="text-sm text-muted-foreground">
          Tamaño máximo: {MAX_FILE_SIZE_MB}MB
        </span>
        <input
          id="image-upload"
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
            onClick={onClear}
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
