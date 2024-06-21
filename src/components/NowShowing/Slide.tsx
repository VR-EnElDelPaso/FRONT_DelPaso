interface SlideProps {
    imageSrc: string;
    date: string;
    title: string;
    description: string;
}

export default function Slide({ imageSrc, date, title, description }: SlideProps) {
    return (
        <div className="flex items-center h-full">
            <img src={imageSrc} alt={title} className="w-1/4 object-cover" />
            <div className="ml-8">
                <div className="text-right text-gray-500">{date}</div>
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="text-lg mt-4">{description}</p>
            </div>
        </div>
    );
}
