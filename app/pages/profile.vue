<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 md:pt-0 pt-24"
  >
    <!-- Header Section -->
    <div
      class="bg-gradient-to-r from-blue-600 to-[#080b0f] shadow-lg w-[100vw] md:w-[82vw]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
              My Profile
            </h1>
            <p class="text-indigo-100 text-lg">
              Manage your account and view your learning progress
            </p>
          </div>
          <div class="hidden md:block">
            <button
              @click="startEdit"
              class="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Profile Header Card -->
        <div class="bg-gradient-to-r from-[#080b0f] to-blue-300 p-8 text-white">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Profile Image -->
            <div class="relative group">
              <div
                class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
              >
                <img
                  :src="
                    previewImage ||
                    editedPhotoURL ||
                    user.photoURL ||
                    defaultAvatar
                  "
                  alt="Profile Picture"
                  class="w-full h-full object-cover transition-transform group-hover:scale-105"
                  @error="onImgError"
                />
              </div>
              <label
                v-if="editMode"
                for="imageUpload"
                class="absolute -bottom-2 -right-2 bg-white text-indigo-600 rounded-full p-3 cursor-pointer hover:bg-indigo-50 transition-all shadow-lg border-2 border-indigo-200"
                title="Upload Profile Image"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
              </label>
            </div>

            <!-- Profile Info -->
            <div class="flex-1 text-center md:text-left">
              <div v-if="editMode" class="mb-4">
                <input
                  v-model="editedName"
                  class="text-3xl md:text-4xl font-bold bg-white/20 border border-white/30 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-4 focus:ring-white/50 text-white placeholder-white/70"
                  placeholder="Enter your name"
                  :disabled="saveLoading"
                />
              </div>
              <h2 v-else class="text-3xl md:text-4xl font-bold mb-2">
                {{ user.name || user.displayName || "User" }}
              </h2>
              <div v-if="editMode" class="mb-4">
                <input
                  v-model="editedEmail"
                  type="email"
                  class="text-xl bg-white/20 border border-white/30 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-4 focus:ring-white/50 text-white placeholder-white/70"
                  placeholder="Enter your email"
                  :disabled="saveLoading"
                />
              </div>
              <p v-else class="text-xl text-indigo-100 mb-2">
                {{ user.email }}
              </p>
              <div v-if="editMode" class="mb-4"></div>
              <div
                v-else
                class="flex items-center justify-center md:justify-start gap-2"
              >
                <span
                  class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ user.role || "User" }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-3">
              <button
                v-if="!editMode"
                @click="startEdit"
                class="md:hidden bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <svg
                  class="w-5 h-5 inline mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Edit Profile
              </button>

              <div v-if="editMode" class="flex gap-3">
                <button
                  @click="saveProfile"
                  :disabled="saveLoading || !editedName.trim()"
                  class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center shadow-lg"
                >
                  <svg
                    v-if="saveLoading"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Save Changes
                </button>
                <button
                  @click="cancelEdit"
                  :disabled="saveLoading"
                  class="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <!-- Status Messages -->
          <div
            v-if="saveError || saveSuccess"
            class="mt-6 p-4 rounded-lg"
            :class="
              saveError
                ? 'bg-red-500/20 border border-red-400'
                : 'bg-green-500/20 border border-green-400'
            "
          >
            <p
              :class="saveError ? 'text-red-100' : 'text-green-100'"
              class="text-center font-medium"
            >
              {{ saveError || "Profile updated successfully!" }}
            </p>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Account Information -->
            <div class="lg:col-span-1">
              <div
                class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200"
              >
                <h3
                  class="text-xl font-semibold text-slate-800 mb-6 flex items-center"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Account Information
                </h3>
                <div class="space-y-4">
                  <div
                    class="flex items-center p-3 bg-white rounded-lg border border-slate-200"
                  >
                    <svg
                      class="w-5 h-5 text-indigo-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <div>
                      <p class="text-sm text-slate-500">Full Name</p>
                      <p class="font-medium text-slate-800">
                        {{ user.name || user.displayName || "User" }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex items-center p-3 bg-white rounded-lg border border-slate-200"
                  >
                    <svg
                      class="w-5 h-5 text-indigo-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <div>
                      <p class="text-sm text-slate-500">Email Address</p>
                      <p class="font-medium text-slate-800">{{ user.email }}</p>
                    </div>
                  </div>
                  <div
                    class="flex items-center p-3 bg-white rounded-lg border border-slate-200"
                  >
                    <svg
                      class="w-5 h-5 text-indigo-600 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <div>
                      <p class="text-sm text-slate-500">Role</p>
                      <p class="font-medium text-slate-800">
                        {{ user.role || "User" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Statistics -->
            <div class="lg:col-span-1">
              <div
                class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200"
              >
                <h3
                  class="text-xl font-semibold text-slate-800 mb-6 flex items-center"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                  Learning Statistics
                  <div v-if="isRefreshing" class="ml-auto">
                    <svg
                      class="animate-spin h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                </h3>
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div
                      class="text-center p-4 bg-white rounded-lg border border-slate-200"
                    >
                      <p class="text-2xl font-bold text-indigo-600">
                        {{ enrolledCourses.length }}
                      </p>
                      <p class="text-sm text-slate-600">Enrolled</p>
                    </div>
                    <div
                      class="text-center p-4 bg-white rounded-lg border border-slate-200"
                    >
                      <p class="text-2xl font-bold text-green-600">
                        {{ completedCourses }}
                      </p>
                      <p class="text-sm text-slate-600">Completed</p>
                    </div>
                  </div>
                  <div class="p-4 bg-white rounded-lg border border-slate-200">
                    <p class="text-lg font-semibold text-slate-800">
                      Total Spent
                    </p>
                    <p class="text-2xl font-bold text-indigo-600">
                      ${{ totalSpent.toFixed(2) }}
                    </p>
                  </div>
                  <div class="p-4 bg-white rounded-lg border border-slate-200">
                    <p class="text-lg font-semibold text-slate-800 mb-3">
                      Completion Rate
                    </p>
                    <div class="flex justify-center">
                      <CircularProgressBar
                        :percentage="Number(completedPercentage)"
                        :size="80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievements/Badges -->
            <div class="lg:col-span-1">
              <div
                class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200"
              >
                <h3
                  class="text-xl font-semibold text-slate-800 mb-6 flex items-center"
                >
                  <svg
                    class="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                  Achievements
                </h3>
                <div
                  v-if="earnedBadges.length > 0"
                  class="grid grid-cols-2 gap-4"
                >
                  <div
                    v-for="badge in earnedBadges"
                    :key="badge.id"
                    class="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg text-center border border-yellow-200 shadow-sm"
                  >
                    <div class="text-3xl mb-2">{{ badge.icon }}</div>
                    <h4 class="font-semibold text-slate-800 text-sm">
                      {{ badge.name }}
                    </h4>
                    <p class="text-xs text-slate-600 mt-1">
                      {{ badge.description }}
                    </p>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <svg
                    class="w-12 h-12 text-slate-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                  <p class="text-slate-500">No badges earned yet</p>
                  <p class="text-sm text-slate-400 mt-1">
                    Complete courses to earn badges!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Enrolled Courses Section -->
          <div class="mt-8">
            <div
              class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200"
            >
              <h3
                class="text-xl font-semibold text-slate-800 mb-6 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
                Enrolled Courses
              </h3>

              <div v-if="enrolledCourses.length > 0" class="grid gap-4">
                <div
                  v-for="course in enrolledCourses"
                  :key="course.id"
                  class="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all cursor-pointer group relative"
                  @click="viewCourseDetails(course)"
                >
                  <!-- Completion Badge -->
                  <div
                    v-if="course.completed"
                    class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <h4
                        class="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2"
                      >
                        {{ course.title }}
                        <span
                          v-if="course.completed"
                          class="text-green-600 text-sm font-medium"
                          >(Completed)</span
                        >
                      </h4>
                      <div class="flex items-center mt-2">
                        <div class="flex-1 bg-slate-200 rounded-full h-2 mr-3">
                          <div
                            class="bg-indigo-600 h-2 rounded-full transition-all"
                            :style="{ width: (course.progress ?? 0) + '%' }"
                          ></div>
                        </div>
                        <span class="text-sm text-slate-600"
                          >{{ course.progress ?? 0 }}%</span
                        >
                      </div>
                      <div
                        v-if="
                          course.completed && course.quizScore !== undefined
                        "
                        class="mt-1 text-sm text-green-600"
                      >
                        Quiz Score: {{ course.quizScore }}%
                      </div>
                    </div>
                    <div class="ml-4">
                      <CircularProgressBar
                        :percentage="Number(course.progress ?? 0)"
                        :size="50"
                        color="#6366f1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-12">
                <svg
                  class="w-16 h-16 text-slate-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
                <h4 class="text-lg font-medium text-slate-600 mb-2">
                  No enrolled courses
                </h4>
                <p class="text-slate-500">
                  Start your learning journey by enrolling in a course!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import CircularProgressBar from "../components/CircularProgressBar.vue";
import { useAuthStore } from "../stores/auth";
import { useAuth } from "../composables/useAuth";
import { useEnrolledCourseStore } from "../stores/enrolledCourses";
import { definePageMeta } from "#imports";
import { $fetch } from "ofetch";

definePageMeta({
  requiresAuth: true,
});

const router = useRouter();
const auth = useAuthStore();
const { user: firebaseUser } = useAuth();
const enrolledStore = useEnrolledCourseStore();

const defaultAvatar =
  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

const editMode = ref(false);
const editedName = ref("");
const editedEmail = ref("");
const editedRole = ref("");
const editedPhotoURL = ref("");
const previewImage = ref<string | null>(null);
const saveLoading = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

onMounted(async () => {
  if (!auth.isAuthenticated) {
    router.push("/login");
  } else {
    // Refresh enrolled courses data when profile page loads
    await enrolledStore.fetchEnrolledCourses();
  }
});

const user = computed(() => ({
  ...auth.user,
  displayName: firebaseUser.value?.displayName,
  photoURL: auth.user?.photoURL || firebaseUser.value?.photoURL,
}));

const enrolledCourses = computed(() => enrolledStore.enrolledCourses);

const isRefreshing = ref(false);
const refreshEnrolledCourses = async () => {
  isRefreshing.value = true;
  try {
    await enrolledStore.fetchEnrolledCourses();
  } catch (error) {
    console.error("Failed to refresh enrolled courses:", error);
  } finally {
    isRefreshing.value = false;
  }
};
setInterval(refreshEnrolledCourses, 30000);

const completedCourses = computed(
  () => enrolledCourses.value.filter((course: any) => course.completed).length
);

const totalSpent = computed(() =>
  enrolledCourses.value.reduce(
    (sum: number, course: any) => sum + (course.price || 0),
    0
  )
);

const completedPercentage = computed(() => {
  if (enrolledCourses.value.length === 0) return 0;
  return Math.round(
    (completedCourses.value / enrolledCourses.value.length) * 100
  );
});

const badges = ref([
  { id: 1, name: "Beginner", description: "Completed 1 course", icon: "🎓" },
  {
    id: 2,
    name: "Intermediate",
    description: "Completed 5 courses",
    icon: "🏅",
  },
  { id: 3, name: "Advanced", description: "Completed 10 courses", icon: "🥇" },
]);

const earnedBadges = computed(() => {
  const completed = completedCourses.value;
  return badges.value.filter((badge) => {
    if (badge.id === 1) return completed >= 1;
    if (badge.id === 2) return completed >= 5;
    if (badge.id === 3) return completed >= 10;
    return false;
  });
});

const startEdit = () => {
  editMode.value = true;
  editedName.value = user.value.name || user.value.displayName || "";
  editedEmail.value = user.value.email || "";
  editedRole.value = user.value.role || "User";
  editedPhotoURL.value = user.value.photoURL || "";
  previewImage.value = null;
  saveError.value = "";
  saveSuccess.value = false;
};

const saveProfile = async () => {
  if (!auth.user) return;
  saveLoading.value = true;
  saveError.value = "";
  saveSuccess.value = false;

  // Use previewImage if available, else editedPhotoURL
  const photoURLToSave = previewImage.value || editedPhotoURL.value;

  const updatedUser = {
    ...auth.user,
    id: auth.user.id,
    name: editedName.value,
    email: editedEmail.value,
    role: editedRole.value,
    photoURL: photoURLToSave,
  };
  try {
    const response = await $fetch(`/api/users/${auth.user.id}`, {
      method: "PUT",
      body: updatedUser,
    });
    auth.setUser(response);
    editMode.value = false;
    saveSuccess.value = true;
  } catch (error) {
    console.error("Failed to save profile:", error);
    saveError.value = "Failed to save profile. Please try again.";
  } finally {
    saveLoading.value = false;
  }
};

const cancelEdit = () => {
  editMode.value = false;
  editedName.value = "";
  editedEmail.value = "";
  editedRole.value = "";
  editedPhotoURL.value = "";
  previewImage.value = null;
  saveError.value = "";
  saveSuccess.value = false;
};

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = defaultAvatar;
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    if (!file.type.startsWith("image/")) {
      saveError.value = "Please upload a valid image file.";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      saveError.value = "Image size should be less than 2MB.";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const viewCourseDetails = (course: any) => {
  router.push(`/courses/${course.id}`);
};
</script>
