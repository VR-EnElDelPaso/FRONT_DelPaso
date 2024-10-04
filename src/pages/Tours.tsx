import { useNavigate } from "react-router-dom";
import { Tour } from "../types/tour";
import useFetchTours from "../hooks/useFetchTours";
import { dateFormatter } from "../utils/dateFormatter";
import image from "../../public/PA_Obra13.jpg";

const Tours = () => {
  const navigate = useNavigate();
  const tours = useFetchTours();

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/2">
          <input 
            type="search" 
            placeholder="Buscar..." 
            className="w-full py-2 pl-5 pr-4 text-gray-700 bg-slate-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[rgba(179,52,36,0.75)]"
          />
        </div>
        <div className='flex items-center space-x-3'>
          <p className="whitespace-nowrap">Filtrar por:</p>
          <select 
            title="Filtrar por"
            className="w-full md:w-auto py-2 pl-2 pr-4 text-gray-700 bg-slate-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(179,52,36,0.75)]"
          >
            <option value="all">Museo</option>
            <option value="art">Arte</option>
            <option value="history">Historia</option>
            <option value="science">Ciencia</option>
          </select>
        </div>
      </div>
      
      <div className='space-y-6'>
        {tours.map((tour: Tour) => (
          <div key={tour.id} className='flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden'>
            <img src={image} alt={tour.name} className='w-full rounded-3xl md:w-1/5 h-64 md:h-auto object-cover' />
            <div className='flex flex-col justify-between p-6 w-full md:w-2/3'>
              <div className="flex flex-col gap-4">
                <h2 className='text-4xl font-kaiseiDecol mb-2'>{tour.name}</h2>
                <p className='font-inter text-gray-600 mb-4'>{tour.description}</p>
              </div>
              <div className='flex flex-col md:flex-row justify-between items-end'>
                <p className='font-semibold text-gray-500'>{dateFormatter(tour.created_at)}</p>
                <button 
                  className="mt-4 md:mt-0 px-6 py-2 text-white font-bold rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200 bg-[rgba(179,52,36,0.75)]"
                  onClick={() => navigate(`/tour/${tour.id}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;