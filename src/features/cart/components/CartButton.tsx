import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartStore } from '../../../stores/useCartStore';

export default function CartButton() {
  const { getItemCount, cleanGhostItems } = useCartStore();
  const navigate = useNavigate();
  
  // Usar getItemCount() directamente en lugar de mantener un estado local
  // Esto garantiza que el componente se re-renderice cuando cartItems cambie
  
  useEffect(() => {
    // Limpiar items fantasma al montar el componente
    const checkGhostItems = async () => {
      try {
        await cleanGhostItems();
      } catch (error) {
        console.error("Error cleaning ghost items:", error);
      }
    };
    
    checkGhostItems();
  }, [cleanGhostItems]);
  
  const handleClick = () => {
    navigate('/cart');
  }

  return (
    <button onClick={handleClick} className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition duration-300 shadow-sm">
      <AiOutlineShoppingCart className="text-xl" />
      {getItemCount() > 0 && <span className="bg-red-500 text-white text-xs px-1 rounded-full">{getItemCount()}</span>}
    </button>
  );
}