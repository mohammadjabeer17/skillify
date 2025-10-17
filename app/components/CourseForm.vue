<template>
  <div
    class="fixed inset-0 bg-black/94 bg-opacity-10 flex items-center justify-center z-50"
  >
    <div
      class="bg-[#1c2533] text-white rounded-lg shadow-lg p-6 w-full max-w-lg border border-gray-500"
    >
      <div class="flex justify-between">
        <h2 class="text-xl font-bold mb-4 text-white">
          {{ editingCourse ? "Edit Course" : "Add New Course" }}
        </h2>
        <button
          class="border border-white rounded px-2 py-0 hover:bg-red-500 transition"
          @click="handleCancel"
        >
          <i class="fa-solid fa-xmark text-white"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white">Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the title"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white"
            >Description</label
          >
          <textarea
            v-model="form.description"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the description"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Image URL</label>
          <input
            v-model="form.imgUrl"
            type="text"
            required
            class="w-full border rounded p-2"
            placeholder="Enter your imgurl"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Video URL</label>
          <input
            v-model="form.videoUrl"
            type="text"
            class="w-full border rounded p-2"
            placeholder="Enter YouTube video link"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-white">Price</label>
            <input
              v-model.number="form.price"
              type="number"
              required
              class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-white">MRP</label>
            <input
              v-model.number="form.mrp"
              type="number"
              required
              class="w-full border rounded p-2"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Language</label>
          <input
            v-model.number="form.language"
            type="text"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the course language"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Professor</label>
          <input
            v-model="form.professor"
            type="text"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the professor name"
          />
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 bg-red-500 rounded active-red-glow"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-10 py-2 bg-blue-600 text-white rounded active-glow"
          >
            {{ editingCourse ? "Update" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useCourseStore } from "../stores/courses";

const course = useCourseStore();

const editingCourse = computed(() =>
  course.courses.find((c) => c.id === course.editingCourseId)
);

const form = reactive({
  id: "",
  title: "",
  description: "",
  imgUrl: "",
  videoUrl: "",
  price: 0,
  mrp: 0,
  rating: 0,
  professor: "",
  createdAt: "",
  enrolledUsers: 0,
  enrolled: false,
  language: "",
  details: "",
  progress: 0,
  duration: 0,
  level: "Beginner",
});

watch(
  editingCourse,
  (val) => {
    if (val) Object.assign(form, val);
    else {
      Object.assign(form, {
        id: "",
        title: "",
        description: "",
        imgUrl: "",
        videoUrl: "",
        price: 0,
        mrp: 0,
        rating: 0,
        professor: "",
      });
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (editingCourse.value) {
    await course.updateCourse(form);
  } else {
    await course.addCourse(form);
  }
  course.closeEditCourse();
};

const handleCancel = () => {
  course.closeEditCourse();
};
</script>

<style scoped>
.sub:hover {
  background-color: rgb(24, 187, 227);
  transition: all smooth ease-in-out;
}
</style>
