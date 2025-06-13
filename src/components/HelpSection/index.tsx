import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HelpSection = () => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/faqs");
  };

  return (
    <div className="container px-4 py-16 mx-auto sm:px-6 md:px-8">
      <div className="flex flex-col w-full">
        <div className="flex items-center mb-4">
          <span className="mr-2 text-2xl text-primary/50">•</span>
          <p className="text-sm font-bold tracking-widest uppercase text-primary/50">
            Ayuda
          </p>
        </div>

        <h1 className="mb-8 text-4xl font-kaiseiDecol">¿Tienes preguntas?</h1>

        <p className="mb-12 text-lg leading-relaxed text-gray-600">
          Si necesitas más información sobre nuestros recorridos virtuales, las
          exposiciones o los museos universitarios que forman parte de MUVI, no
          te preocupes, estamos aquí para resolver todas tus preguntas y con
          gusto te responderemos lo antes posible. ¡Queremos que disfrutes al
          máximo la experiencia MUVI!
        </p>

        <div className="flex justify-end">
          <Button onClick={handleHelpClick}>Ayuda</Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
