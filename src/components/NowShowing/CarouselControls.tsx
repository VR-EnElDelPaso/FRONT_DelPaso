import { IoArrowBack, IoArrowForward } from "react-icons/io5";

interface CarouselControlsProps {
   nextSlide: () => void;
   prevSlide: () => void;
   currentSlide: number;
   totalSlides: number;
   setCurrentSlide: (index: number) => void;
}

export default function CarouselControls({ nextSlide, prevSlide, currentSlide, totalSlides, setCurrentSlide }: CarouselControlsProps) {
   return (
       <div className="w-full">
           <hr className="border-t border-gray-300 mb-4" />
           
           <div className="flex justify-end items-center px-4">
               <button 
                   onClick={prevSlide} 
                   className="p-2 hover:text-gray-600 transition-colors"
               >
                   <IoArrowBack className="w-6 h-6" />
               </button>
               <div className="flex space-x-6 mx-4">
                   {Array.from({ length: totalSlides }).map((_, index) => (
                       <button
                           key={index}
                           className={`text-lg hover:text-gray-600 transition-colors ${index === currentSlide ? 'text-black' : 'text-gray-500'}`}
                           onClick={() => setCurrentSlide(index)}
                       >
                           {index + 1}
                       </button>
                   ))}
               </div>
               <button 
                   onClick={nextSlide} 
                   className="p-2 hover:text-gray-600 transition-colors"
               >
                   <IoArrowForward className="w-6 h-6" />
               </button>
           </div>
       </div>
   );
}