<template>
  <div class="bg-gray-50 min-h-screen md:py-0 w-[100vw] md:w-[82vw] py-24">
    <div class="px-4 px-6 py-8 lg:px-8">
      <div v-if="course" class="max-w-6xl mx-auto">
        <div
          class="bg-white rounded-xl sm:rounded-2xl shadow-lg md:w-[80%] sm:shadow-2xl overflow-hidden mb-6 sm:mb-8"
        >
          <div class="p-4 sm:p-6 lg:p-8">
            <div class="mb-4 sm:mb-6">
              <h1
                class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight"
              >
                {{ course.title }}
              </h1>
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600"
              >
                <p class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    />
                  </svg>
                  By {{ course.professor }}
                </p>
                <div
                  class="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"
                ></div>
                <p class="flex items-center text-gray-500">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ course.duration || "Self-paced" }}
                </p>
              </div>
            </div>

            <div v-if="course.videoUrl" class="mb-6 sm:mb-8">
              <div
                class="relative w-full bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-lg video-container"
              >
                <div class="relative w-full" style="padding-bottom: 56.25%">
                  <iframe
                    :src="formatYoutube(course.videoUrl)"
                    frameborder="0"
                    allowfullscreen
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    class="absolute top-0 left-0 w-full h-full"
                    @contextmenu.prevent
                  ></iframe>
                </div>
              </div>
            </div>

            <div v-else class="mb-6 sm:mb-8">
              <div
                class="relative w-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl overflow-hidden shadow-lg flex items-center justify-center text-white"
                style="padding-bottom: 56.25%"
              >
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                >
                  <svg
                    class="w-12 h-12 sm:w-16 sm:h-16 mb-4 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p class="text-lg sm:text-xl font-semibold">
                    Video Coming Soon
                  </p>
                  <p class="text-sm sm:text-base opacity-80 mt-1">
                    Course content will be available shortly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CourseQuiz
          v-if="course"
          :course="course"
          :user-id="auth.user?.id || ''"
          @quiz-completed="handleQuizCompleted"
        />

        <div class="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="lg:col-span-2 space-y-6 sm:space-y-8">
            <div
              class="bg-white rounded-xl mt-8 sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8"
            >
              <h2
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6"
              >
                Course Description
              </h2>
              <div class="prose max-w-none">
                <p
                  class="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed"
                >
                  {{ course.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6 sm:space-y-8">
            <div
              class="bg-white mt-8 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6"
            >
              <h3
                class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6"
              >
                Course Info
              </h3>
              <div class="space-y-4">
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <span class="text-sm sm:text-base text-gray-600">Level</span>
                  <span
                    class="text-sm sm:text-base font-medium text-gray-900"
                    >{{ course.level || "Beginner" }}</span
                  >
                </div>
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <span class="text-sm sm:text-base text-gray-600"
                    >Duration</span
                  >
                  <span
                    class="text-sm sm:text-base font-medium text-gray-900"
                    >{{ course.duration || "4 weeks" }}</span
                  >
                </div>
                <div
                  class="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <span class="text-sm sm:text-base text-gray-600"
                    >Language</span
                  >
                  <span
                    class="text-sm sm:text-base font-medium text-gray-900"
                    >{{ course.language || "English" }}</span
                  >
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm sm:text-base text-gray-600"
                    >Certificate</span
                  >
                  <span class="text-sm sm:text-base font-medium text-green-600"
                    >✓ Included</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 sm:mt-12">
          <NuxtLink
            to="/myjourney"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 text-sm sm:text-base"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to My Journey
          </NuxtLink>
        </div>
      </div>

      <div v-else class="max-w-2xl mx-auto text-center py-12 sm:py-16 lg:py-20">
        <div
          class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12"
        >
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-6 sm:mb-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-9a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </div>

          <h2
            class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Course Not Found
          </h2>
          <p
            class="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed"
          >
            The course you're looking for doesn't exist or may have been
            removed.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <NuxtLink
              to="/myjourney"
              class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to My Journey
            </NuxtLink>

            <NuxtLink
              to="/courses"
              class="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors duration-300 text-sm sm:text-base"
            >
              Explore Courses
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
definePageMeta({
  requiresAuth: true,
});

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useCourseStore } from "@/stores/courses";
import { useAuthStore } from "@/stores/auth";
import type { Course } from "@/types/Course";
import CourseQuiz from "@/components/CourseQuiz.vue";

const route = useRoute();
const courseStore = useCourseStore();
const auth = useAuthStore();

const course = ref<Course | undefined>(undefined);

const handleQuizCompleted = async (passed: boolean, score: number) => {
  if (passed) {
    alert(`Congratulations! You passed the quiz with a score of ${score}%.`);
    if (course.value) {
      const { useEnrolledCourseStore } = await import(
        "@/stores/enrolledCourses"
      );
      const enrolledStore = useEnrolledCourseStore();
      await enrolledStore.updateCourse(course.value.id, {
        completed: true,
        quizScore: score,
        progress: 100,
      });
    }
  } else {
    alert(`You scored ${score}%. Please try again to pass the quiz.`);
  }
};

onMounted(async () => {
  if (courseStore.courses.length === 0) {
    await courseStore.fetchCourses();
  }
  course.value = courseStore.courses.find(
    (c) => c.id === String(route.params.id)
  );
});

const formatYoutube = (url: string) => {
  let videoId = "";

  if (url.includes("youtube.com/watch?v=")) {
    const parts = url.split("v=");
    if (parts[1]) {
      videoId = parts[1].split("&")[0] || "";
    }
  } else if (url.includes("youtu.be/")) {
    const parts = url.split("youtu.be/");
    if (parts[1]) {
      videoId = parts[1].split("?")[0] || "";
    }
  } else if (url.includes("youtube.com/embed/")) {
    return url;
  }

  return `https://www.youtube.com/embed/${videoId}`;
};
</script>

<style scoped>
iframe {
  pointer-events: auto;
}

iframe {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (max-width: 340px) {
  .text-xl {
    font-size: 1.125rem;
  }

  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.progress-bar {
  transition: width 0.5s ease-in-out;
}

.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
</style>
