<template>
  <div
    class="relative group rounded-2xl border border-gray-100 shadow-2xl hover:shadow-xl bg-white flex flex-col overflow-hidden transition-transform duration-300 w-full hover:-translate-y-2"
  >
    <NuxtLink :to="`/courses/${course.id}`" class="block overflow-hidden">
      <img
        :src="course.imgUrl"
        :alt="course.title"
        class="w-full h-40 object-cover block transform transition duration-700 ease-out scale-105 group-hover:scale-110 group-hover:brightness-90"
        @load="imageLoaded = true"
        :class="[
          imageLoaded
            ? 'opacity-100 translate-y-0 transition-all duration-700'
            : 'opacity-0 translate-y-4',
        ]"
      />
    </NuxtLink>

    <div class="p-4 flex flex-col flex-1">
      <NuxtLink :to="`/courses/${course.id}`">
        <h3
          class="font-semibold text-lg mb-1 line-clamp-2 transition-colors duration-300 hover:text-blue-600"
        >
          {{ course.title }}
        </h3>
      </NuxtLink>

      <p class="text-sm text-gray-600 mb-2">By {{ course.professor }}</p>

      <div class="flex items-center gap-1 text-sm mb-2">
        <span class="font-semibold">{{ course.rating }}</span>
        <span class="text-yellow-500">⭐</span>
      </div>

      <p class="text-sm text-gray-700 line-clamp-3 flex-1">
        {{ course.description }}
      </p>

      <div class="mt-3 flex items-center justify-between">
        <div>
          <span class="font-bold text-gray-900 mr-2">${{ course.price }}</span>
          <span v-if="course.mrp" class="text-sm text-gray-500 line-through">
            ${{ course.mrp }}
          </span>
        </div>

        <NuxtLink
          v-if="!enrolledCoursesStore.isEnrolled(course.id)"
          :to="`/payments/${course.id}`"
          @click.prevent="goToPayment"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow text-sm"
        >
          Enroll
        </NuxtLink>

        <NuxtLink
          v-else
          :to="`/myjourney/${course.id}`"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow text-sm"
        >
          Watch
        </NuxtLink>
      </div>
    </div>

    <button
      @click="handleWishlist"
      class="absolute top-3 right-3 bg-white p-2 mt-3 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
    >
      <i
        v-if="wishlistStore.isInWishlist(course.id)"
        class="fa-solid fa-heart text-red-500 animate-pulse"
      ></i>
      <i v-else class="fa-regular fa-heart text-gray-500"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCourseStore } from "../stores/courses";
import { usePaymentStore } from "../stores/payments";
import { useWishlistStore } from "../stores/wishlist";
import { useEnrolledCourseStore } from "../stores/enrolledCourses";
import type { Course } from "../types/Course";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
const props = defineProps<{ course: Course }>();
const router = useRouter();
const courseStore = useCourseStore();
const paymentStore = usePaymentStore();
const wishlistStore = useWishlistStore();
const enrolledCoursesStore = useEnrolledCourseStore();

const imageLoaded = ref(false);

const goToPayment = () => {
  if (auth.user == null || auth.user == undefined) {
    router.push("/login");
  }
  
  paymentStore.startPayment(props.course);
};
const handleWishlist = () => {
  if (!auth.isAuthenticated) {
    router.push('/login?redirect=/wishlist');
    return;
  }
  wishlistStore.toggleWishlist(props.course);
};


</script>
<style scoped>
img {
  display: block;
}
</style>
