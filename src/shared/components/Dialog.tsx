import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export default function Dialog({ isOpen, onClose, onSubmit }: DialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setComment("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-3xl font-medium mb-8 text-dark font-kaiseiDecol">
          ¿Qué te pareció el recorrido?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              className="w-full p-3 border rounded-lg resize-none h-32"
              placeholder="Escribenos un comentario."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-start mb-4">
            <RatingStars value={rating} onChange={setRating} />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary hover:bg-gray-100 rounded-lg border border-primary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
