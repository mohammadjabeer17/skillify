<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">My Wishlist ❤️</h1>

    <div v-if="isLoading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="text-gray-600 mt-2">Loading your wishlist...</p>
    </div>

    <div
      v-else-if="wishlistStore.wishlist.length === 0"
      class="text-center py-12"
    >
      <div class="text-6xl mb-4">💔</div>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">
        Your wishlist is empty
      </h2>
      <p class="text-gray-500">
        Start browsing courses to add them to your wishlist!
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="course in wishlistStore.wishlist"
        :key="course.id"
        class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
      >
        <div class="relative">
          <NuxtLink :to="`/courses/${course.id}`" class="block overflow-hidden">
            <img
              :src="course.imgUrl"
              :alt="course.title"
              class="h-40 w-full object-cover"
              @error="handleImageError"
            />
          </NuxtLink>

          <button
            @click="wishlistStore.removeFromWishlist(course.id)"
            class="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 rounded-full p-2 shadow-sm transition-colors duration-200"
            title="Remove from wishlist"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div class="p-4 flex-1 flex flex-col">
          <h3 class="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
            {{ course.title }}
          </h3>
          <p class="text-sm text-gray-600 mb-3">
            {{ course.professor }}
          </p>

          <div class="mt-auto">
            <div class="flex items-center justify-between mb-3">
              <p class="font-bold text-lg text-green-600">
                ${{ course.price }}
              </p>
              <div
                v-if="course.rating"
                class="flex items-center text-sm text-gray-600"
              >
                <svg
                  class="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                {{ course.rating }}
              </div>
            </div>

            <div class="flex gap-2">
              <NuxtLink :to="`/payments/${course.id}`"
                ><button
                  @click="enrollInCourse(course)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Enroll Now
                </button></NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useWishlistStore } from "../stores/wishlist";

const wishlistStore = useWishlistStore();
const isLoading = ref(true);

const loadWishlistData = async () => {
  try {
    isLoading.value = true;
    await wishlistStore.loadWishlist();
  } catch (error) {
    console.error("Failed to load wishlist:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "/placeholder-course-image.jpg";
};

const enrollInCourse = (course: any) => {
  console.log("Enrolling in course:", course.title);
};

onMounted(() => {
  loadWishlistData();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
