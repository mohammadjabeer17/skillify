import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/stores/courses";

export const useWishlistStore = defineStore("wishlist", () => {
  const wishlist = ref<Course[]>([]);

  const loadWishlist = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
          wishlist.value = JSON.parse(saved);
        }
      } catch (e) {
        console.error("Failed to load wishlist:", e);
        wishlist.value = [];
      }
    }
  };
  loadWishlist();
  watch(
    wishlist,
    (val) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(val));
      }
    },
    { deep: true }
  );

  const addToWishlist = (course: Course) => {
    if (!isInWishlist(course.id)) {
      wishlist.value.push(course);
    }
  };

  const removeFromWishlist = (courseId: string) => {
    wishlist.value = wishlist.value.filter((c) => c.id !== courseId);
  };

  const toggleWishlist = (course: Course) => {
    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
  };

  const isInWishlist = (courseId: string) =>
    wishlist.value.some((c) => c.id === courseId);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    loadWishlist,
  };
});
