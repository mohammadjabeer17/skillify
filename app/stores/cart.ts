import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/types/Course";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<Course[]>([]);

  const loadCart = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("cart");
        if (saved) {
          cart.value = JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load cart:", e);
        cart.value = [];
      }
    }
  };
  loadCart();

  watch(
    cart,
    (val) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(val));
      }
    },
    { deep: true }
  );

  const addToCart = (course: Course) => {
    if (!isInCart(course.id)) {
      cart.value.push(course);
    }
  };

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter((c) => c.id !== id);
  };

  const isInCart = (id: string) => {
    return cart.value.some((c) => c.id === id);
  };

  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
  };
});
