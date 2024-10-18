import { useEffect, useState } from "react";
import RatingStars from "../RatingStars";
import { useToast } from "@/hooks/use-toast";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export default function Dialog({ isOpen, onClose, onSubmit }: DialogProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ rating: "", comment: "" });

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setComment("");
      setErrors({ rating: "", comment: "" });
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = { rating: "", comment: "" };
    let isValid = true;

    if (rating === 0) {
      newErrors.rating = "Por favor, selecciona una calificación";
      isValid = false;
    }

    if (!comment.trim()) {
      newErrors.comment = "Por favor, escribe un comentario";
      isValid = false;
    } else if (comment.trim().length < 10) {
      newErrors.comment = "El comentario debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        await onSubmit({ rating, comment });
        toast({
          title: "¡Gracias por tu opinión!",
          description: "Tu comentario ha sido enviado exitosamente.",
          variant: "default",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description:
            "Hubo un problema al enviar tu comentario. Por favor, intenta nuevamente.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-5xl shadow-xl">
        <div className="space-y-6">
          <h2 className="text-3xl font-medium text-dark font-kaiseiDecol">
            ¿Qué te pareció el recorrido?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Comment textarea */}
            <div className="space-y-2">
              <textarea
                className={`w-full p-3 border rounded-lg resize-none h-32 focus:ring-2 focus:ring-primary/20 transition-all
                  ${
                    errors.comment
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                placeholder="Cuéntanos tu experiencia con el recorrido..."
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (errors.comment) {
                    setErrors((prev) => ({ ...prev, comment: "" }));
                  }
                }}
                aria-invalid={errors.comment ? "true" : "false"}
              />
              {errors.comment && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.comment}
                </p>
              )}
            </div>

            {/* Rating stars */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 mb-1">
                Calificación
              </label>
              <div className="flex items-center gap-2">
                <RatingStars
                  value={rating}
                  onChange={(value) => {
                    setRating(value);
                    if (errors.rating) {
                      setErrors((prev) => ({ ...prev, rating: "" }));
                    }
                  }}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm ml-2" role="alert">
                    {errors.rating}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-primary hover:bg-gray-100 rounded-lg border border-primary transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Enviar opinión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
