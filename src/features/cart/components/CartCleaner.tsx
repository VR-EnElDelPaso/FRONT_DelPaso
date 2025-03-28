import { useEffect } from 'react';
import { useCartStore } from '../../../stores/useCartStore';

/**
 * CartCleaner - Un componente invisible que se encarga de limpiar items fantasma del carrito
 * Se debería incluir en el layout principal para que se ejecute al cargar la aplicación
 */
export const CartCleaner = () => {
  const { cleanGhostItems } = useCartStore();
  
  useEffect(() => {
    // Limpiar items fantasma al cargar el componente
    const cleanCart = async () => {
      try {
        await cleanGhostItems();
      } catch (error) {
        console.error('Error cleaning ghost items:', error);
      }
    };
    
    cleanCart();
    
    // Establecer un intervalo para limpiar periódicamente (opcional)
    const interval = setInterval(cleanCart, 30 * 60 * 1000); // Cada 30 minutos
    
    return () => {
      clearInterval(interval);
    };
  }, [cleanGhostItems]);
  
  // No renderiza nada, es un componente funcional
  return null;
};

export default CartCleaner;