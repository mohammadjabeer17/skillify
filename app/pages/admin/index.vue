<template>
  <div>
    <AdminDashboard />
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
definePageMeta({
  requiresAuth: true,
  requiresAdmin: true,
});
</script>
