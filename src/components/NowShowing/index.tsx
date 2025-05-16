import { Button } from "../ui/button";
import Carousel from "./Carousel";
// import MuseumStatus from "./MuseumStatus";
import { useNavigate } from "react-router-dom";

export default function NowShowing() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/tours");
  };

  return (
    <div className="block py-12 sm:py-16 md:py-20">
      {/* MuseumStatus */}
      {/* <div className="absolute right-0 top-0 p-4 sm:p-5 z-10">
       <MuseumStatus />
     </div> */}

      <div className="container mx-auto flex flex-col px-4 sm:px-6 md:px-8">
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <div className="flex text-primary/50 items-center mb-2">
            <span className="text-lg sm:text-xl mr-2">•</span>
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase">
              Actuales
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-kaiseiDecol">
            Recorridos Virtuales
          </h1>
        </div>

        {/* Carousel */}
        <div className="w-full mb-8 sm:mb-10">
          <Carousel />
        </div>

        {/* Button */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <Button
            onClick={handleRedirect}
            variant="link"
          >
            Ver todo
          </Button>
        </div>
      </div>
    </div>
  );
}
