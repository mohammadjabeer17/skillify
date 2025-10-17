import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useUsersStore = defineStore("users", () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalUsers = computed(() => users.value.length);
  const adminUsers = computed(
    () => users.value.filter((user) => user.role === "admin").length
  );
  const regularUsers = computed(
    () => users.value.filter((user) => user.role === "user").length
  );

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      // @ts-expect-error
      users.value = await $fetch("/api/users");
    } catch (err) {
      error.value = "Failed to fetch users";
      console.error("Error fetching users:", err);
    } finally {
      loading.value = false;
    }
  };

  const searchUsers = async (query: string) => {
    loading.value = true;
    error.value = null;
    try {
      users.value = await $fetch(
        `/api/users/search?q=${encodeURIComponent(query)}`
      );
    } catch (err) {
      error.value = "Failed to search users";
      console.error("Error searching users:", err);
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      const updatedUser = await $fetch(`/api/users/${userId}`, {
        // @ts-expect-error
        method: "PUT",
        body: userData,
      });
      const index = users.value.findIndex((user) => user.id === userId);
      if (index !== -1) {
        users.value[index] = updatedUser;
      }
      return updatedUser;
    } catch (err) {
      error.value = "Failed to update user";
      console.error("Error updating user:", err);
      throw err;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await $fetch(`/api/users/${userId}`, {
        // @ts-expect-error
        method: "DELETE",
      });
      users.value = users.value.filter((user) => user.id !== userId);
    } catch (err) {
      error.value = "Failed to delete user";
      console.error("Error deleting user:", err);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    totalUsers,
    adminUsers,
    regularUsers,
    fetchUsers,
    searchUsers,
    updateUser,
    deleteUser,
  };
});
