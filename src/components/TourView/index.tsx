import React from 'react';
import { useParams } from 'react-router-dom';
import TourView from './TourView';

const Tour: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return <div>ID de tour no proporcionado</div>;

  return <TourView tourId={id} />;
};

export default Tour;