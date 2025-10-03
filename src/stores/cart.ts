import { ref, computed } from 'vue';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  category?: string;
}

export const useCartStore = () => {
  const items = ref<CartItem[]>([]);

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const subTotal = computed(() => {
    return items.value.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  });

  const salesTax = computed(() => {
    return subTotal.value * 0.08;
  });

  const grandTotal = computed(() => {
    return subTotal.value + salesTax.value;
  });

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = items.value.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...item, quantity: 1 });
    }
  };

  const removeItem = (id: number) => {
    const index = items.value.findIndex(item => item.id === id);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const increaseQuantity = (id: number) => {
    const item = items.value.find(item => item.id === id);
    if (item) {
      item.quantity++;
    }
  };

  const decreaseQuantity = (id: number) => {
    const item = items.value.find(item => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    cartCount,
    subTotal,
    salesTax,
    grandTotal,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };
};