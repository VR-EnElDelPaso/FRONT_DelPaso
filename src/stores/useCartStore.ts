import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Definimos la estructura de un item del carrito
interface CartItem {
  id: string;
  isSelected: boolean;
  quantity: number;
}

// Definimos la estructura del estado del carrito
interface CartState {
  cartItems: CartItem[]
  addCartItem: (item: CartItem) => void
  removeCartItem: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void;
  getItemCount: () => number;
  setCartItem: (item: CartItem) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],

      addCartItem: (item) => set((state) => {
        const existingItem = state.cartItems.find(i => i.id === item.id)
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          }
        }
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] }
      }),

      setCartItem: (item) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(i => i.id === item.id)
        if (existingItemIndex !== -1) {
          // Si el item ya existe, lo reemplazamos
          const newCartItems = [...state.cartItems]
          newCartItems[existingItemIndex] = item
          return { cartItems: newCartItems }
        } else {
          // Si el item no existe, lo añadimos
          return { cartItems: [...state.cartItems, item] }
        }
      }),

      removeCartItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),

      updateCartItemQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })),

      clearCart: () => set({ cartItems: [] }),

      getItemCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

    }),
    
    {
      name: 'cart-storage', // nombre para el almacenamiento
      getStorage: () => localStorage, // usamos localStorage para persistencia
    }
  )
)