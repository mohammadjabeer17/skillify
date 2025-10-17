<template>
  <AdminDashboard class="pt-27 md:pt-0"/>
</template>

<script setup lang="ts">
import AdminDashboard from '../components/AdminDashboard.vue'
</script>

<script lang="ts">
export default {
  definePageMeta: {
    middleware: 'auth',
    requiresAdmin: true
  }
}
</script>
