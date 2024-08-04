import React from 'react';
import { useParams } from 'react-router-dom';
import TourView from './TourView';

const Tour: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return <div>ID de tour no proporcionado</div>;

  const tourId = parseInt(id, 10);

  if (isNaN(tourId)) return <div>ID de tour inválido</div>;

  return <TourView tourId={tourId} />;
};

export default Tour;