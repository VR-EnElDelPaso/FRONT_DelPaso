import { dateFormatter } from "../../utils/dateFormatter";
import { FaArrowRight } from "react-icons/fa";

export interface CardTourProps {
    id: number;
    date: string;
    title: string;
    imagePath: string;
    description: string;
    prize: number;
}

export default function CardTour({ title, description, imagePath, prize, date }: CardTourProps) {
    return (
        <div className="mb-4 max-w-sm md:max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Imagen */}
            <div className="w-full md:w-1/2">
                <img 
                    src={imagePath} 
                    alt={title} 
                    className="w-full h-64 md:h-full object-cover object-center"
                />
            </div>

            {/* Contenido */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-4 md:p-6">
                {/* Título y fecha */}
                <div>
                    <h3 className="text-gray-500 text-sm mb-1">{dateFormatter(date)}</h3>
                    <h2 className="font-kaiseiDecol font-medium text-2xl text-gray-900 leading-tight mb-4">{title}</h2>
                    <p className="font-inter text-gray-700 text-base mb-6">{description}</p>
                </div>

                {/* Botones y precio */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-m">
                            <button className="mr-2 px-3 py-1 border-black border-b-2 relative overflow-hidden group">
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">Compartir</span>
                                <span className="absolute inset-0 z-0 text-white bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center justify-center">Compartir</span>
                            </button>
                            <button className="px-3 py-1 border-black border-b-2 relative overflow-hidden group">
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full block">Contacto</span>
                                <span className="absolute inset-0 z-0 text-white bg-black transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center justify-center">Contacto</span>
                            </button>
                        </div>
                        <p className="font-inter font-semibold text-lime-500 text-lg">
                            ${prize} <span className="text-sm">MXN</span>
                        </p>
                    </div>
                    <button className="w-full mt-2 p-2 border-black border-2 rounded-3xl font-semibold relative overflow-hidden group">
                        <span className="relative z-10 transition-all duration-300 group-hover:pr-8">Comprar recorrido</span>
                        <FaArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </button>
                </div>
            </div>
        </div>
    )
}