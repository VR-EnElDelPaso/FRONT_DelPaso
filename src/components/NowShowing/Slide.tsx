interface SlideProps {
    imageSrc: string;
    date: string;
    title: string;
    description: string;
}

export default function Slide({ imageSrc, date, title, description }: SlideProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center w-full h-full">
            <div className="w-full sm:w-1/3 h-64 sm:h-full mb-4 sm:mb-0">
                <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full sm:w-1/2 sm:ml-auto px-4 sm:px-8 flex flex-col justify-end">
                <div className="text-right text-gray-500 mb-2">{date}</div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-kaiseiDecol">{title}</h2>
                <p className="text-base sm:text-lg">{description}</p>
            </div>
        </div>
    );
}
