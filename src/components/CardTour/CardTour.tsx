import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaShare, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { dateFormatter } from "../../utils/dateFormatter";
import image from '/PA_Obra13.jpg';
import { 
  TourId, 
  CardImageProps, 
  CardHeaderProps,
  CardDescriptionProps,
  ActionButtonProps,
  PriceTagProps,
  BuyButtonProps
} from './types';
import { Tour } from '../../types/tour';

// Sub-components
const CardImage: React.FC<CardImageProps> = ({ imagePath, title }) => (
  <div className="w-full md:w-5/12 lg:w-1/2">
    <img 
      src={imagePath} 
      alt={title} 
      className="w-full h-64 md:h-full object-cover object-center"
    />
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ date, title }) => (
  <div className='flex flex-col'>
    <h3 className="text-right text-gray-500 text-xs sm:text-sm mb-1">{dateFormatter(date)}</h3>
    <h2 className="font-kaiseiDecol font-medium text-xl sm:text-2xl md:text-3xl text-gray-900 leading-tight mb-2 sm:mb-4">{title}</h2>
  </div>
);

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => (
  <p className="font-inter text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{description}</p>
);

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-center px-2 sm:px-3 py-1 border border-black rounded-full text-xs sm:text-sm hover:bg-black hover:text-white transition-colors duration-300"
  >
    {icon}
    <span className="ml-1 sm:ml-2">{text}</span>
  </button>
);

const PriceTag: React.FC<PriceTagProps> = ({ price }) => (
  <p className="font-inter font-semibold text-lime-500 text-base sm:text-lg text-right">
    ${price} <span className="text-xs sm:text-sm">MXN</span>
  </p>
);

const BuyButton: React.FC<BuyButtonProps> = ({ id, onBuy, isBuyNow = false }) => (
  <button 
    onClick={() => onBuy(id)}
    className={`
      w-full sm:w-auto p-2 sm:px-4 rounded-3xl 
      ${isBuyNow ? 'bg-black text-white' : 'bg-white text-black'} 
      border-black border-2 font-semibold 
      relative overflow-hidden group
      text-xs sm:text-sm md:text-base
    `}
  >
    <span className="relative z-10 transition-all duration-300 group-hover:pr-6 sm:group-hover:pr-8">
      {isBuyNow ? "Comprar ahora" : "Agregar al carrito"}
    </span>
    {isBuyNow ? (
      <FaArrowRight 
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 
                   opacity-100 sm:opacity-0 transition-all duration-300 
                   group-hover:opacity-100" 
      />
    ) : (
      <FaShoppingCart 
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 
                   opacity-100 sm:opacity-0 transition-all duration-300 
                   group-hover:opacity-100" 
      />
    )}
  </button>
);

// Main component
const CardTour = (tour: Tour) => {
  const { id, name, description, price, created_at } = tour;
  const navigate = useNavigate();
  
  const handleBuy = (tourId: TourId) => {
    navigate(`/buy/${tourId}`, { state: { tour } });
  }

  const handleAddToCart = (tourId: TourId) => {
    console.log(`Agregando al carrito el recorrido ${tourId}`);
  };

  const handleShare = () => {
    console.log('Compartiendo...');
  };

  const handleContact = () => {
    console.log('Contactando...');
  };

  return (
    <div className="mb-4 max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      <CardImage imagePath={image} title={name} />
      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-between p-3 sm:p-4 md:p-6">
        <div>
          <CardHeader date={created_at} title={name} />
          <CardDescription description={description} />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-4">
            <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0">
              <ActionButton text="Compartir" icon={<FaShare />} onClick={handleShare} />
              <ActionButton text="Contacto" icon={<FaEnvelope />} onClick={handleContact} />
            </div>
            <PriceTag price={price} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <BuyButton id={id} onBuy={handleBuy} isBuyNow={true} />
            <BuyButton id={id} onBuy={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTour;