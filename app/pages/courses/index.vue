<template>
  <div class="min-h-screen bg-gray-50 p-8 py-30 md:py-8 w-[100vw] md:w-[82vw]">
    <div class="max-w-7xl mx-auto">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
      >
        <h1 class="text-3xl font-bold">All Courses</h1>

        <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search courses..."
            class="w-full md:w-64 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div class="flex flex-wrap gap-2">
            <button
              v-for="f in categoryFilters"
              :key="f"
              @click="activeCategoryFilter = f"
              :class="[
                'px-4 py-2 rounded-full border transition text-sm font-medium',
                activeCategoryFilter === f
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300',
              ]"
            >
              {{ f }}
            </button>
          </div>

          <div class="relative">
            <select
              v-model="activeLanguageFilter"
              class="md:w-full w-[45%] md:w-40 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="All">All Languages</option>
              <option
                v-for="lang in availableLanguages"
                :key="lang"
                :value="lang"
              >
                {{ lang }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="hasActiveFilters" class="mb-6">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-sm text-gray-600">Active filters:</span>

          <span
            v-if="activeCategoryFilter !== 'All'"
            class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            Category: {{ activeCategoryFilter }}
            <button
              @click="activeCategoryFilter = 'All'"
              class="ml-1 text-blue-600 hover:text-blue-800"
            >
              ✕
            </button>
          </span>

          <span
            v-if="activeLanguageFilter !== 'All'"
            class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
          >
            Language: {{ activeLanguageFilter }}
            <button
              @click="activeLanguageFilter = 'All'"
              class="ml-1 text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </span>

          <button
            @click="clearAllFilters"
            class="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-sm text-gray-600">
          Showing {{ filteredCourses.length }} of
          {{ courseStore.courses.length }} courses
        </p>
      </div>

      <div
        v-if="filteredCourses.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
        />
      </div>

      <div v-else class="text-center py-16 text-gray-500">
        <div class="max-w-md mx-auto">
          <div class="text-4xl mb-4">📚</div>
          <p class="text-lg font-medium mb-2">No courses found</p>
          <p class="text-sm">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
          <button
            @click="clearAllFilters"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCourseStore } from "../../stores/courses";
import type { Course } from "../../types/Course";

const courseStore = useCourseStore();
const courses = computed(() => courseStore.courses as Course[]);

const searchQuery = ref("");
const categoryFilters = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "Editing",
  "Programming",
];
const activeCategoryFilter = ref("All");
const activeLanguageFilter = ref("All");

const availableLanguages = computed(() => {
  const languages = new Set<string>();
  courses.value.forEach((course) => {
    if (course.language) {
      languages.add(course.language);
    }
  });
  return Array.from(languages).sort();
});

const hasActiveFilters = computed(() => {
  return (
    activeCategoryFilter.value !== "All" ||
    activeLanguageFilter.value !== "All" ||
    searchQuery.value.trim() !== ""
  );
});

const clearAllFilters = () => {
  activeCategoryFilter.value = "All";
  activeLanguageFilter.value = "All";
  searchQuery.value = "";
};

const filteredCourses = computed(() => {
  let list = [...courses.value];

  if (activeCategoryFilter.value === "Frontend") {
    list = list.filter((c) =>
      [
        "html",
        "css",
        "javascript",
        "react",
        "vue",
        "figma",
        "xd",
        "design",
      ].some((kw) => c.title.toLowerCase().includes(kw))
    );
  } else if (activeCategoryFilter.value === "Backend") {
    list = list.filter((c) =>
      [
        "node",
        "express",
        "mongodb",
        "java",
        "c++",
        "python",
        "c programming",
      ].some((kw) => c.title.toLowerCase().includes(kw))
    );
  } else if (activeCategoryFilter.value === "Design") {
    list = list.filter((c) =>
      [
        "design",
        "figma",
        "xd",
        "photoshop",
        "illustrator",
        "canva",
        "graphic",
      ].some((kw) => c.title.toLowerCase().includes(kw))
    );
  } else if (activeCategoryFilter.value === "Editing") {
    list = list.filter((c) =>
      ["video", "premiere", "after", "davinci", "final cut", "editing"].some(
        (kw) => c.title.toLowerCase().includes(kw)
      )
    );
  } else if (activeCategoryFilter.value === "Programming") {
    list = list.filter((c) =>
      [
        "java",
        "python",
        "c++",
        "c programming",
        "programming",
        "javascript",
      ].some((kw) => c.title.toLowerCase().includes(kw))
    );
  }

  if (activeLanguageFilter.value !== "All") {
    list = list.filter(
      (course) => course.language === activeLanguageFilter.value
    );
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.professor.toLowerCase().includes(q) ||
        (c.language && c.language.toLowerCase().includes(q))
    );
  }

  return list;
});

onMounted(async () => {
  await courseStore.fetchCourses();
});
</script>
