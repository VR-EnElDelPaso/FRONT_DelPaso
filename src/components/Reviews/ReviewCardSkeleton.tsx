import React from "react";

const ReviewCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-6 rounded-lg animate-pulse">
      <div className="flex items-center mb-2 px-6">
        <div className="h-4 w-1/3 bg-gray-300 rounded mr-2"></div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="h-4 w-4 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
      <div className="space-y-2 mt-4 px-6">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
