interface CarouselSlideProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function CarouselSlide({ title, description, imageUrl }: CarouselSlideProps) {
  return (
    <div className="relative h-full">
      <img 
        src={imageUrl} 
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-55"></div>
      <div className="relative z-10 flex flex-col items-start ml-4 justify-center h-full text-white">
        <div className="ml-10 max-w-xl flex flex-col">
          <p>{title}</p>
          <h1 className="text-4xl mb-4">{description}</h1>
          <div className="flex space-x-4">
            <button className="bg-white bg-opacity-75 text-black px-4 py-2 rounded-lg transition duration-200 hover:bg-opacity-100">Conoce más</button>
            <button className="text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-white hover:text-black">Visitas Virtuales</button>
          </div>
        </div>
      </div>
    </div>
  );
}