import React from 'react';

interface SkeletonProps {
  active?: boolean;
  avatar?: boolean;
  title?: boolean;
  paragraph?: boolean;
  paragraphRows?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  active = false,
  avatar = false,
  title = true,
  paragraph = true,
  paragraphRows = 3,
}) => {
  return (
    <div className={`animate-pulse ${active ? 'opacity-80' : ''}`}>
      {avatar && (
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
      )}
      {title && (
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      )}
      {paragraph && (
        <div className="space-y-2">
          {[...Array(paragraphRows)].map((_, index) => (
            <div 
              key={index} 
              className={`h-4 bg-gray-300 rounded ${
                index === paragraphRows - 1 ? 'w-1/2' : 'w-full'
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skeleton;