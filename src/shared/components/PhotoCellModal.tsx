import { useState } from "react";

interface PhotoCellModalProps {
  photo: string;
  altText?: string;
  placeholderImage?: string;
}

const PhotoCellModal = ({ 
  photo, 
  altText = "Foto principal",
  placeholderImage = '/placeholder-image.jpg' 
}: PhotoCellModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!photo) {
    return <span className="text-gray-400">Sin imagen</span>;
  }

  return (
    <div>
      <div 
        className="relative w-16 h-16 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={photo}
          alt={altText}
          className="object-cover w-full h-full rounded-md hover:opacity-80 transition-opacity"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img
              src={photo}
              alt={altText}
              className="max-w-full max-h-[85vh] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImage;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCellModal;