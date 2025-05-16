import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HelpSection = () => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/faqs");
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col w-full">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2 text-primary/50">•</span>
          <p className="text-sm font-bold text-primary/50 tracking-widest uppercase">
            Ayuda
          </p>
        </div>

        <h1 className="text-4xl font-kaiseiDecol mb-8">¿Tienes preguntas?</h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          Si tienes alguna duda sobre nuestras exposiciones, horarios, entradas
          u otros servicios, por favor visita nuestra sección de preguntas
          frecuentes o contáctanos directamente a través de nuestro correo
          electrónico o llamando al teléfono de atención. Estamos aquí para
          ayudarte a disfrutar de tu visita al Museo Fernando del Paso.
        </p>

        <div className="flex justify-end">
          <Button
            onClick={handleHelpClick}
          >
            Ayuda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
