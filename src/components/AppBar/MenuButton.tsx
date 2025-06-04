import { FaBars, FaTimes } from "react-icons/fa";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    aria-expanded={isOpen}
    className="
            relative
            p-2
            bg-white 
            border 
            border-gray-300 
            hover:bg-gray-50 
            focus:bg-gray-50
            text-gray-700 
            rounded-lg 
            transition-all 
            duration-200 
            shadow-sm 
            hover:shadow-md
            focus:outline-none 
            focus:ring-2 
            focus:ring-primary 
            focus:ring-offset-1
            active:scale-95
        "
  >
    <div className="relative w-6 h-6 flex items-center justify-center">
      {/* Icono de hamburguesa */}
      <FaBars
        className={`
                    absolute 
                    text-lg 
                    transition-all 
                    duration-300 
                    ${
                      isOpen
                        ? "opacity-0 rotate-180 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    }
                `}
      />

      {/* Icono de cerrar */}
      <FaTimes
        className={`
                    absolute 
                    text-lg 
                    transition-all 
                    duration-300 
                    ${
                      isOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 rotate-180 scale-75"
                    }
                `}
      />
    </div>
  </button>
);

export default MenuButton;
