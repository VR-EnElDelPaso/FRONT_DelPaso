import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string;
  isSelected: boolean;
  quantity: number;
}

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

      // adds an item to the cart
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

      // sets an item in the cart
      setCartItem: (item) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(i => i.id === item.id)
        if (existingItemIndex !== -1) {
          const newCartItems = [...state.cartItems]
          newCartItems[existingItemIndex] = item
          return { cartItems: newCartItems }
        } else {
          return { cartItems: [...state.cartItems, item] }
        }
      }),

      // removes an item from the cart
      removeCartItem: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),

      // updates the quantity of an item in the cart
      updateCartItemQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })),

      // clears the cart
      clearCart: () => set({ cartItems: [] }),

      // returns the total number of items in the cart
      getItemCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
    }),
    
    {
      name: 'cart-storage', // localStorage key
      getStorage: () => localStorage,
    }
  )
)