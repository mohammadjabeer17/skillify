<template>
  <svg :width="size" :height="size" viewBox="0 0 100 100">
    <circle
      class="background"
      cx="50"
      cy="50"
      r="45"
      stroke-width="10"
      fill="none"
      stroke="#e5e7eb"
    />
    <circle
      class="progress"
      cx="50"
      cy="50"
      r="45"
      stroke-width="10"
      fill="none"
      :stroke="color"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
      transform="rotate(-90 50 50)"
    />
    <text
      x="50"
      y="55"
      text-anchor="middle"
      font-size="20"
      fill="#374151"
      font-weight="bold"
    >
      {{ percentage }}%
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    default: 100,
  },
  color: {
    type: String,
    default: "#3b82f6", // blue-500
  },
});

const radius = 45;
const circumference = 2 * Math.PI * radius;

const dashOffset = computed(() => {
  return circumference - (props.percentage / 100) * circumference;
});
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
.background {
  stroke: #e5e7eb; /* Tailwind gray-200 */
}
.progress {
  transition: stroke-dashoffset 0.5s ease;
}
</style>
