import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../RatingStars";
import { useToast } from "@/hooks/use-toast";
import { ReviewService } from "@/services/Review";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { rating: number; comment: string }) => void;
}

export default function ReviewDialog({
  isOpen,
  onClose,
  onSubmit,
}: ReviewDialogProps) {
  const { id: tourId } = useParams();
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ rating: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setRating(0);
    setComment("");
    setErrors({ rating: "", comment: "" });
  };

  const validateForm = () => {
    const newErrors = { rating: "", comment: "" };
    let isValid = true;

    if (rating === 0) {
      newErrors.rating = "Por favor, selecciona una calificación";
      isValid = false;
    }

    if (!comment.trim() || comment.trim().length < 10) {
      newErrors.comment = "El comentario debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourId) {
      toast({
        title: "Error",
        description: "No se encontró el ID del recorrido.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await ReviewService.createReview(tourId, { score: rating, comment });

      // Call onSubmit prop if provided
      if (onSubmit) {
        onSubmit({ rating, comment });
      }

      toast({
        title: "¡Gracias por tu opinión!",
        description: "Tu comentario ha sido enviado exitosamente.",
        variant: "default",
      });

      resetForm();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Hubo un problema al enviar tu comentario.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-lg p-6 w-full max-w-5xl shadow-xl">
        <h2 className="text-3xl font-medium text-dark font-kaiseiDecol mb-6">
          Comparte tu experiencia en este recorrido
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comment Textarea */}
          <div className="space-y-2">
            <textarea
              className={`w-full p-3 border rounded-lg resize-none h-32 
                ${errors.comment ? "border-red-500" : "border-gray-300"}`}
              placeholder="Cuéntanos tu experiencia con el recorrido..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment}</p>
            )}
          </div>

          {/* Rating Stars */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-600 mb-1">
              Calificación
            </label>
            <RatingStars value={rating} onChange={setRating} />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary hover:bg-gray-100 rounded-lg border border-primary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar opinión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
