import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/types/User";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  async function initAuth() {
    if (process.server) return;
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      try {
        user.value = JSON.parse(raw);
      } catch {
        user.value = null;
      }
    }
  }

  function saveUser(u: User | null) {
    user.value = u;
    if (process.client) {
      if (u) localStorage.setItem("auth_user", JSON.stringify(u));
      else localStorage.removeItem("auth_user");
    }
  }

  function setUser(u: User | null) {
    saveUser(u);
  }

  function clearUser() {
    saveUser(null);
  }

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const res = await $fetch<User>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      saveUser(res);
      return true;
    } catch (err) {
      console.error("login error", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function register(
    name: string,
    email: string,
    password: string,
    adminSecret?: string
  ) {
    loading.value = true;
    try {
      const res = await $fetch<User>("/api/auth/register", {
        method: "POST",
        body: { name, email, password, adminSecret },
      });
      saveUser(res);
      return true;
    } catch (err) {
      console.error("register error", err);
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    saveUser(null);
    // navigation should be handled in the component after logout
  }

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    initAuth,
    login,
    register,
    logout,
    setUser,
    clearUser,
  };
});
