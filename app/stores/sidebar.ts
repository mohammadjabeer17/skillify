import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarStore = defineStore("sidebar", () => {
  const isCollapsed = ref(false);

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const setCollapsed = (value: boolean) => {
    isCollapsed.value = value;
  };

  return {
    isCollapsed,
    toggleSidebar,
    setCollapsed,
  };
});
