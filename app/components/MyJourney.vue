<template>
  <div class="min-h-screen bg-gray-50 py-24 md:py-0 w-[100vw] md:w-[82vw]">
    <div class="p-6 lg:p-8">
      <div class="mb-6 ">
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
        >
          My Journey
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Track your learning progress and achievements
        </p>
      </div>

      <div
        v-if="enrolledStore.enrolledCourses.length === 0"
        class="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4"
      >
        <div
          class="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-6 sm:mb-8 bg-gray-200 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        <h2
          class="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 mb-3 sm:mb-4 text-center"
        >
          No courses enrolled yet
        </h2>
        <p
          class="text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-8 text-center max-w-md leading-relaxed"
        >
          Start your learning journey today! Explore our wide range of courses
          and find something that interests you.
        </p>

        <NuxtLink to="/courses" class="w-full sm:w-auto max-w-xs sm:max-w-none">
          <button
            class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Explore Courses
          </button>
        </NuxtLink>

        <div
          class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 text-center"
        >
          <NuxtLink
            to="/categories"
            class="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
          >
            Browse Categories
          </NuxtLink>
          <NuxtLink
            to="/popular"
            class="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
          >
            Popular Courses
          </NuxtLink>
          <NuxtLink
            to="/free"
            class="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
          >
            Free Courses
          </NuxtLink>
        </div>
      </div>

      <div v-else>
        <div class="mb-6 sm:mb-8 lg:mb-10">
          <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
            <h3
              class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
            >
              Learning Progress
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div class="text-center">
                <div
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600"
                >
                  {{ enrolledStore.enrolledCourses.length }}
                </div>
                <div class="text-xs sm:text-sm text-gray-500 mt-1">
                  Total Courses
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600"
                >
                  {{ completedCourses }}
                </div>
                <div class="text-xs sm:text-sm text-gray-500 mt-1">
                  Completed
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600"
                >
                  {{ inProgressCourses }}
                </div>
                <div class="text-xs sm:text-sm text-gray-500 mt-1">
                  In Progress
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600"
                >
                  {{ totalHours }}h
                </div>
                <div class="text-xs sm:text-sm text-gray-500 mt-1">
                  Total Hours
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <CourseCard
            v-for="course in enrolledStore.enrolledCourses"
            :key="course.id"
            :course="course"
            class="transform transition-all duration-300 hover:scale-105"
          />
        </div>

        <div v-if="hasMoreCourses" class="text-center mt-8 sm:mt-10 lg:mt-12">
          <button
            @click="loadMoreCourses"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
          >
            Load More Courses
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useEnrolledCourseStore } from "../stores/enrolledCourses";

const enrolledStore = useEnrolledCourseStore();

const completedCourses = computed(() => {
  return enrolledStore.enrolledCourses.filter(
    (course) => course.progress !== undefined && course.progress === 100
  ).length;
});

const inProgressCourses = computed(() => {
  return enrolledStore.enrolledCourses.filter(
    (course) =>
      course.progress !== undefined &&
      course.progress > 0 &&
      course.progress < 100
  ).length;
});

const totalHours = computed(() => {
  return enrolledStore.enrolledCourses.reduce(
    (total, course) => total + (course.duration || 0),
    0
  );
});

const hasMoreCourses = computed(() => false);

const loadMoreCourses = () => {
  // Implement pagination logic
};

onMounted(async () => {
  await enrolledStore.fetchEnrolledCourses();
});
</script>

<style scoped>
@media (max-width: 340px) {
  .text-2xl {
    font-size: 1.375rem;
  }

  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 1024px) {
  .lg\:ml-64 {
    margin-left: 16rem;
  }
}

@media (min-width: 1280px) {
  .xl\:ml-65 {
    margin-left: 16.25rem;
  }
}

.course-card-enter-active {
  transition: all 0.3s ease;
}

.course-card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.course-card-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
