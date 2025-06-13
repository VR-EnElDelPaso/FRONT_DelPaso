import { useNavigate } from "react-router-dom";
import { FadeInOnScroll } from "../animations/FadeInOnScroll";
import { Button } from "../ui/button";

export default function InfoSection() {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    navigate("/about");
  };

  return (
    <div className="py-5 overflow-hidden m-8">
      <FadeInOnScroll distance={20} duration={2}>
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <span className="text-xl mr-2 text-primary/50">•</span>
            <p className="text-sm font-medium text-primary/50 tracking-widest uppercase">
              Sobre
            </p>
          </div>

          <div className="flex flex-col w-full">
            <h1 className="text-3xl md:text-5xl font-kaiseiDecol mb-4">
              Conoce MUVi
            </h1>
            <p className="mb-6 w-full font-light">
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
              // className="bg-primary/75 text-white font-bold px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Sobre MUVi
            </Button>
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
