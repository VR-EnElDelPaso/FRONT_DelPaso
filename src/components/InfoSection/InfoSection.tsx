import { useNavigate } from "react-router-dom";
import { FadeInOnScroll } from "../animations/FadeInOnScroll";
import { Button } from "../ui/button";

export default function InfoSection() {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate("/info");
  };

  return (
    <div className="py-5 m-8 overflow-hidden">
      <FadeInOnScroll distance={20} duration={2}>
        <div className="container p-4 mx-auto">
          <div className="flex items-center">
            <span className="mr-2 text-xl text-primary/50">•</span>
            <p className="text-sm font-medium tracking-widest uppercase text-primary/50">
              Sobre nosotros
            </p>
          </div>

          <div className="flex flex-col w-full">
            <h1 className="mb-4 text-3xl md:text-5xl font-kaiseiDecol">
              Conoce MUVi
            </h1>
            <p className="w-full mb-6 font-light">
              MUVi está diseñado para brindarte las experiencias más
              excepcionales y envolventes en Recorridos Virtuales, ofreciéndote
              una forma innovadora y accesible de explorar diversos espacios
              culturales, históricos o comerciales desde la comodidad de tu
              hogar o desde cualquier lugar del mundo
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleInfoClick}
              // className="px-6 py-2 font-bold text-white transition-colors rounded-full bg-primary/75 hover:bg-primary/90"
            >
              Sobre MUVi
            </Button>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
