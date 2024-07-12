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
                <button onClick={prevSlide} className="text-lg p-2">&#8592;</button>
                <div className="flex space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`text-lg ${index === currentSlide ? 'text-black' : 'text-gray-500'}`}
                            onClick={() => setCurrentSlide(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={nextSlide} className="text-lg p-2">&#8594;</button>
            </div>
        </div>
    );
}
