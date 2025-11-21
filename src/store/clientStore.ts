import { mediaData } from "@/lib/mediaData";
import type { MenuItem, CartItem } from "@/lib/Interfaces";

export const useClientStore = defineStore("clientStore", () => {
  const pizzaCategories = ref([
    { id: 1, title: "Deep Dish Pizza's", key: "deepdishPizza" },
    { id: 2, title: "Special Pizza's", key: "specialPizza" },
    { id: 3, title: "Stuffed Pizza's", key: "stuffedPizza" },
  ]);

  const selectedCategory = ref("deepdishPizza");

  const meunItems = ref<MenuItem[]>([
    {
      id: 1,
      title: "Siicon Pizza",
      category: "deepdishPizza",
      price: "$26.90",
      image: mediaData.pizza2,
      video: "/videos/pizza-4.mp4",
      subtitle: "by Cheeziouz. Pizza",
      description:
        "A flavor-packed favorite! Our Double Cheese Garlic Pizza features a golden crust brushed with aromatic garlic butter, layered with a rich tomato base, smothered in mozzarella and cheddar cheese",
    },
    {
      id: 2,
      title: "Double Cheese Garlic Mushroom Pizza",
      category: "deepdishPizza",
      price: "$30.90",
      video: "/videos/pizza-3.mp4",
      image: mediaData.pizza3,
      subtitle: "by Cheeziouz. Pizza",
      description:
        "A flavor-packed favorite! Our Double Cheese Garlic Pizza features a golden crust brushed with aromatic garlic butter, layered with a rich tomato base, smothered in mozzarella and cheddar cheese",
    },
    {
      id: 3,
      title: "Crown Crust Pizza",
      category: "deepdishPizza",
      price: "$22.90",
      video: "/videos/pizza-2.mp4",
      image: mediaData.pizza4,
      subtitle: "by Cheeziouz. Pizza",
      description:
        "A flavor-packed favorite! Our Double Cheese Garlic Pizza features a golden crust brushed with aromatic garlic butter, layered with a rich tomato base, smothered in mozzarella and cheddar cheese",
    },
    {
      id: 4,
      title: "Plastic Pizza",
      category: "specialPizza",
      price: "$23.90",
      image: mediaData.pizzaimage,
      video: "/videos/pizza-4.mp4",
      subtitle: "by Cheeziouz. Pizza",
      description:
        "A flavor-packed favorite! Our Double Cheese Garlic Pizza features a golden crust brushed with aromatic garlic butter, layered with a rich tomato base, smothered in mozzarella and cheddar cheese",
    },
    {
      id: 5,
      title: "Metal Pizza",
      category: "specialPizza",
      price: "$32.90",
      image: mediaData.pizza3,
      video: "/videos/pizza-4.mp4",
      subtitle: "by Cheeziouz. Pizza",
      description:
        "A flavor-packed favorite! Our Double Cheese Garlic Pizza features a golden crust brushed with aromatic garlic butter, layered with a rich tomato base, smothered in mozzarella and cheddar cheese",
    },
  ]);

  const cart = ref<CartItem[]>([]);

  const filteredMenuItems = computed(() =>
    meunItems.value.filter((item) => item.category === selectedCategory.value)
  );

  const addToCart = (item: MenuItem) => {
    const existing = cart.value.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.value.push({ ...item, quantity: 1 });
    }
  };

  const increaseQuantity = (id: number) => {
    const item = cart.value.find((i) => i.id === id);
    if (item) item.quantity++;
  };

  const decreaseQuantity = (id: number) => {
    const item = cart.value.find((i) => i.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.value = cart.value.filter((i) => i.id !== id);
      }
    }
  };

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter((i) => i.id !== id);
  };

  const cartTotal = computed(() => {
    return cart.value
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  });

  const cartItemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const currentOrder = ref<any>(null);

  const saveOrder = (orderData: any) => {
    currentOrder.value = orderData;
    cart.value = [];
  };

  return {
    pizzaCategories,
    meunItems,
    cart,
    selectedCategory,
    filteredMenuItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    cartItemCount,
    currentOrder,
    saveOrder,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
