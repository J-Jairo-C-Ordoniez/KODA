import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItemReference {
  variantId: string;
  quantity: number;
}

interface CartState {
  items: CartItemReference[];
  addItem: (variantId: string, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (variantId: string, qty = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(item => item.variantId === variantId);
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + qty,
            };
            return { items: updated };
          }
          return { items: [...state.items, { variantId, quantity: qty }] };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(item => item.variantId !== variantId),
          }));
          return;
        }

        set((state) => {
          const updated = state.items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item,
          );
          return { items: updated };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'koda_pos_cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
