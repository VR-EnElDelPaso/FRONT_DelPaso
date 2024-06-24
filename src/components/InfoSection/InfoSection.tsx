import { FaRegClock, FaLocationDot } from "react-icons/fa6";
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

export default function InfoSection() {
    return (
        <div className="bg-gray-300 py-6 overflow-hidden">
            <FadeInOnScroll
                distance={20}
                duration={2}
            >
                <div className="container mx-auto flex flex-col p-5 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <FaRegClock className="text-2xl hidden md:block" />
                    <div className="flex flex-col">
                        <h1 className="font-bold">Horarios</h1>
                        <p>Lunes: Cerrado</p>
                        <p>Martes - Sabado 10 a.m - 2 p.m / 5 p.m - 8 p.m.</p>
                        <p>Domingo: 10 a.m - 1 p.m.</p>
                    </div>
                    <FaLocationDot className="text-2xl hidden md:block" />
                    <div className="flex flex-col">
                        <h1 className="font-bold">Ubicación</h1>
                        <p>C. 27 de Septiembre No. 119, Centro,</p>
                        <p>C.P. 28000, Colima, Colima, México</p>
                    </div>
                </div>
            </FadeInOnScroll>
        </div>
    );
}