<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="hidden lg:block">
      <Sidebar v-if="showSidebar" />
    </div>

    <!-- Mobile Navbar -->
    <div class="w-full lg:hidden">
      <Navbar />
    </div>

    <!-- Main Content -->
    <main
      class="flex-1 transition-all bg-gray-50 min-h-screen"
      :class="mainMarginClass"
    >
      <div class="  ">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useSidebarStore } from "~/stores/sidebar";

const route = useRoute();
const sidebarStore = useSidebarStore();
const showSidebar = computed(() => route.path !== "/login");

const mainMarginClass = computed(() => {
  if (!showSidebar.value) return "";
  return sidebarStore.isCollapsed ? "lg:ml-20" : "lg:ml-64";
});
</script>
