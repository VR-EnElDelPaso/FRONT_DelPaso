interface CarouselControlsProps {
    nextSlide: () => void;
    prevSlide: () => void;
    currentSlide: number;
    totalSlides: number;
    setCurrentSlide: (index: number) => void;
}

export default function CarouselControls({ nextSlide, prevSlide, currentSlide, totalSlides, setCurrentSlide }: CarouselControlsProps) {
    return (
        <div className="absolute bottom-0 right-0 flex justify-end items-center p-4 space-x-2 font-bold z-20">
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
    );
}
