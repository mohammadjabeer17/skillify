<template>
  <div
    class="fixed inset-0 bg-black/94 bg-opacity-10 flex items-center justify-center z-50"
  >
    <div
      class="bg-[#1c2533] text-white rounded-lg shadow-lg p-6 w-full max-w-lg border border-gray-500"
    >
      <div class="flex justify-between">
        <h2 class="text-xl font-bold mb-4 text-white">
          {{ editingUser ? "Edit User" : "Add New User" }}
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
          <label class="block text-sm font-medium text-white">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border rounded p-2"
            placeholder="Enter the email"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white">Role</label>
          <select
            v-model="form.role"
            required
            class="w-full border rounded p-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            {{ editingUser ? "Update" : "Add" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useUsersStore } from "../stores/users";

const usersStore = useUsersStore();

interface Props {
  editingUserId?: string;
}

const props = defineProps<Props>();

const editingUser = computed(() =>
  usersStore.users.find((u) => u.id === props.editingUserId)
);

const form = reactive({
  id: "",
  name: "",
  email: "",
  role: "user",
});

watch(
  editingUser,
  (val) => {
    if (val) Object.assign(form, val);
    else {
      Object.assign(form, {
        id: "",
        name: "",
        email: "",
        role: "user",
      });
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (editingUser.value) {
    await usersStore.updateUser(form.id, form);
  } else {
    // For adding new user, you might need to implement addUser in store
    // For now, assuming only edit is needed
  }
  emit('close');
};

const handleCancel = () => {
  emit('close');
};

const emit = defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.sub:hover {
  background-color: rgb(24, 187, 227);
  transition: all smooth ease-in-out;
}
</style>
