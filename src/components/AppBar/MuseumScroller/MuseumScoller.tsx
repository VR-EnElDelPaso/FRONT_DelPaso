import React from "react";
import { useNavigate } from "react-router-dom";
import { RiGovernmentLine } from "react-icons/ri";
import "./MuseumScroller.css";

interface Museum {
  id: string | number;
  name: string;
}

interface MuseumScrollerProps {
  museums: Museum[];
}

const MuseumScroller: React.FC<MuseumScrollerProps> = ({ museums }) => {
  const navigate = useNavigate();

  if (!museums.length) {
    return (
      <div className="flex items-center justify-center h-16 text-white bg-destructive">
        No hay museos disponibles.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar bg-destructive">
      <div className="flex items-center justify-center h-16 gap-8 px-4 whitespace-nowrap min-w-max">
        {museums.map((museum) => (
          <div
            key={museum.id}
            className="flex items-center gap-2 px-3 py-2 text-white transition-all duration-300 rounded-md cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95"
            onClick={() => navigate(`/museums/${museum.id}`)}
          >
            <RiGovernmentLine className="text-xl" />
            <span className="font-medium">{museum.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuseumScroller;
