<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-700 mb-4">
        No Payment Session Found
      </h1>
      <p class="text-gray-500 mb-6">
        Please select a course to proceed with payment.
      </p>
      <NuxtLink
        to="/courses"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Browse Courses
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({
  requiresAuth: true,
});
</script>
