import { useNavigate } from "react-router-dom";

export const EmptyCartMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <h2 className="text-4xl font-semibold  mb-4 font-kaiseiDecol">
        Tu carrito está vacío
      </h2>
      <p className=" mb-6 max-w-60">
        ¿Por qué no exploras nuestros tours disponibles?
      </p>
      <button
        onClick={() => navigate("/tours")}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Ver Tours
      </button>
    </div>
  );
};
