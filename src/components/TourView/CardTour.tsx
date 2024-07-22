import React from 'react';
import { dateFormatter } from "../../utils/dateFormatter";
import { FaArrowRight } from "react-icons/fa";

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
    <div>
        <h3 className="text-gray-500 text-sm mb-1">{dateFormatter(date)}</h3>
        <h2 className="font-kaiseiDecol font-medium text-2xl sm:text-3xl text-gray-900 leading-tight mb-4">{title}</h2>
    </div>
);

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => (
    <p className="font-inter text-gray-700 text-base mb-6">{description}</p>
);

const HoverButton: React.FC<HoverButtonProps> = ({ text }) => (
    <button className="px-3 py-1 border-black border-b-2 relative overflow-hidden group">
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">{text}</span>
        <span className="absolute inset-0 z-0 text-white bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center justify-center">{text}</span>
    </button>
);

const PriceTag: React.FC<PriceTagProps> = ({ prize }) => (
    <p className="font-inter font-semibold text-lime-500 text-lg">
        ${prize} <span className="text-sm">MXN</span>
    </p>
);

const BuyButton: React.FC<BuyButtonProps> = ({ id, onBuy }) => (
    <button 
        onClick={() => onBuy(id)}
        className="w-full mt-2 p-2 border-black border-2 rounded-3xl font-semibold relative overflow-hidden group"
    >
        <span className="relative z-10 transition-all duration-300 group-hover:pr-8">Comprar recorrido</span>
        <FaArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </button>
);

{/* Contenido de la Card */}
const CardContent: React.FC<CardContentProps> = ({ id, date, title, description, prize }) => {
    // Simulación de compra
    const handleBuy = (tourId: number) => {
        console.log(`Comprando el recorrido ${tourId}`);
    };

    return (
        <div className="w-full md:w-7/12 flex flex-col justify-between p-4 md:p-6">
            <div>
                <CardHeader date={date} title={title} />
                <CardDescription description={description} />
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-m">
                        <HoverButton text="Compartir" />
                        <HoverButton text="Contacto" />
                    </div>
                    <PriceTag prize={prize} />
                </div>
                <BuyButton id={id} onBuy={handleBuy} />
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