type InitialStepProps = {
  onUcolYes: () => void;
  onUcolNo: () => void;
};

export const InitialStep = ({ onUcolYes, onUcolNo }: InitialStepProps) => {
  return (
    <div className="transition-all duration-500 ease-in-out transform animate-fadeIn">
      <h1 className="text-2xl font-bold mb-4 text-white">Registro</h1>
      <p className="text-white">¿Tienes cuenta Ucol?</p>
      <div className="w-full space-y-4 mt-6">
        <button
          type="button"
          onClick={onUcolYes}
          className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Sí
        </button>
        <button
          type="button"
          onClick={onUcolNo}
          className="bg-primary text-white w-full h-10 rounded-md font-normal text-sm tracking-wider hover:bg-primary/90 transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          No
        </button>
      </div>
    </div>
  );
};
