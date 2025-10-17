<template>
  <div class="pt-12 md:pt-0">
    <!-- Home -->
    <transition name="fade-up">
      <Home v-if="show.home" />
    </transition>

    <!-- Rewards -->
    <transition name="fade-up">
      <Rewards v-if="show.rewards" />
    </transition>

    <!-- Testimonials -->
    <transition name="fade-up">
      <Testimonials v-if="show.testimonials" />
    </transition>

    <!-- Footer -->
    <transition name="fade-up">
      <FooterHome v-if="show.footer" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({ requiresAuth: true });

const show = ref({
  home: false,
  rewards: false,
  testimonials: false,
  footer: false,
});

onMounted(() => {
  setTimeout(() => (show.value.home = true), 200); // after 1s
  setTimeout(() => (show.value.rewards = true), 500); // after 2s
  setTimeout(() => (show.value.testimonials = true), 800); // after 3s
  setTimeout(() => (show.value.footer = true), 600); // after 4s
});
</script>

<style scoped>
.fade-up-enter-active {
  transition: all 0.8s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
