interface SlideProps {
    imageSrc: string;
    date: string;
    title: string;
    description: string;
}

export default function Slide({ imageSrc, date, title, description }: SlideProps) {
    return (
        <div className="flex flex-col md:flex-row items-center w-full h-full">
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                <img 
                    src={imageSrc} 
                    alt={title} 
                    className="absolute w-full h-full object-contain md:object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full px-4 md:px-8 flex flex-col justify-center bg-white bg-opacity-90">
                <div className="text-right text-gray-500 mb-2 text-sm md:text-base">{date}</div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 font-kaiseiDecol">{title}</h2>
                <p className="text-sm md:text-lg lg:text-base line-clamp-3 md:line-clamp-none">{description}</p>
            </div>
        </div>
    );
}