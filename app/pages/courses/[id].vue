<template>
  <div class="bg-gray-50 min-h-screen w-[100vw] md:pt-0 pt-24 md:w-[82vw]">
    <div v-if="!course" class="text-gray-500 text-center text-lg py-12">
      <Loader />
    </div>

    <div
      v-else
      class="bg-white shadow-xl rounded-2xl min-h-screen flex flex-col overflow-hidden"
    >
      <div class="w-full flex p-6">
        <img
          :src="course.imgUrl"
          :alt="course.title"
          class="h-[220px] md:h-[280px] md:w-[40%] w-full object-cover rounded-xl shadow-lg transition-transform hover:scale-105"
        />
        <div
          class="flex flex-col md:f pt-30lex-row md:items-start md:justify-between gap-6 mb-8 pl-20 pt-30"
        >
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {{ course.title }}
            </h1>
            <p class="text-gray-600 text-lg mb-2">
              Taught by
              <span class="font-semibold text-gray-900">{{
                course.professor
              }}</span>
            </p>
            <div class="flex items-center gap-2">
              <span class="font-semibold text-lg">{{ course.rating }}</span>
              <span class="text-yellow-500 text-xl">⭐</span>
              <span class="text-sm text-gray-600"
                >({{ course.enrolledUsers || 0 }} enrolled)</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 p-6 md:p-10 mx-auto w-full">
        <div class="flex items-center gap-4 mt-2 mb-8">
          <span class="text-4xl font-extrabold text-gray-900"
            >${{ course.price }}</span
          >
          <span
            v-if="course.mrp"
            class="text-xl text-gray-500 line-through font-medium"
          >
            ${{ course.mrp }}
          </span>
          <button
            @click="toggleWish"
            class="bg-white shadow-md p-4 ml-6 rounded-full hover:bg-red-50 transition"
          >
            <i
              v-if="wishlistStore.isInWishlist(course.id)"
              class="fa-solid fa-heart text-red-500 text-2xl"
            ></i>
            <i v-else class="fa-regular fa-heart text-gray-500 text-2xl"></i>
          </button>
        </div>

        <div class="flex flex-wrap gap-5">
          <NuxtLink
            v-if="
              !enrolledCoursesStore.isEnrolled(course.id) &&
              auth.isAuthenticated
            "
            :to="`/payments/${course.id}`"
            @click.prevent="goToPayment"
            class="px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Enroll Now
          </NuxtLink>

          <button
            v-else-if="enrolledCoursesStore.isEnrolled(course.id)"
            class="px-10 py-4 rounded-xl text-lg font-semibold cursor-not-allowed bg-green-600 text-white shadow-lg"
            disabled
          >
            Enrolled
          </button>

          <button
            v-else
            @click="router.push('/login')"
            class="px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Enroll
          </button>

          <button
            v-if="!cartStore.isInCart(course.id)"
            @click="cartStore.addToCart(course)"
            class="px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Add to Cart
          </button>
          <button
            v-else
            @click="cartStore.removeFromCart(course.id)"
            class="px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
          >
            Remove
          </button>

          <NuxtLink to="/courses">
            <button
              class="px-8 py-4 rounded-xl bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold shadow-lg transition"
            >
              Back
            </button>
          </NuxtLink>
        </div>

        <!-- Course Quiz -->
        <div v-if="enrolledCoursesStore.isEnrolled(course.id)" class="mt-12">
          <hr class="my-8 border-gray-200" />
          <CourseQuiz
            :course="course"
            :user-id="auth.user?.id || ''"
            @quiz-completed="handleQuizCompleted"
          />
        </div>

        <hr class="my-8 border-gray-200" />

        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-900">
            About this course
          </h2>
          <p class="text-gray-700 leading-relaxed text-lg mb-8">
            {{ course.description }}
          </p>
          <h3 class="text-2xl font-semibold mb-4 text-gray-900">
            Concepts you will learn
          </h3>
          <p class="text-gray-600 leading-relaxed text-base">
            {{ course.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useCourseStore } from "@/stores/courses";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { usePaymentStore } from "@/stores/payments";
import { useEnrolledCourseStore } from "@/stores/enrolledCourses";
import CourseQuiz from "@/components/CourseQuiz.vue";
import { $fetch } from "ofetch";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const courseStore = useCourseStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const paymentStore = usePaymentStore();
const enrolledCoursesStore = useEnrolledCourseStore();

const courseId = route.params.id as string;
const course = computed(() =>
  courseStore.courses.find((c) => c.id === courseId)
);

const goToPayment = () => {
  if (course.value) {
    paymentStore.startPayment(course.value);
  }
};

const toggleWish = () => {
  if (auth.user == null) {
    router.push("/login");
  } else if (course.value) {
    wishlistStore.toggleWishlist(course.value);
  }
};

const handleQuizCompleted = async (passed: boolean, score: number) => {
  if (!auth.user || !course.value) return;

  try {
    const updateData = {
      completed: passed,
      quizScore: score,
      completedAt: passed ? new Date().toISOString() : undefined,
      progress: 100, // Assuming quiz completion means 100% progress
    };

    // Use store method for immediate local update
    await enrolledCoursesStore.updateCourse(course.value.id, updateData);
  } catch (error) {
    console.error("Failed to update course completion:", error);
  }
};
</script>
