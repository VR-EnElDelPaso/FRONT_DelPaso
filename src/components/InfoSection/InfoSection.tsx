import { FaRegClock, FaLocationDot } from "react-icons/fa6";

export default function InfoSection() {
  return (
    <div className="bg-gray-100 py-6">
        <div className="flex flex-col p-5 space-y-4 ml-12 md:flex-row md:space-y-0 md:space-x-4">
            <FaRegClock className="text-2xl hidden md:block" />
                <div className="flex flex-col">
                    <h1 className="font-bold">Horarios</h1>
                    <p>Lunes: Cerrado</p>
                    <p>Martes - Sabado 10 a.m - 2 p.m / 5 p.m - 8 p.m</p>
                    <p>Domingo: 10 a.m - 1 p.m</p>
                </div>
            <FaLocationDot className="text-2xl hidden md:block" />
            <div className="flex flex-col">
                <h1 className="font-bold">Ubicación</h1>
                <p>C. 27 de Septiembre No. 119, Centro,</p>
                <p>C.P. 28000, Colima, Colima, México</p>
            </div>
        </div>
    </div>
    );
}