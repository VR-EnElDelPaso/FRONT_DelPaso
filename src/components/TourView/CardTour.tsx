import React from 'react';
import { dateFormatter } from "../../utils/dateFormatter";
import { FaArrowRight, FaShare, FaEnvelope } from "react-icons/fa";

{/* Interfaces */}
export interface CardTourProps {
    id: number;
    date: string;
    title: string;
    imagePath: string;
    description: string;
    prize: number;
}

interface CardImageProps {
    imagePath: string;
    title: string;
}

interface CardHeaderProps {
    date: string;
    title: string;
}

interface CardDescriptionProps {
    description: string;
}

interface HoverButtonProps {
    text: string;
}

interface PriceTagProps {
    prize: number;
}

interface BuyButtonProps {
    id: number;
    onBuy: (id: number) => void;
}

type CardContentProps = Omit<CardTourProps, 'imagePath'>;

{/* Componentes */}
const CardImage: React.FC<CardImageProps> = ({ imagePath, title }) => (
    <div className="w-full md:w-1/2">
        <img 
            src={imagePath} 
            alt={title} 
            className="w-full h-64 md:h-full object-cover object-center"
        />
    </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ date, title }) => (
    <div className='flex flex-col'>
        <h3 className="flex justify-end text-gray-500 text-sm mb-1">{dateFormatter(date)}</h3>
        <h2 className="font-kaiseiDecol font-medium text-2xl sm:text-3xl text-gray-900 leading-tight mb-4">{title}</h2>
    </div>
);

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => (
    <p className="font-inter text-gray-700 text-base mb-6">{description}</p>
);

const HoverButton: React.FC<HoverButtonProps> = ({ text }) => (
    <button className="hidden md:inline-block px-3 py-1 border-black border-b-2 relative overflow-hidden group">
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">{text}</span>
        <span className="absolute inset-0 z-0 text-white bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center justify-center">{text}</span>
    </button>
);

const MobileButton: React.FC<HoverButtonProps> = ({ text }) => (
    <button className="md:hidden inline-flex items-center justify-center px-3 py-1 border border-black rounded-full text-sm">
        {text === "Compartir" ? <FaShare className="mr-2" /> : <FaEnvelope className="mr-2" />}
        {text}
    </button>
);

const PriceTag: React.FC<PriceTagProps> = ({ prize }) => (
    <p className="font-inter font-semibold text-lime-500 text-lg text-right">
        ${prize} <span className="text-sm">MXN</span>
    </p>
);

const BuyButton: React.FC<BuyButtonProps> = ({ id, onBuy }) => (
    <button 
        onClick={() => onBuy(id)}
        className="w-full md:w-auto mt-4 md:mt-0 p-2 md:px-4 border-black border-2 rounded-3xl font-semibold relative overflow-hidden group"
    >
        <span className="relative z-10 transition-all duration-300 group-hover:pr-8">Comprar recorrido</span>
        <FaArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </button>
);

const CardContent: React.FC<CardContentProps> = ({ id, date, title, description, prize }) => {;
    const handleBuy = (tourId: string) => {
        console.log(`Comprando el recorrido ${tourId}`);
        // addItemToCart("371e86c9-d6df-4870-9d7d-7ca1ccb28464");
    };

    return (
        <div className="w-full md:w-7/12 flex flex-col justify-between p-4 md:p-6">
            <div>
                <CardHeader date={date} title={title} />
                <CardDescription description={description} />
            </div>
            <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex justify-between w-full md:w-auto mb-4 md:mb-0">
                        <div className="flex space-x-2 md:space-x-4">
                            <HoverButton text="Compartir" />
                            <HoverButton text="Contacto" />
                            <MobileButton text="Compartir" />
                            <MobileButton text="Contacto" />
                        </div>
                        <div className="md:hidden">
                            <PriceTag prize={prize} />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <PriceTag prize={prize} />
                    </div>
                </div>
                <BuyButton id={id} onBuy={() => {}} />
            </div>
        </div>
    );
};

{/* Componente principal */}
const CardTour: React.FC<CardTourProps> = ({ id, title, description, imagePath, prize, date }) => {
    return (
        <div className="mb-4 max-w-sm md:max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row lg:space-x-20">
            <CardImage imagePath={imagePath} title={title} />
            <CardContent id={id} date={date} title={title} description={description} prize={prize} />
        </div>
    )
}

export default CardTour;